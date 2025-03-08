from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
from gtts import gTTS

app = Flask(__name__)

# Load your trained model
model = tf.keras.models.load_model("pre_currency_model.h5")

# Currency Mapping
currency_mapping = {
    0: "₹50", 1: "₹50",
    2: "₹500",
    3: "₹100", 4: "₹100",
    5: "₹10", 6: "₹10",
    7: "₹20", 8: "₹20",
    9: "₹200", 10: "₹2000"
}

# Ensure static/audio directory exists
if not os.path.exists("static/audio"):
    os.makedirs("static/audio")

def generate_speech(text):
    tts = gTTS(text=text, lang='en')
    audio_path = "static/audio/output.mp3"
    tts.save(audio_path)
    return audio_path

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read())).resize((128, 128))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)
    currency_name = currency_mapping.get(np.argmax(prediction), "Unknown Currency")

    speech_text = f"This is a {currency_name} note"
    audio_path = generate_speech(speech_text)

    return jsonify({"prediction": currency_name, "audio": audio_path})

if __name__ == "__main__":
    app.run(debug=True)
