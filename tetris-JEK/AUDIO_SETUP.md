# Audio Setup Guide

## Quick Answer: How to Use Your MP3 Files

You have **two options** to use your MP3 audio files:

### Option 1: Use a Web Server (Recommended)

**You MUST use a web server** - opening `index.html` directly won't work due to browser security (CORS).

1. **Start a web server:**
   ```bash
   cd tetris-JEK
   python3 -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Check the console** - you should see:
   - `Protocol: http: Is Server: true`
   - `✓ Audio file loaded: rotate.mp3`
   - `✓ Audio file loaded: line-clear.mp3`
   - etc.

4. **If files load**, you'll hear your MP3 files!
5. **If files don't load**, check the Network tab in browser DevTools to see why

### Option 2: Convert to Base64 (Works Without Server)

If you want to open `index.html` directly without a server:

1. **Open the converter tool:**
   ```
   Open: tools/convert-audio-to-base64.html in your browser
   ```

2. **Convert each MP3 file:**
   - Select `rotate.mp3` → Convert → Copy the code
   - Select `line-clear.mp3` → Convert → Copy the code
   - Select `tetris.mp3` → Convert → Copy the code
   - Select `game-over.mp3` → Convert → Copy the code

3. **Paste into `js/utils/audioData.js`:**
   ```javascript
   const AUDIO_DATA = {
       rotate: 'data:audio/mpeg;base64,PASTE_HERE',
       lineClear: 'data:audio/mpeg;base64,PASTE_HERE',
       tetris: 'data:audio/mpeg;base64,PASTE_HERE',
       gameOver: 'data:audio/mpeg;base64,PASTE_HERE'
   };
   ```

4. **Save and refresh** - your MP3 files will work!

## Troubleshooting

### Check 1: Are you using a server?
- Open browser console (F12)
- Look for: `Protocol: http:` or `Protocol: file:`
- If `file:`, you need a server (Option 1) or base64 (Option 2)

### Check 2: Are files loading?
- Open browser DevTools → Network tab
- Refresh the page
- Look for `rotate.mp3`, `line-clear.mp3`, etc.
- If you see 404 errors, check file paths
- If you see CORS errors, you're using `file://` - need a server

### Check 3: File paths correct?
- Files should be at: `assets/audio/rotate.mp3`
- From `index.html`, the path is: `assets/audio/rotate.mp3` ✓

### Check 4: Console messages
- `✓ Audio file loaded: rotate.mp3` = Success!
- `✗ Failed to load audio file` = Check Network tab for details
- `⚠ No audio files found` = Using generated sounds (fallback)

## Current Status

Your files exist:
- ✅ `assets/audio/rotate.mp3` (29KB)
- ✅ `assets/audio/line-clear.mp3` (66KB)
- ✅ `assets/audio/tetris.mp3` (37KB)
- ✅ `assets/audio/game-over.mp3` (33KB)

They just need to be loaded correctly!

