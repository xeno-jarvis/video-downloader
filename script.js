const backendUrl = "https://video-downloader-backend-4jqo.onrender.com/download";


document.getElementById("downloadBtn").addEventListener("click", async () => {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const resultBox = document.getElementById("result");

  if (!videoUrl) {
    resultBox.textContent = "Please enter a YouTube URL.";
    return;
  }

  resultBox.textContent = "Processing...";

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl })
    });

    const data = await res.json();

    if (data.success) {
      resultBox.innerHTML = `
        <p><strong>${data.title}</strong></p>
        <a href="${data.downloadUrl}" target="_blank" download>⬇ Download Video</a>
      `;
    } else {
      resultBox.textContent = data.message;
    }
  } catch (err) {
    console.error(err);
    resultBox.textContent = "Error: Unable to reach backend.";
  }
});

