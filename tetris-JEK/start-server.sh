#!/bin/bash
# Simple script to start a local web server for the Tetris game

echo "Starting local web server..."
echo "Open your browser and go to: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Try Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Try Node.js http-server
elif command -v npx &> /dev/null; then
    npx http-server -p 8000
# Try PHP
elif command -v php &> /dev/null; then
    php -S localhost:8000
else
    echo "Error: No web server found!"
    echo "Please install one of: Python 3, Node.js, or PHP"
    exit 1
fi

