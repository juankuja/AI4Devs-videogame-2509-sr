// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.GAME });
    }

    preload() {
        // Load audio files
        // Note: Audio files require a web server (not file:// protocol)
        // If files can't load, the game will use generated sounds (Web Audio API)
        // The game works fine without audio files - they're optional!
        
        // Check if we're running from a server (http/https) or file system
        const isServer = window.location.protocol === 'http:' || window.location.protocol === 'https:';
        
        console.log('Protocol:', window.location.protocol, 'Is Server:', isServer);
        
        if (isServer) {
            // Track loaded audio files
            this.loadedAudioFiles = 0;
            const totalAudioFiles = 4;
            
            // Add completion handlers for each audio file
            this.load.on('filecomplete-audio-rotate', () => {
                console.log('✓ Audio file loaded: rotate.mp3');
                this.loadedAudioFiles++;
                this.checkAudioLoadComplete();
            });
            this.load.on('filecomplete-audio-lineClear', () => {
                console.log('✓ Audio file loaded: line-clear.mp3');
                this.loadedAudioFiles++;
                this.checkAudioLoadComplete();
            });
            this.load.on('filecomplete-audio-tetris', () => {
                console.log('✓ Audio file loaded: tetris.mp3');
                this.loadedAudioFiles++;
                this.checkAudioLoadComplete();
            });
            this.load.on('filecomplete-audio-gameOver', () => {
                console.log('✓ Audio file loaded: game-over.mp3');
                this.loadedAudioFiles++;
                this.checkAudioLoadComplete();
            });
            
            this.load.on('loaderror', (file) => {
                if (file.type === 'audio') {
                    console.warn(`✗ Failed to load audio file: ${file.key} from ${file.url}`);
                    this.loadedAudioFiles++;
                    this.checkAudioLoadComplete();
                }
            });
            
            // Load audio files
            console.log('Loading audio files from server...');
            this.load.audio('rotate', 'assets/audio/rotate.mp3');
            this.load.audio('lineClear', 'assets/audio/line-clear.mp3');
            this.load.audio('tetris', 'assets/audio/tetris.mp3');
            this.load.audio('gameOver', 'assets/audio/game-over.mp3');
        } else {
            // Running from file:// - skip audio file loading, use generated sounds
            console.log('⚠ Running from file system - audio files require a web server');
            console.log('💡 Tip: Use a web server or convert MP3s to base64 (see tools/convert-audio-to-base64.html)');
        }
    }
    
    checkAudioLoadComplete() {
        // This will be called after each audio file loads or fails
        // AudioManager will be initialized in create() after a delay
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#1a1a2e');
        
        // Initialize game components
        this.board = new TetrisBoard();
        this.scoreManager = new ScoreManager();
        this.gameManager = new GameManager(this.board, this.scoreManager);
        
        // Initialize audio manager
        this.audioManager = new AudioManager(this);
        
        // Initialize audio after Phaser's load completes
        // Phaser waits for preload() to finish before calling create(),
        // but we add a small delay to ensure cache is ready
        this.time.delayedCall(100, () => {
            this.audioManager.init();
        });
        
        // Calculate layout
        this.calculateLayout();
        
        // Create graphics objects for rendering
        this.boardGraphics = this.add.graphics();
        this.pieceGraphics = this.add.graphics();
        this.nextPieceGraphics = this.add.graphics();
        
        // Create UI panel background
        this.uiPanelGraphics = this.add.graphics();
        this.drawUIPanel();
        
        // Create UI text elements
        this.createUITexts();
        
        // Start the game
        this.gameManager.startGame();
        
        // Set up input handling
        this.setupInput();
        
        // Handle window resize
        this.scale.on('resize', () => {
            if (this.scene.isActive() && this.cameras && this.cameras.main) {
                this.onResize();
            }
        }, this);
    }

    /**
     * Calculate cell size and layout positions
     */
    calculateLayout() {
        const windowWidth = this.cameras.main.width;
        const windowHeight = this.cameras.main.height;
        
        // UI panel width (fixed or percentage)
        this.uiPanelWidth = Math.min(300, windowWidth * 0.25);
        
        // Available width for board
        const availableWidth = windowWidth - this.uiPanelWidth;
        
        // Calculate cell size based on board height and available height
        // Board should fill full height
        const availableHeight = windowHeight * 0.95; // 95% for board (some padding)
        this.cellSize = Math.floor(availableHeight / BOARD_HEIGHT);
        
        // Ensure board fits horizontally too
        const maxCellSizeByWidth = Math.floor(availableWidth / BOARD_WIDTH);
        this.cellSize = Math.min(this.cellSize, maxCellSizeByWidth);
        
        // Calculate board dimensions
        this.boardPixelWidth = this.cellSize * BOARD_WIDTH;
        this.boardPixelHeight = this.cellSize * BOARD_HEIGHT;
        
        // Calculate offsets to center board vertically
        this.boardOffsetX = (availableWidth - this.boardPixelWidth) / 2;
        this.boardOffsetY = (windowHeight - this.boardPixelHeight) / 2;
        
        // UI panel position
        this.uiPanelX = this.boardOffsetX + this.boardPixelWidth + 20;
        this.uiPanelY = this.boardOffsetY;
    }

    /**
     * Draw UI panel background
     */
    drawUIPanel() {
        this.uiPanelGraphics.clear();
        this.uiPanelGraphics.fillStyle(0x0f0f1e, 0.8);
        this.uiPanelGraphics.fillRect(
            this.uiPanelX,
            this.uiPanelY,
            this.uiPanelWidth - 20,
            this.boardPixelHeight
        );
    }

    /**
     * Create UI text elements
     */
    createUITexts() {
        const uiStartX = this.uiPanelX + 20;
        let uiY = this.uiPanelY + 40;
        
        // Next Piece Label
        this.add.text(uiStartX, uiY, 'NEXT:', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        
        // Next Piece Preview Area
        uiY += 50;
        this.nextPiecePreviewX = uiStartX + 20;
        this.nextPiecePreviewY = uiY;
        this.nextPieceCellSize = Math.floor(this.cellSize * 0.5); // Smaller for preview
        
        // Level Display
        uiY += 120;
        this.add.text(uiStartX, uiY, 'LEVEL:', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#aaaaaa'
        });
        this.levelText = this.add.text(uiStartX + 100, uiY, '1', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        
        // Score Display
        uiY += 50;
        this.add.text(uiStartX, uiY, 'SCORE:', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#aaaaaa'
        });
        this.scoreText = this.add.text(uiStartX, uiY + 30, '0', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        
        // Lines Display
        uiY += 100;
        this.add.text(uiStartX, uiY, 'LINES:', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#aaaaaa'
        });
        this.linesText = this.add.text(uiStartX + 100, uiY, '0', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
    }

    /**
     * Set up keyboard input handling
     */
    setupInput() {
        // Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Create custom keys
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        // Prevent default browser behavior
        this.input.keyboard.preventDefault = true;
        
        // Input repeat delay for left/right movement
        this.moveRepeatTimer = 0;
        this.moveRepeatDelay = 150; // milliseconds
        this.lastMoveTime = 0;
    }

    /**
     * Handle input
     */
    handleInput() {
        if (this.gameManager.getState() !== 'PLAYING') {
            return;
        }
        
        const currentTime = this.time.now;
        
        // Left/Right movement with repeat delay
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.gameManager.movePiece('LEFT');
            this.lastMoveTime = currentTime;
        } else if (this.cursors.left.isDown && currentTime - this.lastMoveTime > this.moveRepeatDelay) {
            this.gameManager.movePiece('LEFT');
            this.lastMoveTime = currentTime;
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.gameManager.movePiece('RIGHT');
            this.lastMoveTime = currentTime;
        } else if (this.cursors.right.isDown && currentTime - this.lastMoveTime > this.moveRepeatDelay) {
            this.gameManager.movePiece('RIGHT');
            this.lastMoveTime = currentTime;
        }
        
        // Soft drop (continuous while held)
        if (this.cursors.down.isDown) {
            this.gameManager.movePiece('DOWN');
        }
        
        // Rotation
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || 
            Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.gameManager.rotatePiece(true)) {
                this.audioManager.play('rotate');
            }
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            if (this.gameManager.rotatePiece(false)) {
                this.audioManager.play('rotate');
            }
        }
        
        // Pause
        if (Phaser.Input.Keyboard.JustDown(this.pKey) || 
            Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.pauseGame();
        }
    }

    /**
     * Pause the game
     */
    pauseGame() {
        if (this.gameManager.getState() === 'PLAYING') {
            this.gameManager.pause();
            this.scene.launch(SCENE_KEYS.PAUSE);
        }
    }

    /**
     * Render the game board
     */
    renderBoard() {
        this.boardGraphics.clear();
        
        // Draw grid background
        this.boardGraphics.fillStyle(0x000000, 1);
        this.boardGraphics.fillRect(
            this.boardOffsetX,
            this.boardOffsetY,
            this.boardPixelWidth,
            this.boardPixelHeight
        );
        
        // Draw grid lines
        this.boardGraphics.lineStyle(1, 0x333333, 0.5);
        for (let row = 0; row <= BOARD_HEIGHT; row++) {
            const y = this.boardOffsetY + row * this.cellSize;
            this.boardGraphics.moveTo(this.boardOffsetX, y);
            this.boardGraphics.lineTo(this.boardOffsetX + this.boardPixelWidth, y);
        }
        for (let col = 0; col <= BOARD_WIDTH; col++) {
            const x = this.boardOffsetX + col * this.cellSize;
            this.boardGraphics.moveTo(x, this.boardOffsetY);
            this.boardGraphics.lineTo(x, this.boardOffsetY + this.boardPixelHeight);
        }
        
        // Draw locked pieces
        for (let row = 0; row < BOARD_HEIGHT; row++) {
            for (let col = 0; col < BOARD_WIDTH; col++) {
                const cellValue = this.board.getCell(row, col);
                if (cellValue > 0) {
                    const pieceType = this.board.getPieceType(cellValue);
                    const color = PIECE_COLORS[pieceType] || 0xffffff;
                    
                    this.boardGraphics.fillStyle(color, 1);
                    this.boardGraphics.fillRect(
                        this.boardOffsetX + col * this.cellSize + 1,
                        this.boardOffsetY + row * this.cellSize + 1,
                        this.cellSize - 2,
                        this.cellSize - 2
                    );
                    
                    // Add border/highlight
                    this.boardGraphics.lineStyle(2, 0xffffff, 0.2);
                    this.boardGraphics.strokeRect(
                        this.boardOffsetX + col * this.cellSize + 1,
                        this.boardOffsetY + row * this.cellSize + 1,
                        this.cellSize - 2,
                        this.cellSize - 2
                    );
                }
            }
        }
    }

    /**
     * Render current piece
     */
    renderCurrentPiece() {
        this.pieceGraphics.clear();
        
        const piece = this.gameManager.getCurrentPiece();
        if (!piece) {
            return;
        }
        
        const shape = piece.getShape();
        const color = piece.getColor();
        
        this.pieceGraphics.fillStyle(color, 1);
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const x = this.boardOffsetX + (piece.x + col) * this.cellSize + 1;
                    const y = this.boardOffsetY + (piece.y + row) * this.cellSize + 1;
                    
                    // Only render if visible (y >= 0)
                    if (piece.y + row >= 0) {
                        this.pieceGraphics.fillRect(x, y, this.cellSize - 2, this.cellSize - 2);
                        
                        // Add border/highlight
                        this.pieceGraphics.lineStyle(2, 0xffffff, 0.5);
                        this.pieceGraphics.strokeRect(x, y, this.cellSize - 2, this.cellSize - 2);
                    }
                }
            }
        }
    }

    /**
     * Render next piece preview
     */
    renderNextPiece() {
        this.nextPieceGraphics.clear();
        
        const nextPiece = this.gameManager.getNextPiece();
        if (!nextPiece) {
            return;
        }
        
        const shape = nextPiece.getShape(0); // Always show rotation 0
        const color = nextPiece.getColor();
        
        // Calculate center position for preview
        const previewWidth = shape[0].length * this.nextPieceCellSize;
        const previewHeight = shape.length * this.nextPieceCellSize;
        const centerX = this.nextPiecePreviewX + (this.uiPanelWidth - 60) / 2 - previewWidth / 2;
        const centerY = this.nextPiecePreviewY;
        
        this.nextPieceGraphics.fillStyle(color, 1);
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const x = centerX + col * this.nextPieceCellSize;
                    const y = centerY + row * this.nextPieceCellSize;
                    
                    this.nextPieceGraphics.fillRect(x, y, this.nextPieceCellSize - 1, this.nextPieceCellSize - 1);
                    
                    // Add border
                    this.nextPieceGraphics.lineStyle(1, 0xffffff, 0.3);
                    this.nextPieceGraphics.strokeRect(x, y, this.nextPieceCellSize - 1, this.nextPieceCellSize - 1);
                }
            }
        }
    }

    /**
     * Update UI text displays
     */
    updateUI() {
        this.levelText.setText(this.scoreManager.getLevel().toString());
        this.scoreText.setText(this.scoreManager.getScore().toLocaleString());
        this.linesText.setText(this.scoreManager.getLinesCleared().toString());
    }

    /**
     * Handle window resize
     */
    onResize() {
        // Check if scene is active and cameras are initialized
        if (!this.scene.isActive() || !this.cameras || !this.cameras.main) {
            return;
        }
        
        this.calculateLayout();
        this.drawUIPanel();
        // Text positions will be recalculated on next render
    }

    /**
     * Update game loop
     */
    update(time, delta) {
        // Handle input
        this.handleInput();
        
        // Update game manager
        this.gameManager.update(delta);
        
        // Check for lines cleared and play appropriate sound
        const linesCleared = this.gameManager.getLastLinesCleared();
        if (linesCleared > 0) {
            if (linesCleared === 4) {
                // Tetris!
                this.audioManager.play('tetris');
            } else {
                // Regular line clear (1-3 lines)
                this.audioManager.play('lineClear');
            }
        }
        
        // Check for game over
        if (this.gameManager.isGameOver()) {
            this.audioManager.play('gameOver');
            this.scene.start(SCENE_KEYS.GAME_OVER, {
                score: this.scoreManager.getScore(),
                level: this.scoreManager.getLevel(),
                lines: this.scoreManager.getLinesCleared()
            });
            return;
        }
        
        // Render everything
        this.renderBoard();
        this.renderCurrentPiece();
        this.renderNextPiece();
        this.updateUI();
    }
}

