// Game Manager
class GameManager {
    constructor(board, scoreManager) {
        this.board = board;
        this.scoreManager = scoreManager;
        this.currentPiece = null;
        this.nextPiece = null;
        this.gameState = 'PLAYING'; // PLAYING, PAUSED, GAME_OVER
        this.fallTimer = 0;
        this.fallInterval = 1000; // milliseconds
        this.pieceQueue = [];
        this.softDropActive = false;
        this.lastLinesCleared = 0; // Track lines cleared for audio
    }

    /**
     * Initialize and start a new game
     */
    startGame() {
        // Reset board and score
        this.board.clear();
        this.scoreManager.reset();
        
        // Reset game state
        this.gameState = 'PLAYING';
        this.fallTimer = 0;
        this.fallInterval = this.calculateFallSpeed(this.scoreManager.getLevel());
        
        // Initialize piece queue
        this.pieceQueue = [];
        this.generatePieceQueue();
        
        // Spawn first piece
        this.spawnPiece();
    }

    /**
     * Generate a queue of pieces using 7-bag system for fair distribution
     */
    generatePieceQueue() {
        const pieces = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        
        // Shuffle array (Fisher-Yates)
        const shuffled = [...pieces];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Add shuffled pieces to queue
        this.pieceQueue.push(...shuffled);
        
        // If queue is getting low, add another bag
        if (this.pieceQueue.length < 7) {
            this.generatePieceQueue();
        }
    }

    /**
     * Spawn a new piece at the top of the board
     */
    spawnPiece() {
        // Move next piece to current
        if (this.nextPiece) {
            this.currentPiece = this.nextPiece;
        } else {
            // Generate first piece
            if (this.pieceQueue.length === 0) {
                this.generatePieceQueue();
            }
            const pieceType = this.pieceQueue.shift();
            this.currentPiece = new Tetromino(pieceType);
        }
        
        // Spawn current piece
        this.currentPiece.spawn(this.board.width);
        
        // Check game over
        if (!this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y)) {
            this.gameState = 'GAME_OVER';
            return false;
        }
        
        // Generate next piece
        if (this.pieceQueue.length === 0) {
            this.generatePieceQueue();
        }
        const nextPieceType = this.pieceQueue.shift();
        this.nextPiece = new Tetromino(nextPieceType);
        
        return true;
    }

    /**
     * Calculate fall speed based on level
     * @param {number} level - Current level
     * @returns {number} Fall interval in milliseconds
     */
    calculateFallSpeed(level) {
        // Classic Tetris formula: speed = 1000 - (level - 1) * 50
        // Minimum speed: 50ms
        return Math.max(50, 1000 - (level - 1) * 50);
    }

    /**
     * Update game loop
     * @param {number} delta - Time delta in milliseconds
     */
    update(delta) {
        if (this.gameState !== 'PLAYING') {
            return;
        }
        
        // Update fall timer
        this.fallTimer += delta;
        
        // Calculate current fall speed (may have changed due to level up)
        const currentFallSpeed = this.calculateFallSpeed(this.scoreManager.getLevel());
        if (currentFallSpeed !== this.fallInterval) {
            this.fallInterval = currentFallSpeed;
        }
        
        // Move piece down if timer expired
        if (this.fallTimer >= this.fallInterval) {
            this.fallTimer = 0;
            this.movePieceDown();
        }
    }

    /**
     * Move piece in a direction
     * @param {string} direction - 'LEFT', 'RIGHT', or 'DOWN'
     * @returns {boolean} True if move was successful
     */
    movePiece(direction) {
        if (!this.currentPiece || this.gameState !== 'PLAYING') {
            return false;
        }
        
        let newX = this.currentPiece.x;
        let newY = this.currentPiece.y;
        
        switch(direction) {
            case 'LEFT':
                newX--;
                break;
            case 'RIGHT':
                newX++;
                break;
            case 'DOWN':
                newY++;
                break;
            default:
                return false;
        }
        
        if (this.board.isValidPosition(this.currentPiece, newX, newY)) {
            this.currentPiece.x = newX;
            this.currentPiece.y = newY;
            return true;
        }
        
        return false;
    }

    /**
     * Move piece down (used by game loop and soft drop)
     * @returns {boolean} True if moved, false if locked
     */
    movePieceDown() {
        if (this.movePiece('DOWN')) {
            return true;
        } else {
            // Piece can't move down, lock it
            this.lockPiece();
            return false;
        }
    }

    /**
     * Rotate piece clockwise or counter-clockwise
     * @param {boolean} clockwise - True for clockwise, false for counter-clockwise
     * @returns {boolean} True if rotation was successful
     */
    rotatePiece(clockwise = true) {
        if (!this.currentPiece || this.gameState !== 'PLAYING') {
            return false;
        }
        
        // Try rotation
        const testRotation = clockwise ? 
            (this.currentPiece.rotation + 1) % 4 : 
            (this.currentPiece.rotation - 1 + 4) % 4;
        
        if (this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y, testRotation)) {
            this.currentPiece.rotate(clockwise);
            return true;
        }
        
        // Try wall kick (shift left/right if rotation fails)
        // Simple wall kick: try moving left, then right
        if (this.board.isValidPosition(this.currentPiece, this.currentPiece.x - 1, this.currentPiece.y, testRotation)) {
            this.currentPiece.x--;
            this.currentPiece.rotate(clockwise);
            return true;
        }
        
        if (this.board.isValidPosition(this.currentPiece, this.currentPiece.x + 1, this.currentPiece.y, testRotation)) {
            this.currentPiece.x++;
            this.currentPiece.rotate(clockwise);
            return true;
        }
        
        return false;
    }

    /**
     * Hard drop - instantly drop piece to bottom
     * @returns {number} Distance dropped
     */
    hardDrop() {
        if (!this.currentPiece || this.gameState !== 'PLAYING') {
            return 0;
        }
        
        let dropDistance = 0;
        while (this.movePiece('DOWN')) {
            dropDistance++;
        }
        
        // Add score bonus
        if (dropDistance > 0) {
            this.scoreManager.addDropScore(dropDistance, true);
        }
        
        // Lock piece immediately
        this.lockPiece();
        
        return dropDistance;
    }

    /**
     * Lock current piece and handle line clearing
     */
    lockPiece() {
        if (!this.currentPiece) {
            return;
        }
        
        // Lock piece on board
        this.board.lockPiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
        
        // Clear lines and update score
        const linesCleared = this.board.clearLines();
        this.lastLinesCleared = linesCleared; // Store for audio callback
        if (linesCleared > 0) {
            this.scoreManager.clearLines(linesCleared);
            // Update fall speed if level changed
            this.fallInterval = this.calculateFallSpeed(this.scoreManager.getLevel());
        }
        
        // Spawn next piece
        this.currentPiece = null;
        if (!this.spawnPiece()) {
            // Game over
            this.gameState = 'GAME_OVER';
        }
    }

    /**
     * Pause the game
     */
    pause() {
        if (this.gameState === 'PLAYING') {
            this.gameState = 'PAUSED';
        }
    }

    /**
     * Resume the game
     */
    resume() {
        if (this.gameState === 'PAUSED') {
            this.gameState = 'PLAYING';
        }
    }

    /**
     * Check if game is over
     * @returns {boolean} True if game is over
     */
    isGameOver() {
        return this.gameState === 'GAME_OVER';
    }

    /**
     * Get current game state
     * @returns {string} Game state
     */
    getState() {
        return this.gameState;
    }

    /**
     * Get current piece
     * @returns {Tetromino} Current piece or null
     */
    getCurrentPiece() {
        return this.currentPiece;
    }

    /**
     * Get next piece
     * @returns {Tetromino} Next piece or null
     */
    getNextPiece() {
        return this.nextPiece;
    }

    /**
     * Get and reset last lines cleared count (for audio)
     * @returns {number} Number of lines cleared in last lock
     */
    getLastLinesCleared() {
        const count = this.lastLinesCleared;
        this.lastLinesCleared = 0; // Reset after reading
        return count;
    }
}

