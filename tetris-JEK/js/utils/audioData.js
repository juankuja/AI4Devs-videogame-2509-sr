// Audio Data - Base64 encoded audio files
// This allows audio to work without a web server (file:// protocol)
// To add your own audio files, convert them to base64 and add them here

const AUDIO_DATA = {
    // Example structure - replace with your actual base64 data
    // rotate: 'data:audio/mpeg;base64,YOUR_BASE64_DATA_HERE',
    // lineClear: 'data:audio/mpeg;base64,YOUR_BASE64_DATA_HERE',
    // tetris: 'data:audio/mpeg;base64,YOUR_BASE64_DATA_HERE',
    // gameOver: 'data:audio/mpeg;base64,YOUR_BASE64_DATA_HERE'
};

// Helper function to convert file to base64 (for development)
// Run this in browser console to convert your MP3 files:
/*
async function convertAudioToBase64(filePath) {
    const response = await fetch(filePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
*/

