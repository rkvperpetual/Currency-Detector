
# 💰 Currency Detection for Visually Impaired Individuals

This project aims to help visually impaired individuals identify Indian currency notes using a deep learning model and audio feedback. The system detects the denomination of a currency note from an image and announces the result using text-to-speech.

## 🚀 Features

- Detects Indian currency denominations from images.
- Uses a pretrained **MobileNetV2** model (TensorFlow/Keras) for high accuracy and lightweight performance.
- Provides **audio feedback** using Google Text-to-Speech (gTTS) to announce the detected value.
- Designed to run on resource-constrained devices like Raspberry Pi or mobile platforms.
- Simple and accessible UI for visually impaired users (optional).

## 🧠 Model Overview

- **Model Used**: `MobileNetV2` (Pretrained on ImageNet, fine-tuned on Indian currency dataset)
- **Framework**: TensorFlow / Keras
- **Input**: Image of a currency note
- **Output**: Predicted denomination (e.g., ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2000)
- **Audio Output**: Uses gTTS to announce the result

## 🗂️ Project Structure

```
currency-detection/
├── dataset/               # Indian currency note images (datasets from Kaggle)
├── static/
├── templates/
├── currency.ipynb         # model is created using CNN model
├── pre_currency.ipynb     # Model is created from pre-trained model
├── app.py                 # Main application logic
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation           
```


## 🛠️ Installation

1. Clone the repository:
   git clone https://github.com/rkvperpetual/currency-detection.git
   cd currency-detection

2. Create a virtual environment (optional):
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install dependencies:
   pip install -r requirements.txt

## 📸 How to Use

1. Place a currency note image in the `input/` directory (or use your webcam if implemented).
2. Run the prediction script:
   python src/predict.py --image input/100rupee.jpg
3. The denomination will be printed and also spoken aloud via gTTS.

## 🔊 Audio Feedback

We use `gTTS` (Google Text-to-Speech) to convert the detected result into speech and play it back using the system’s default player.

Example (Python):
from gtts import gTTS
import os

tts = gTTS(text="The currency is 100 rupees", lang='en')
tts.save("output.mp3")
os.system("start output.mp3")  # Use 'afplay' on macOS or 'mpg123' on Linux

## 📊 Dataset

- Indian currency notes dataset
- Labeled images for ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, and ₹2000
- Augmented with different backgrounds, lighting, and angles

> *Note: Dataset not included due to size. You can create your own or contact me if needed.*

## 🧪 Model Training (Optional)

If you want to retrain the model:

python train.py --model mobilenetv2 --epochs 20 --batch-size 32

## 📱 Future Scope

- Integrate with mobile app using TensorFlow Lite
- Add real-time detection via camera
- Multilingual support for audio feedback
- Currency validation (fake note detection)

## 🤝 Contributing

Feel free to fork the repo, open issues, and submit pull requests.

## 📃 License

This project is licensed under the MIT License.

## 🙌 Acknowledgements

- MobileNetV2 by Google Research
- TensorFlow / Keras
- Indian Currency Images dataset (public or custom)
- Google Text-to-Speech (gTTS)

---

👨‍💻 Developed by [Raj Kumar Vishwakarma]  
📧 Contact: rkv.perpetual@gmail.com
