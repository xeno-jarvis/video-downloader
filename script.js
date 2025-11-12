const downloadBtn = document.getElementById("downloadBtn");
const videoUrlInput = document.getElementById("videoUrl");
const statusDiv = document.getElementById("status");

downloadBtn.addEventListener("click", async () => {
  const videoUrl = videoUrlInput.value.trim();
  if (!videoUrl) {
    statusDiv.textContent = "Please enter a video URL.";
    return;
  }

  statusDiv.textContent = "Preparing download...";

  try {
    // Replace with your backend endpoint later
  const backendUrl = "https://video-downloader-backend-4jgo.onrender.com/download";



    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    if (data.downloadUrl) {
      window.location.href = data.downloadUrl;
      statusDiv.textContent = "Starting download...";
    } else {
      statusDiv.textContent = "Could not generate download link.";
    }
  } catch (err) {
    statusDiv.textContent = "Error: " + err.message;
  }
});




