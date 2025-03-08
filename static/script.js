document.addEventListener("DOMContentLoaded", function() {
    let uploadedFile = null;

    // Handle Image Upload and Preview
    document.getElementById("imageUpload").addEventListener("change", function(event) {
        let file = event.target.files[0];
        if (file) {
            uploadedFile = file; // Store file for later use
            let reader = new FileReader();
            reader.onload = function(e) {
                let img = document.getElementById("imagePreview");
                img.src = e.target.result;
                img.style.display = "block";
                document.getElementById("predictButton").classList.remove("hidden"); // Show Predict Button
            };
            reader.readAsDataURL(file);
        }
    });

    // Predict Button Handler
    document.getElementById("predictButton").addEventListener("click", function() {
        if (!uploadedFile) return;

        let formData = new FormData();
        formData.append("file", uploadedFile);

        fetch("/predict", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerText = "Detected: " + data.prediction;

            // Append timestamp to force browser refresh of the audio file
            let audioPlayer = document.getElementById("audioPlayer");
            let timestamp = new Date().getTime();
            audioPlayer.src = data.audio + "?t=" + timestamp;
            audioPlayer.classList.remove("hidden");
            audioPlayer.play();

            // Show Replay Button
            let replayButton = document.getElementById("replayButton");
            replayButton.classList.remove("hidden");
            replayButton.onclick = function() {
                audioPlayer.play();
            };
        });
    });
});
