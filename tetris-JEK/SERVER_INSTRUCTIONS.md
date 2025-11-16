# Running the Game with a Local Web Server

Due to browser security restrictions (CORS), you need to run the game through a local web server instead of opening the HTML file directly.

## Quick Start

### Option 1: Use the provided script (Easiest)
```bash
cd tetris-JEK
./start-server.sh
```

Then open your browser and go to: **http://localhost:8000**

### Option 2: Python 3 (Recommended)
```bash
cd tetris-JEK
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

### Option 3: Python 2
```bash
cd tetris-JEK
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

### Option 4: Node.js (if you have Node.js installed)
```bash
cd tetris-JEK
npx http-server -p 8000
```

Then open: **http://localhost:8000**

### Option 5: PHP (if you have PHP installed)
```bash
cd tetris-JEK
php -S localhost:8000
```

Then open: **http://localhost:8000**

## Why is this needed?

Modern browsers block loading local files (file:// protocol) for security reasons. This is called the "Same Origin Policy" or CORS (Cross-Origin Resource Sharing) restriction.

When you open `index.html` directly from the file system:
- ❌ Audio files won't load
- ❌ Some other resources might fail
- ❌ You'll see CORS errors in the console

When you use a local web server:
- ✅ All files load correctly
- ✅ Audio works properly
- ✅ No CORS errors
- ✅ Game works as intended

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Troubleshooting

**Port 8000 already in use?**
- Try a different port: `python3 -m http.server 8080`
- Then use: `http://localhost:8080`

**Still having issues?**
- Make sure you're in the `tetris-JEK` directory
- Check that all files exist (especially audio files)
- Check browser console for any errors

