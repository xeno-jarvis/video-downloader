const backendUrl = "https://video-downloader-backend-4jgo.onrender.com/download";

document.getElementById("downloadBtn").addEventListener("click", async () => {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const resultBox = document.getElementById("result");

  if (!videoUrl) {
    resultBox.textContent = "Please enter a video URL.";
    return;
  }

  resultBox.textContent = "Processing...";

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl })
    });

    if (!res.ok) throw new Error("Failed to fetch from backend");

    const data = await res.json();
    resultBox.textContent = data.message || "Download link generated!";
    console.log("Backend Response:", data);
  } catch (err) {
    console.error(err);
    resultBox.textContent = "Error: Unable to reach backend.";
  }
});
