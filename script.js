// Backend API URL - Update this after deploying to Render
const BACKEND_URL = 'https://video-downloader-backend-4jqo.onrender.com/download';

async function downloadVideo() {
    const urlInput = document.getElementById('videoUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const status = document.getElementById('status');
    const result = document.getElementById('result');
    const videoTitle = document.getElementById('videoTitle');
    const downloadLink = document.getElementById('downloadLink');
    
    const url = urlInput.value.trim();
    
    if (!url) {
        showStatus('Please enter a YouTube URL', 'error');
        return;
    }
    
    // Disable button and show loading
    downloadBtn.disabled = true;
    showStatus('Processing your video... This may take a minute', 'loading');
    result.classList.add('hidden');
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('Video ready for download!', 'success');
            videoTitle.textContent = data.title;
            downloadLink.href = data.downloadUrl;
            downloadLink.download = `${data.title}.mp4`;
            result.classList.remove('hidden');
        } else {
            showStatus(data.message || 'Failed to process video', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('Failed to connect to server. Please try again.', 'error');
    } finally {
        downloadBtn.disabled = false;
    }
}

function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
}

// Allow Enter key to submit
document.getElementById('videoUrl').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        downloadVideo();
    }
});
