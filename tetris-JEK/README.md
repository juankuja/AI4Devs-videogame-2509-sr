# Tetris Clone Browser Game

A lightweight, browser-based Tetris clone built with Phaser 3.x.

## Features

- Classic Tetris gameplay with all 7 pieces (I, O, T, S, Z, J, L)
- Multiple game screens (Main Menu, Game, Pause, Game Over, High Scores)
- Keyboard controls for all gameplay actions
- Score tracking and high scores (persisted in localStorage)
- Level progression with increasing speed (every 10 lines)
- Sound effects (rotation, line clear, tetris, game over)
- Responsive design that adapts to window size
- 7-bag randomization system for fair piece distribution

## Getting Started

### Option 1: Open directly (Simplest)
Simply open `index.html` in your browser. The game will work perfectly!
- ✅ Gameplay works
- ✅ All features work
- ✅ Generated sounds work (Web Audio API)
- ⚠️ MP3 audio files won't load (requires web server)

### Option 2: Use a web server (For MP3 audio files)
If you want to use your own MP3 audio files instead of generated sounds:

1. **Start a local web server:**
   ```bash
   cd tetris-JEK
   ./start-server.sh
   ```
   Or use Python:
   ```bash
   cd tetris-JEK
   python3 -m http.server 8000
   ```

2. **Open your browser** and go to: `http://localhost:8000`

**Note:** The game works perfectly fine without a server! The server is only needed if you want to use MP3 audio files instead of the generated sounds.

## Controls

### Menu Navigation
- **Up/Down Arrows**: Navigate menu items
- **Enter/Space**: Select menu item
- **ESC**: Return to main menu

### Gameplay
- **Left Arrow**: Move piece left
- **Right Arrow**: Move piece right
- **Down Arrow**: Soft drop (accelerate downward)
- **Up Arrow / Space**: Rotate clockwise
- **Z**: Rotate counter-clockwise
- **P / ESC**: Pause game

## Project Structure

```
tetris-JEK/
├── docs/              # Documentation (PRD, TDD, Implementation Plan)
├── index.html         # Main HTML file
├── css/               # Stylesheets
├── js/
│   ├── main.js       # Phaser game configuration
│   ├── scenes/       # Phaser scenes
│   ├── game/         # Game logic components
│   ├── managers/     # Manager classes
│   └── utils/        # Utility files and constants
├── assets/
│   └── audio/        # Sound effects
└── README.md
```

## Development Status

**Phase 1: Foundation and Core Setup** ✅ Complete
- Project structure created
- Phaser configured
- Main menu scene implemented
- All scene placeholders created

**Phase 2: Core Game Logic Components** ✅ Complete
- Tetromino class with all rotations
- TetrisBoard class with collision detection
- Line clearing logic
- Game over detection

**Phase 3: Game Manager and Core Gameplay** ✅ Complete
- ScoreManager with scoring calculations
- GameManager orchestrating gameplay
- Piece movement and rotation
- 7-bag piece queue system
- Level progression

**Phase 4: Rendering System** ✅ Complete
- Board rendering with grid
- Current piece rendering
- Next piece preview
- UI panel with score, level, lines displays

**Phase 5: Input Handling** ✅ Complete
- Keyboard controls for gameplay
- Menu navigation
- Input repeat handling

**Phase 6: Additional Screens** ✅ Complete
- PauseScene with overlay
- GameOverScene with initials input
- HighScoresScene with score display
- StorageManager for localStorage

**Phase 7: Audio System Integration** ✅ Complete
- AudioManager class implemented
- Audio loading in GameScene
- Sound effects integrated (rotation, line clear, tetris, game over)
- Graceful degradation if audio files missing

**Phase 8: Polish and Optimization** - Optional
- Visual polish
- Performance optimization
- Browser compatibility testing

## Browser Compatibility

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest version)

## License

This project is for educational purposes.

