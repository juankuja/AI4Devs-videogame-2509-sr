# Product Requirements Document (PRD)
## Tetris Clone Browser Game

**Version:** 1.0  
**Date:** 2024  
**Project:** Lightweight Tetris Clone  
**Location:** `tetris-JEK/`

---

## 1. Overview

### 1.1 Product Description
A lightweight, browser-based Tetris clone game that provides the classic Tetris gameplay experience with modern web technologies. The game will be built using the Phaser framework, a powerful and lightweight 2D game framework for web browsers. The game will be fully playable in modern browsers with optimal performance and smooth gameplay.

### 1.2 Objectives
- Create an engaging, classic Tetris experience accessible through web browsers
- Ensure lightweight implementation for fast loading and smooth performance
- Provide a complete game experience with multiple screens and features
- Maintain compatibility with the most widely used modern browsers
- Implement audio feedback for enhanced gameplay experience

### 1.3 Target Audience
- Casual gamers looking for a classic puzzle game experience
- Users with modern web browsers (Chrome, Firefox, Safari, Edge)
- Players seeking a lightweight, no-installation-required game

---

## 2. Core Game Features

### 2.1 Game Pieces
The game must include all **7 classical Tetris pieces** (tetrominoes):

1. **I-piece** (Line): 4 blocks in a straight line
2. **O-piece** (Square): 2x2 square block
3. **T-piece**: T-shaped tetromino
4. **S-piece**: S-shaped tetromino
5. **Z-piece**: Z-shaped tetromino
6. **J-piece**: J-shaped tetromino
7. **L-piece**: L-shaped tetromino

**Requirements:**
- Each piece must be visually distinct with different colors
- Pieces must rotate clockwise and counter-clockwise
- Pieces must spawn at the top center of the game board
- Pieces must fall automatically at a speed determined by the current level

### 2.2 Game Board (Gridbox)
- **Layout:** Standard Tetris grid (10 columns × 20 rows)
- **Display:** Must fill the browser's page full height
- **Visual:** Clear grid lines or borders to distinguish cells
- **Background:** Attractive color scheme that doesn't interfere with piece visibility

### 2.3 Game Mechanics

#### 2.3.1 Piece Movement
- **Left Arrow:** Move piece left
- **Right Arrow:** Move piece right
- **Down Arrow:** Soft drop (accelerate downward)
- **Up Arrow / Space:** Rotate piece clockwise
- **Shift / Z:** Rotate piece counter-clockwise
- **Hard Drop:** Instant drop to bottom (optional key binding)

#### 2.3.2 Line Clearing
- When a horizontal line is completely filled, it clears
- Multiple lines can be cleared simultaneously
- Cleared lines cause all blocks above to fall down
- Points are awarded based on number of lines cleared at once

#### 2.3.3 Level Progression
- **Speed Increase:** Game speed increases with each new level
- **Level Calculation:** Level increases after clearing a set number of lines (typically 10 lines per level)
- **Speed Formula:** Drop speed decreases (pieces fall faster) as level increases

#### 2.3.4 Game Over Condition
- Game ends when a new piece cannot be placed at the top of the board
- Occurs when the spawn area is blocked by existing pieces

---

## 3. User Interface Components

### 3.1 Game Screen Indicators

The gameplay screen must display the following information panels:

1. **Next Piece Indicator**
   - Shows the next piece that will spawn
   - Displayed in a preview panel adjacent to the game board
   - Must be clearly visible and scaled appropriately

2. **Current Level Indicator**
   - Displays the current level number
   - Updates automatically as player progresses
   - Clear, readable font

3. **Current Score Indicator**
   - Shows the player's current score
   - Updates in real-time as points are earned
   - Prominent display

4. **Lines Cleared Indicator**
   - Displays total number of lines cleared
   - Updates each time lines are cleared
   - May also show lines needed for next level

### 3.2 UI Design Requirements
- **Attractive Design:** Modern, clean, and visually appealing
- **Clear Fonts:** Readable fonts with appropriate sizing
- **Color Scheme:** 
  - High contrast for visibility
  - Distinct colors for each piece type
  - Consistent color palette throughout all screens
- **Responsive Layout:** Adapts to different browser window sizes while maintaining aspect ratio

---

## 4. Game Screens

### 4.1 Main Screen
**Purpose:** Entry point of the game

**Elements:**
- Game title (prominent display)
- "New Game" option (selectable by keyboard)
- "High Scores" option (selectable by keyboard)
- Visual indicators for keyboard navigation (arrows, highlighting)

**Navigation:**
- **Up/Down Arrow Keys:** Navigate between options
- **Enter/Space:** Select highlighted option
- **Escape:** (Optional) Exit game or close any modals

**Design:**
- Centered layout
- Attractive background
- Clear visual feedback for selected option

### 4.2 Game Screen
**Purpose:** Main gameplay area

**Elements:**
- Game board (gridbox) - full height
- Next piece indicator panel
- Current level display
- Current score display
- Lines cleared display
- (Optional) Pause indicator or button

**Controls:**
- All game controls active during gameplay
- **P Key / Escape:** Pause game

**Layout:**
- Game board takes full height of browser window
- Side panel for indicators and next piece preview
- Responsive to window resizing

### 4.3 Game Over Screen
**Purpose:** Display game over state and capture player initials

**Elements:**
- "Game Over" message
- Final score display
- Input box for player initials (3 characters)
- Instructions for entering initials
- Submit/Confirm button
- (Optional) Cancel option

**Functionality:**
- Input validation: Only letters allowed, maximum 3 characters
- Auto-uppercase conversion
- Stores score with initials and timestamp
- After submission, transitions to High Scores screen or Main Screen

**Navigation:**
- **Keyboard:** Type initials directly
- **Enter:** Submit initials
- **Escape:** (Optional) Cancel and return to main screen

### 4.4 Pause Screen
**Purpose:** Allow player to pause and resume gameplay

**Elements:**
- "Paused" message or overlay
- "Resume" option (selectable by keyboard)
- "Main Menu" option (selectable by keyboard)
- Visual overlay that dims the game board

**Navigation:**
- **Up/Down Arrow Keys:** Navigate between options
- **Enter/Space:** Select highlighted option
- **P Key / Escape:** Resume game (when Resume is selected)

**Functionality:**
- Game state is preserved when paused
- Game board remains visible but dimmed
- All game controls disabled except pause menu navigation

### 4.5 High Scores Screen
**Purpose:** Display top player scores

**Elements:**
- Screen title: "High Scores" or "Leaderboard"
- Table or list showing top 10 scores with columns:
  - **Rank:** Position (1-10)
  - **Initials:** Player's 3-letter initials
  - **Score:** Final score achieved
  - **Date/Time:** When the score was achieved
- "Back to Main Menu" option (selectable by keyboard)

**Data Storage:**
- Scores stored in browser's localStorage
- Persists across browser sessions
- Sorted by score (highest first)
- Limited to top 10 entries

**Navigation:**
- **Enter/Space:** Return to main screen
- **Escape:** Return to main screen
- **Arrow Keys:** (Optional) Navigate if multiple actions available

**Display Format:**
```
Rank | Initials | Score    | Date/Time
-----|----------|----------|------------------
1    | ABC      | 125,430  | 2024-01-15 14:30
2    | XYZ      | 98,250   | 2024-01-14 10:15
...
```

---

## 5. Audio Requirements

### 5.1 Sound Effects
The game must include distinct sound effects for the following actions:

1. **Piece Rotation Sound**
   - Plays when player rotates a piece (clockwise or counter-clockwise)
   - Short, clear audio cue
   - Non-intrusive

2. **Line Cleared Sound**
   - Plays when 1-3 lines are cleared simultaneously
   - Satisfying audio feedback
   - Distinct from Tetris sound

3. **Tetris Line Cleared Sound**
   - Plays when 4 lines are cleared simultaneously (Tetris)
   - More impactful/celebratory than regular line clear
   - Special recognition for this achievement

4. **Game Over Sound**
   - Plays when game ends
   - Appropriate tone (not too harsh)
   - Clear indication that game has ended

### 5.2 Audio Implementation
- Audio files must be lightweight (compressed formats: MP3, OGG)
- Phaser's built-in audio system will be used for sound playback
- Volume controls (optional but recommended)
- Mute/unmute functionality (optional but recommended)
- Audio should not interfere with gameplay performance
- Phaser handles audio loading and playback optimization

---

## 6. Technical Requirements

### 6.1 Browser Compatibility
The game must be **fully compatible** with the current most used browsers:

**Required Support:**
- **Google Chrome** (latest 2 versions)
- **Mozilla Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Microsoft Edge** (latest 2 versions)
- **Opera** (latest version)

**Compatibility Requirements:**
- Consistent visual appearance across browsers
- All features functional in all supported browsers
- Keyboard controls work identically (handled by Phaser's input system)
- Audio playback works in all browsers (Phaser's audio system handles browser differences)
- localStorage functionality for high scores
- Responsive layout adapts correctly
- Phaser framework compatibility verified in all target browsers

### 6.2 Technology Stack
- **Phaser Framework:** Primary game framework for rendering, physics, input handling, and scene management
  - Version: Phaser 3.x (latest stable version)
  - Provides Canvas/WebGL rendering, game loop, input management, and audio system
  - Can be included via CDN or local file
- **HTML5:** Structure and semantic markup
- **CSS3:** Styling and layout (flexbox/grid for responsive design)
- **JavaScript:** Game logic and interactivity (ES6+)
- **Phaser Scenes:** For managing different game screens (Main Menu, Game, Game Over, Pause, High Scores)
- **Phaser Audio System:** For sound effects playback
- **localStorage API:** High score persistence

### 6.2.1 Phaser Framework Implementation Details
- **Scene Management:** Each screen (Main Menu, Game, Game Over, Pause, High Scores) will be implemented as a Phaser Scene
- **Rendering:** Phaser's Canvas renderer will be used for the game board and pieces
- **Input Handling:** Phaser's keyboard input system will handle all keyboard controls
- **Game Loop:** Phaser's built-in game loop (update method) will manage piece falling and game timing
- **Sprites/Graphics:** Game pieces will be rendered using Phaser's graphics or sprite system
- **Audio:** Phaser's sound system will handle all sound effect playback
- **Scaling:** Phaser's scale manager will handle responsive sizing to fill browser height

### 6.3 Performance Requirements
- **Load Time:** Game should load quickly (< 2 seconds on average connection)
- **Frame Rate:** Smooth gameplay at 60 FPS
- **Memory:** Efficient memory usage, no memory leaks
- **Responsiveness:** Input lag < 50ms

### 6.4 Code Quality
- Clean, readable, and well-commented code
- Modular structure using Phaser's scene system for maintainability
- Error handling for edge cases
- Follow Phaser best practices and conventions
- Efficient use of Phaser's built-in systems (sprites, groups, tweens, etc.)

---

## 7. Scoring System

### 7.1 Score Calculation
Points awarded for:
- **Single line cleared:** Base points × level multiplier
- **Double lines cleared:** Higher points × level multiplier
- **Triple lines cleared:** Even higher points × level multiplier
- **Tetris (4 lines):** Highest points × level multiplier
- **Soft drop:** Small points per cell dropped
- **Hard drop:** Points based on distance dropped

### 7.2 Level Progression
- Start at Level 1
- Level increases after clearing 10 lines (standard) or configurable number
- Speed increases with each level
- Score multiplier may increase with level

---

## 8. User Experience Flow

### 8.1 Game Flow
```
Main Screen
    ↓ (Select "New Game")
Game Screen (Gameplay)
    ↓ (Pause)
Pause Screen
    ├─→ Resume → Game Screen
    └─→ Main Menu → Main Screen
    ↓ (Game Over)
Game Over Screen
    ↓ (Enter Initials)
High Scores Screen
    ↓ (Back)
Main Screen
```

### 8.2 Alternative Flow
```
Main Screen
    ↓ (Select "High Scores")
High Scores Screen
    ↓ (Back)
Main Screen
```

---

## 9. Success Criteria

### 9.1 Functional Requirements
- ✅ All 7 classical pieces implemented and functional
- ✅ Game board fills browser height
- ✅ All indicators display correctly (next piece, level, score, lines)
- ✅ Speed increases with each level
- ✅ All 5 screens implemented and navigable
- ✅ Keyboard navigation works on all screens
- ✅ High scores persist using localStorage
- ✅ All 4 sound effects implemented and functional

### 9.2 Quality Requirements
- ✅ Attractive, modern UI design
- ✅ Clear fonts and readable text
- ✅ Consistent color scheme
- ✅ Smooth gameplay (60 FPS)
- ✅ Works in all target browsers
- ✅ No critical bugs
- ✅ Responsive to window resizing

### 9.3 User Experience Requirements
- ✅ Intuitive controls
- ✅ Clear visual feedback
- ✅ Smooth transitions between screens
- ✅ Engaging gameplay
- ✅ Satisfying audio feedback

---

## 10. Future Enhancements (Optional)

These features are not required for the initial release but could be considered for future versions:

- Mobile/touch controls support
- Different game themes/skins
- Background music
- Particle effects for line clearing
- Ghost piece preview (showing where piece will land)
- Hold piece feature
- Customizable controls
- Difficulty selection
- Multiplayer mode
- Achievements system

---

## 11. Testing Requirements

### 11.1 Browser Testing
- Test in all required browsers
- Verify all features work identically
- Check responsive behavior at different window sizes
- Verify localStorage functionality

### 11.2 Gameplay Testing
- Test all piece types and rotations
- Verify collision detection
- Test line clearing mechanics
- Verify scoring system
- Test level progression and speed increase
- Test game over conditions

### 11.3 UI/UX Testing
- Test keyboard navigation on all screens
- Verify all indicators update correctly
- Test input validation on game over screen
- Verify high scores display correctly
- Test pause/resume functionality

### 11.4 Audio Testing
- Verify all sound effects play correctly
- Test audio in all browsers
- Verify audio doesn't impact performance

---

## 12. Documentation Requirements

### 12.1 Code Documentation
- Inline comments for complex logic
- Function documentation
- Clear variable naming

### 12.2 User Documentation
- Instructions for controls (can be in-game or README)
- How to play guide (optional)

---

## 13. Project Structure

```
tetris-JEK/
├── docs/
│   └── tetris-prd.md (this document)
├── index.html
├── styles.css
├── js/
│   ├── main.js (Phaser game configuration and initialization)
│   ├── scenes/
│   │   ├── MainMenuScene.js
│   │   ├── GameScene.js
│   │   ├── GameOverScene.js
│   │   ├── PauseScene.js
│   │   └── HighScoresScene.js
│   ├── game/
│   │   ├── TetrisBoard.js (Game board logic)
│   │   ├── Tetromino.js (Piece logic and rotation)
│   │   ├── GameManager.js (Game state management)
│   │   └── ScoreManager.js (Scoring system)
│   └── utils/
│       └── StorageManager.js (localStorage handling)
├── assets/
│   ├── audio/
│   │   ├── rotate.mp3
│   │   ├── line-clear.mp3
│   │   ├── tetris.mp3
│   │   └── game-over.mp3
│   └── (optional: images, fonts, sprites)
├── lib/
│   └── phaser.min.js (or CDN link in HTML)
└── README.md (optional)
```

---

## 14. Acceptance Criteria

The game will be considered complete when:

1. All features listed in this PRD are implemented and functional
2. Game works correctly in all specified browsers
3. All screens are implemented with keyboard navigation
4. All sound effects are implemented and play correctly
5. High scores persist across browser sessions
6. Game is visually attractive with clear fonts and colors
7. Game board fills browser height as specified
8. Speed increases correctly with each level
9. No critical bugs or performance issues
10. Code is clean, readable, and well-structured

---

**Document Status:** Approved  
**Next Steps:** Begin implementation based on this PRD

