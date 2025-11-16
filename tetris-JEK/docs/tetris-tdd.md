# Technical Design Document (TDD)
## Tetris Clone Browser Game

**Version:** 1.0  
**Date:** 2024  
**Project:** Lightweight Tetris Clone  
**Framework:** Phaser 3.x  
**Location:** `tetris-JEK/`

---

## 1. Document Overview

### 1.1 Purpose
This document provides detailed technical specifications for implementing the Tetris clone browser game using the Phaser framework. It translates the Product Requirements Document (PRD) into actionable technical design, architecture, and implementation guidelines.

### 1.2 Scope
This TDD covers:
- System architecture and component design
- Phaser framework integration and scene management
- Data structures and algorithms
- Rendering and graphics implementation
- Input handling and game controls
- Audio system integration
- Storage and persistence
- Performance optimization strategies

### 1.3 Target Audience
- Game developers implementing the system
- Code reviewers and QA engineers
- Future maintainers of the codebase

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Window                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Phaser Game Instance                    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │         Scene Manager                      │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │  │
│  │  │  │  Main   │  │  Game    │  │  Game    │ │  │  │
│  │  │  │  Menu   │  │  Scene   │  │  Over    │ │  │  │
│  │  │  │  Scene  │  │          │  │  Scene   │ │  │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘ │  │  │
│  │  │  ┌──────────┐  ┌──────────┐               │  │  │
│  │  │  │  Pause   │  │  High   │               │  │  │
│  │  │  │  Scene   │  │  Scores │               │  │  │
│  │  │  │          │  │  Scene  │               │  │  │
│  │  │  └──────────┘  └──────────┘               │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │         Game Logic Layer                    │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │  │
│  │  │  │Tetris    │  │Tetromino │  │  Game    │ │  │  │
│  │  │  │Board     │  │ Manager  │  │ Manager  │ │  │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘ │  │  │
│  │  │  ┌──────────┐  ┌──────────┐               │  │  │
│  │  │  │ Score    │  │ Storage  │               │  │  │
│  │  │  │ Manager  │  │ Manager  │               │  │  │
│  │  │  └──────────┘  └──────────┘               │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │         Phaser Systems                      │  │  │
│  │  │  - Input System                             │  │  │
│  │  │  - Audio System                             │  │  │
│  │  │  - Renderer (Canvas/WebGL)                 │  │  │
│  │  │  - Scale Manager                            │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Architecture Principles
- **Separation of Concerns:** Game logic separated from rendering and input handling
- **Scene-Based Architecture:** Each screen is an independent Phaser Scene
- **Modular Design:** Reusable components for game logic, scoring, and storage
- **Dependency Injection:** Managers injected into scenes for testability
- **Single Responsibility:** Each class/module has one clear purpose

---

## 3. Phaser Framework Configuration

### 3.1 Game Configuration

```javascript
const config = {
    type: Phaser.AUTO,  // AUTO selects Canvas or WebGL
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        }
    },
    scene: [
        MainMenuScene,
        GameScene,
        PauseScene,
        GameOverScene,
        HighScoresScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    audio: {
        disableWebAudio: false
    },
    render: {
        antialias: true,
        pixelArt: false
    }
};
```

### 3.2 Scene Management Strategy
- **Scene Keys:** Unique string identifiers for each scene
- **Scene Transitions:** Smooth transitions using Phaser's scene transitions
- **Data Passing:** Use scene data object to pass information between scenes
- **Scene Lifecycle:** Properly implement create(), update(), and destroy() methods

---

## 4. Component Design

### 4.1 Scene Components

#### 4.1.1 MainMenuScene
**Purpose:** Entry point with menu navigation

**Key Components:**
- Title text (Phaser Text object)
- Menu items array (New Game, High Scores)
- Selected index tracker
- Keyboard input handler
- Visual highlight for selected item

**Methods:**
- `create()`: Initialize scene, create UI elements
- `update()`: Handle menu navigation
- `selectMenuItem(index)`: Navigate to selected scene
- `navigateMenu(direction)`: Move selection up/down

**Input Handling:**
- UP/DOWN arrows: Navigate menu
- ENTER/SPACE: Select item
- ESC: (Optional) Exit

#### 4.1.2 GameScene
**Purpose:** Main gameplay scene

**Key Components:**
- TetrisBoard instance
- GameManager instance
- ScoreManager instance
- UI panel (next piece, stats)
- Game loop timer
- Input handler

**Methods:**
- `create()`: Initialize game board, managers, UI
- `update()`: Game loop (piece falling, input processing)
- `pauseGame()`: Transition to PauseScene
- `gameOver()`: Transition to GameOverScene
- `updateUI()`: Refresh score, level, lines displays
- `renderNextPiece()`: Display next piece preview

**State Management:**
- Game state: PLAYING, PAUSED, GAME_OVER
- Current piece reference
- Next piece reference
- Board state

#### 4.1.3 PauseScene
**Purpose:** Overlay pause menu

**Key Components:**
- Dimmed background overlay
- Menu options (Resume, Main Menu)
- Selected index tracker
- Keyboard handler

**Methods:**
- `create()`: Create overlay and menu
- `resumeGame()`: Return to GameScene
- `goToMainMenu()`: Return to MainMenuScene
- `navigateMenu(direction)`: Menu navigation

**Implementation Note:**
- Can be implemented as overlay scene (not replacing GameScene)
- Or as separate scene with game state preservation

#### 4.1.4 GameOverScene
**Purpose:** Display game over and capture initials

**Key Components:**
- Game Over text
- Final score display
- Initials input (3 characters)
- Submit button
- Input validation

**Methods:**
- `create()`: Initialize UI, load final score
- `handleInput(key)`: Process keyboard input for initials
- `validateInitials()`: Ensure valid 3-letter input
- `submitScore()`: Save score and navigate to HighScoresScene
- `formatInitials()`: Auto-uppercase conversion

**Data Flow:**
- Receives: finalScore from GameScene
- Sends: scoreData to StorageManager

#### 4.1.5 HighScoresScene
**Purpose:** Display top 10 scores

**Key Components:**
- Title text
- Score table/list
- Back button
- StorageManager reference

**Methods:**
- `create()`: Load and display scores
- `loadScores()`: Retrieve from StorageManager
- `renderScores()`: Display formatted score list
- `goToMainMenu()`: Return to MainMenuScene

**Rendering:**
- Use Phaser Text objects or Graphics for table
- Format: Rank | Initials | Score | Date/Time

---

### 4.2 Game Logic Components

#### 4.2.1 TetrisBoard
**Purpose:** Manages the game board grid and piece placement

**Data Structure:**
```javascript
class TetrisBoard {
    constructor(width, height) {
        this.width = 10;   // columns
        this.height = 20;  // rows
        this.grid = [];    // 2D array: [row][col]
        this.cellSize = 0; // Calculated based on board height
    }
}
```

**Grid Representation:**
- 2D array: `grid[row][col]`
- Values: `0` (empty), `1-7` (piece type), `-1` (locked piece)
- Row 0 = top, Row 19 = bottom

**Key Methods:**
- `initialize()`: Create empty grid
- `isValidPosition(piece, x, y, rotation)`: Check collision
- `placePiece(piece, x, y, rotation)`: Place piece on board
- `lockPiece(piece, x, y, rotation)`: Lock piece (mark as placed)
- `clearLines()`: Detect and clear full lines
- `removeLine(row)`: Remove specific line and shift down
- `getFullLines()`: Return array of full line indices
- `isGameOver()`: Check if spawn area is blocked
- `render(phaserGraphics)`: Draw board using Phaser Graphics

**Collision Detection Algorithm:**
```javascript
isValidPosition(piece, x, y, rotation) {
    const shape = piece.getShape(rotation);
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const boardX = x + col;
                const boardY = y + row;
                
                // Boundary check
                if (boardX < 0 || boardX >= this.width ||
                    boardY >= this.height) {
                    return false;
                }
                
                // Collision check (ignore negative Y for spawn)
                if (boardY >= 0 && this.grid[boardY][boardX] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}
```

#### 4.2.2 Tetromino Manager
**Purpose:** Manages tetromino pieces, shapes, rotations, and colors

**Data Structure:**
```javascript
class Tetromino {
    constructor(type) {
        this.type = type;        // 'I', 'O', 'T', 'S', 'Z', 'J', 'L'
        this.x = 0;              // Board position X
        this.y = 0;              // Board position Y
        this.rotation = 0;       // Current rotation (0-3)
        this.color = this.getColor(type);
        this.shapes = this.getShapes(type);
    }
}
```

**Piece Definitions:**
```javascript
const PIECE_SHAPES = {
    'I': [
        [[0,0,0,0],
         [1,1,1,1],
         [0,0,0,0],
         [0,0,0,0]],
        // ... 3 more rotations
    ],
    'O': [
        [[1,1],
         [1,1]]
        // O-piece doesn't rotate
    ],
    'T': [
        [[0,1,0],
         [1,1,1],
         [0,0,0]],
        // ... 3 more rotations
    ],
    // ... S, Z, J, L
};
```

**Color Scheme:**
```javascript
const PIECE_COLORS = {
    'I': 0x00f0f0,  // Cyan
    'O': 0xf0f000,  // Yellow
    'T': 0xa000f0,  // Purple
    'S': 0x00f000,  // Green
    'Z': 0xf00000,  // Red
    'J': 0x0000f0,  // Blue
    'L': 0xf0a000   // Orange
};
```

**Key Methods:**
- `getShape(rotation)`: Get shape for specific rotation
- `rotate(clockwise)`: Rotate piece (with wall kick support)
- `getBounds()`: Get bounding box
- `spawn(boardWidth)`: Set initial spawn position
- `render(phaserGraphics, cellSize)`: Draw piece

**Rotation System:**
- Super Rotation System (SRS) or simplified rotation
- Wall kicks for edge cases
- Rotation around piece center or specific pivot point

#### 4.2.3 GameManager
**Purpose:** Orchestrates game flow, timing, and state

**Data Structure:**
```javascript
class GameManager {
    constructor(board, scoreManager) {
        this.board = board;
        this.scoreManager = scoreManager;
        this.currentPiece = null;
        this.nextPiece = null;
        this.level = 1;
        this.linesCleared = 0;
        this.fallTimer = 0;
        this.fallInterval = 1000; // milliseconds
        this.gameState = 'PLAYING'; // PLAYING, PAUSED, GAME_OVER
        this.pieceQueue = [];
    }
}
```

**Key Methods:**
- `startGame()`: Initialize new game
- `spawnPiece()`: Create and spawn new piece
- `update(delta)`: Game loop update (fall timer, input)
- `movePiece(direction)`: Move current piece left/right/down
- `rotatePiece(clockwise)`: Rotate current piece
- `hardDrop()`: Instant drop to bottom
- `lockPiece()`: Lock current piece and check lines
- `checkLevelUp()`: Increase level if threshold reached
- `calculateFallSpeed()`: Calculate fall interval based on level
- `pause()`: Pause game
- `resume()`: Resume game
- `isGameOver()`: Check game over condition

**Fall Speed Formula:**
```javascript
calculateFallSpeed(level) {
    // Classic Tetris formula: speed = 1000 - (level - 1) * 50
    // Minimum speed: 50ms
    return Math.max(50, 1000 - (level - 1) * 50);
}
```

**Piece Queue System:**
- Generate random sequence of pieces
- Ensure fair distribution (7-bag system or random)
- Pre-generate next piece

#### 4.2.4 ScoreManager
**Purpose:** Calculate and track scoring

**Data Structure:**
```javascript
class ScoreManager {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.linesCleared = 0;
        this.linesForNextLevel = 10;
    }
}
```

**Scoring Formula:**
```javascript
const SCORE_VALUES = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,    // per cell
    HARD_DROP: 2     // per cell
};

calculateScore(linesCleared, level, dropDistance, isHardDrop) {
    let baseScore = 0;
    
    // Line clear scoring
    switch(linesCleared) {
        case 1: baseScore = SCORE_VALUES.SINGLE; break;
        case 2: baseScore = SCORE_VALUES.DOUBLE; break;
        case 3: baseScore = SCORE_VALUES.TRIPLE; break;
        case 4: baseScore = SCORE_VALUES.TETRIS; break;
    }
    
    // Level multiplier
    const score = baseScore * level;
    
    // Drop bonus
    if (isHardDrop) {
        return score + (dropDistance * SCORE_VALUES.HARD_DROP);
    } else {
        return score + (dropDistance * SCORE_VALUES.SOFT_DROP);
    }
}
```

**Key Methods:**
- `addScore(amount)`: Add to current score
- `clearLines(count, level)`: Calculate and add line clear score
- `addDropScore(distance, isHardDrop)`: Add drop bonus
- `getScore()`: Return current score
- `getLevel()`: Return current level
- `getLinesCleared()`: Return total lines cleared
- `checkLevelUp()`: Check if level should increase
- `increaseLevel()`: Increment level

**Level Progression:**
- Level increases every 10 lines cleared
- Lines counter resets after level up (or continues)

#### 4.2.5 StorageManager
**Purpose:** Handle localStorage for high scores

**Data Structure:**
```javascript
class StorageManager {
    constructor() {
        this.storageKey = 'tetris_high_scores';
        this.maxScores = 10;
    }
}
```

**Score Entry Format:**
```javascript
{
    initials: 'ABC',
    score: 125430,
    dateTime: '2024-01-15T14:30:00Z',
    level: 5,
    lines: 45
}
```

**Key Methods:**
- `saveScore(initials, score, level, lines)`: Save new score
- `getScores()`: Retrieve all scores
- `getTopScores(limit)`: Get top N scores
- `isHighScore(score)`: Check if score qualifies
- `clearScores()`: Clear all scores (for testing)

**Storage Implementation:**
```javascript
saveScore(initials, score, level, lines) {
    const scores = this.getScores();
    const newEntry = {
        initials: initials.toUpperCase().substring(0, 3),
        score: score,
        level: level,
        lines: lines,
        dateTime: new Date().toISOString()
    };
    
    scores.push(newEntry);
    scores.sort((a, b) => b.score - a.score);
    scores.splice(this.maxScores);
    
    localStorage.setItem(this.storageKey, JSON.stringify(scores));
}
```

---

## 5. Rendering System

### 5.1 Board Rendering

**Approach:** Phaser Graphics API for drawing cells

**Rendering Strategy:**
- Calculate cell size based on board height and window height
- Draw grid lines using Graphics.lineStyle()
- Draw filled cells using Graphics.fillRect()
- Use piece colors for locked pieces
- Render current piece separately (overlay)

**Cell Size Calculation:**
```javascript
calculateCellSize(boardHeight, windowHeight) {
    // Board height fills window height
    // Account for UI panel on side
    const availableHeight = windowHeight * 0.9; // 90% for board
    return Math.floor(availableHeight / boardHeight);
}
```

**Rendering Method:**
```javascript
renderBoard(graphics, cellSize, offsetX, offsetY) {
    // Clear previous drawing
    graphics.clear();
    
    // Draw grid background
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX, offsetY, 
                     this.width * cellSize, 
                     this.height * cellSize);
    
    // Draw grid lines
    graphics.lineStyle(1, 0x333333, 0.5);
    for (let row = 0; row <= this.height; row++) {
        graphics.moveTo(offsetX, offsetY + row * cellSize);
        graphics.lineTo(offsetX + this.width * cellSize, 
                      offsetY + row * cellSize);
    }
    for (let col = 0; col <= this.width; col++) {
        graphics.moveTo(offsetX + col * cellSize, offsetY);
        graphics.lineTo(offsetX + col * cellSize, 
                      offsetY + this.height * cellSize);
    }
    
    // Draw locked pieces
    for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
            const cellValue = this.grid[row][col];
            if (cellValue > 0) {
                const color = PIECE_COLORS[this.getPieceType(cellValue)];
                graphics.fillStyle(color, 1);
                graphics.fillRect(
                    offsetX + col * cellSize + 1,
                    offsetY + row * cellSize + 1,
                    cellSize - 2,
                    cellSize - 2
                );
            }
        }
    }
}
```

### 5.2 Piece Rendering

**Current Piece:**
- Rendered on top of board
- Updated position in real-time
- Can show ghost piece (optional)

**Next Piece Preview:**
- Rendered in UI panel
- Scaled appropriately (smaller than board cells)
- Centered in preview area

**Rendering Method:**
```javascript
renderPiece(graphics, piece, cellSize, offsetX, offsetY) {
    const shape = piece.getShape(piece.rotation);
    const color = piece.color;
    
    graphics.fillStyle(color, 1);
    
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const x = offsetX + (piece.x + col) * cellSize + 1;
                const y = offsetY + (piece.y + row) * cellSize + 1;
                
                graphics.fillRect(x, y, cellSize - 2, cellSize - 2);
                
                // Optional: Add border/highlight
                graphics.lineStyle(2, 0xffffff, 0.3);
                graphics.strokeRect(x, y, cellSize - 2, cellSize - 2);
            }
        }
    }
}
```

### 5.3 UI Rendering

**Text Elements:**
- Use Phaser Text objects for score, level, lines
- Update text content in update() method
- Position relative to game board

**Layout:**
```
┌─────────────────────────────────────┐
│  [Game Board]  │  [UI Panel]      │
│                 │  Next Piece:     │
│                 │  [Preview]       │
│                 │                  │
│                 │  Level: 1        │
│                 │  Score: 0        │
│                 │  Lines: 0        │
└─────────────────────────────────────┘
```

**Responsive Sizing:**
- Board fills full height
- UI panel width: 200-300px (or percentage)
- Use Phaser Scale Manager for window resize

---

## 6. Input Handling

### 6.1 Keyboard Input Mapping

**Game Controls:**
```javascript
const INPUT_KEYS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    UP: 'UP',
    ROTATE_CW: 'SPACE',
    ROTATE_CCW: 'Z',
    PAUSE: 'P',
    ESCAPE: 'ESC'
};
```

### 6.2 Input Handling Implementation

**Phaser Input System:**
```javascript
create() {
    // Create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Create custom keys
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    // Prevent default browser behavior
    this.input.keyboard.preventDefault = true;
}
```

**Input Processing:**
```javascript
handleInput() {
    // Movement (with repeat delay)
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
        this.gameManager.movePiece('LEFT');
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
        this.gameManager.movePiece('RIGHT');
    }
    
    // Soft drop (continuous)
    if (this.cursors.down.isDown) {
        this.handleSoftDrop();
    }
    
    // Rotation
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || 
        Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.gameManager.rotatePiece(true);
        this.playSound('rotate');
    }
    if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
        this.gameManager.rotatePiece(false);
        this.playSound('rotate');
    }
    
    // Pause
    if (Phaser.Input.Keyboard.JustDown(this.pKey) || 
        Phaser.Input.Keyboard.JustDown(this.escKey)) {
        this.pauseGame();
    }
}
```

**Input Repeat/Delay:**
- Use Phaser's key repeat system or custom timer
- Left/Right: Initial delay, then repeat
- Down: Continuous while held

### 6.3 Menu Navigation Input

**Menu Scene Input:**
```javascript
handleMenuInput() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
        this.updateMenuHighlight();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
        this.updateMenuHighlight();
    }
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || 
        Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        this.selectMenuItem(this.selectedIndex);
    }
}
```

---

## 7. Audio System

### 7.1 Audio File Structure

**Audio Assets:**
```
assets/audio/
├── rotate.mp3      (Piece rotation)
├── line-clear.mp3  (1-3 lines cleared)
├── tetris.mp3      (4 lines cleared - Tetris)
└── game-over.mp3   (Game over)
```

### 7.2 Audio Loading

**Preload in Scene:**
```javascript
preload() {
    this.load.audio('rotate', 'assets/audio/rotate.mp3');
    this.load.audio('lineClear', 'assets/audio/line-clear.mp3');
    this.load.audio('tetris', 'assets/audio/tetris.mp3');
    this.load.audio('gameOver', 'assets/audio/game-over.mp3');
}
```

### 7.3 Audio Playback

**Audio Manager:**
```javascript
class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.sounds = {};
        this.muted = false;
        this.volume = 1.0;
    }
    
    init() {
        this.sounds.rotate = this.scene.sound.add('rotate');
        this.sounds.lineClear = this.scene.sound.add('lineClear');
        this.sounds.tetris = this.scene.sound.add('tetris');
        this.sounds.gameOver = this.scene.sound.add('gameOver');
        
        // Set volume
        Object.values(this.sounds).forEach(sound => {
            sound.setVolume(this.volume);
        });
    }
    
    play(soundName) {
        if (!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    }
    
    setMuted(muted) {
        this.muted = muted;
    }
    
    setVolume(volume) {
        this.volume = Phaser.Math.Clamp(volume, 0, 1);
        Object.values(this.sounds).forEach(sound => {
            sound.setVolume(this.volume);
        });
    }
}
```

**Usage:**
```javascript
// In GameScene
this.audioManager.play('rotate');
this.audioManager.play('lineClear');
this.audioManager.play('tetris');
this.audioManager.play('gameOver');
```

---

## 8. Game Loop and Timing

### 8.1 Game Loop Structure

**Phaser Update Loop:**
```javascript
update(time, delta) {
    if (this.gameState !== 'PLAYING') return;
    
    // Handle input
    this.handleInput();
    
    // Update fall timer
    this.fallTimer += delta;
    if (this.fallTimer >= this.fallInterval) {
        this.fallTimer = 0;
        this.movePieceDown();
    }
    
    // Update UI
    this.updateUI();
    
    // Render
    this.renderBoard();
    this.renderCurrentPiece();
}
```

### 8.2 Timing Considerations

**Delta Time:**
- Use Phaser's delta time for frame-independent movement
- Fall timer accumulates delta until threshold

**Frame Rate:**
- Target: 60 FPS
- Phaser handles frame limiting
- Use requestAnimationFrame internally

**Performance:**
- Only render when necessary
- Batch graphics operations
- Use object pooling for temporary objects (if needed)

---

## 9. Data Flow and State Management

### 9.1 Scene Data Passing

**Passing Data Between Scenes:**
```javascript
// From GameScene to GameOverScene
this.scene.start('GameOverScene', {
    score: this.scoreManager.getScore(),
    level: this.scoreManager.getLevel(),
    lines: this.scoreManager.getLinesCleared()
});

// In GameOverScene
init(data) {
    this.finalScore = data.score;
    this.finalLevel = data.level;
    this.finalLines = data.lines;
}
```

### 9.2 Game State Machine

**States:**
```
MENU → PLAYING → PAUSED → PLAYING
                ↓
            GAME_OVER → HIGH_SCORES → MENU
```

**State Transitions:**
- Use Phaser scene system for state management
- Each state = separate scene
- Data passed via scene data object

---

## 10. Performance Optimization

### 10.1 Rendering Optimization

**Strategies:**
- Only redraw changed cells
- Use dirty rectangle technique (if needed)
- Batch graphics operations
- Minimize Graphics.clear() calls

**Cell Update Tracking:**
```javascript
class TetrisBoard {
    constructor() {
        this.dirtyCells = new Set(); // Track changed cells
    }
    
    markDirty(row, col) {
        this.dirtyCells.add(`${row},${col}`);
    }
    
    renderDirty(graphics) {
        // Only render changed cells
        this.dirtyCells.forEach(cellKey => {
            const [row, col] = cellKey.split(',').map(Number);
            this.renderCell(graphics, row, col);
        });
        this.dirtyCells.clear();
    }
}
```

### 10.2 Memory Management

**Best Practices:**
- Clean up event listeners in scene destroy()
- Remove graphics objects when not needed
- Avoid creating new objects in update loop
- Reuse arrays/objects where possible

**Scene Cleanup:**
```javascript
destroy() {
    // Remove input listeners
    this.input.keyboard.removeAllListeners();
    
    // Clear graphics
    this.boardGraphics.destroy();
    
    // Stop sounds
    this.audioManager.stopAll();
    
    // Clear references
    this.gameManager = null;
    this.scoreManager = null;
}
```

### 10.3 Calculation Optimization

**Optimizations:**
- Cache frequently accessed values
- Pre-calculate piece shapes
- Use bitwise operations for collision (if applicable)
- Minimize array iterations

---

## 11. Error Handling and Edge Cases

### 11.1 Error Scenarios

**Handled Cases:**
- Invalid piece placement (prevented by validation)
- localStorage quota exceeded (graceful degradation)
- Audio loading failure (continue without audio)
- Invalid input (validation and sanitization)
- Scene transition errors (fallback to menu)

### 11.2 Edge Cases

**Piece Spawning:**
- Check if spawn area is clear
- Handle game over immediately if blocked

**Rotation:**
- Wall kicks for edge rotations
- Prevent rotation into walls/pieces

**Line Clearing:**
- Multiple simultaneous line clears
- Animation timing (if implemented)

**Storage:**
- Handle localStorage unavailable (private browsing)
- Handle corrupted data
- Handle full storage

---

## 12. Testing Strategy

### 12.1 Unit Testing

**Testable Components:**
- TetrisBoard: Collision detection, line clearing
- Tetromino: Rotation, shape generation
- ScoreManager: Score calculation, level progression
- StorageManager: Save/load functionality

### 12.2 Integration Testing

**Test Scenarios:**
- Complete game flow (menu → game → game over)
- Score persistence
- Scene transitions
- Input handling across scenes

### 12.3 Manual Testing Checklist

- All 7 pieces spawn correctly
- All pieces rotate correctly
- Collision detection works
- Line clearing works (1-4 lines)
- Scoring is accurate
- Level progression works
- Speed increases with level
- Pause/resume works
- Game over detection works
- High scores save/load correctly
- All sounds play correctly
- Keyboard navigation works on all screens
- Browser compatibility verified

---

## 13. File Structure

### 13.1 Directory Organization

```
tetris-JEK/
├── docs/
│   ├── tetris-prd.md
│   └── tetris-tdd.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js                    # Phaser config & initialization
│   ├── scenes/
│   │   ├── MainMenuScene.js
│   │   ├── GameScene.js
│   │   ├── PauseScene.js
│   │   ├── GameOverScene.js
│   │   └── HighScoresScene.js
│   ├── game/
│   │   ├── TetrisBoard.js
│   │   ├── Tetromino.js
│   │   ├── GameManager.js
│   │   └── ScoreManager.js
│   ├── managers/
│   │   ├── AudioManager.js
│   │   └── StorageManager.js
│   └── utils/
│       └── constants.js           # Game constants
├── assets/
│   ├── audio/
│   │   ├── rotate.mp3
│   │   ├── line-clear.mp3
│   │   ├── tetris.mp3
│   │   └── game-over.mp3
│   └── fonts/                     # Optional custom fonts
├── lib/
│   └── phaser.min.js              # Or use CDN
└── README.md
```

### 13.2 Module Dependencies

```
main.js
  └── MainMenuScene
      └── (no dependencies)
  └── GameScene
      ├── TetrisBoard
      ├── Tetromino
      ├── GameManager
      │   ├── TetrisBoard
      │   └── ScoreManager
      ├── ScoreManager
      └── AudioManager
  └── PauseScene
      └── (receives game state)
  └── GameOverScene
      └── StorageManager
  └── HighScoresScene
      └── StorageManager
```

---

## 14. Implementation Phases

### Phase 1: Core Setup
- Phaser configuration
- Basic scene structure
- Main menu scene
- Scene navigation

### Phase 2: Game Logic
- TetrisBoard implementation
- Tetromino system
- Basic piece rendering
- Collision detection

### Phase 3: Gameplay
- GameManager implementation
- Piece movement and rotation
- Line clearing logic
- Game over detection

### Phase 4: Scoring & Levels
- ScoreManager implementation
- Level progression
- Speed increase
- UI indicators

### Phase 5: Additional Screens
- Pause scene
- Game over scene
- High scores scene
- Storage implementation

### Phase 6: Polish
- Audio integration
- Visual polish
- Responsive design
- Browser testing

---

## 15. Technical Constraints

### 15.1 Browser Limitations
- localStorage: ~5-10MB limit
- Audio formats: MP3 (universal), OGG (fallback)
- Canvas performance varies by browser

### 15.2 Phaser Constraints
- Phaser 3.x API compatibility
- Scene lifecycle management
- Input system limitations

### 15.3 Performance Targets
- 60 FPS gameplay
- < 2 second load time
- < 50ms input lag
- Smooth animations

---

## 16. Future Technical Enhancements

### 16.1 Potential Improvements
- WebGL renderer for better performance
- Particle effects for line clearing
- Ghost piece preview
- Hold piece feature
- Animation system for piece locking
- Sound effect variations
- Background music system
- Mobile touch controls
- Web Workers for heavy calculations (if needed)

### 16.2 Scalability Considerations
- Modular architecture allows easy feature additions
- Scene system supports additional screens
- Manager pattern allows new systems integration

---

## 17. Glossary

- **Tetromino:** A geometric shape composed of four squares connected orthogonally
- **SRS:** Super Rotation System - standard Tetris rotation system
- **Wall Kick:** Movement adjustment when piece rotates near wall
- **Hard Drop:** Instant drop of piece to bottom
- **Soft Drop:** Accelerated downward movement
- **Tetris:** Clearing 4 lines simultaneously
- **Lock Delay:** Time before piece locks after landing
- **7-Bag System:** Randomization ensuring fair piece distribution

---

**Document Status:** Approved  
**Next Steps:** Begin Phase 1 implementation

