// Tetris Board Class
class TetrisBoard {
    constructor(width = BOARD_WIDTH, height = BOARD_HEIGHT) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.initialize();
    }

    /**
     * Initialize the board with empty cells
     */
    initialize() {
        this.grid = [];
        for (let row = 0; row < this.height; row++) {
            this.grid[row] = new Array(this.width).fill(0);
        }
    }

    /**
     * Get the value at a specific cell
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @returns {number} Cell value (0 = empty, 1-7 = piece type)
     */
    getCell(row, col) {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            return -1; // Out of bounds
        }
        return this.grid[row][col];
    }

    /**
     * Set the value at a specific cell
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @param {number} value - Cell value (0 = empty, 1-7 = piece type)
     */
    setCell(row, col, value) {
        if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
            this.grid[row][col] = value;
        }
    }

    /**
     * Check if a piece can be placed at the given position
     * @param {Tetromino} piece - The tetromino piece
     * @param {number} x - X position (column)
     * @param {number} y - Y position (row)
     * @param {number} rotation - Rotation index (optional, uses piece.rotation if not provided)
     * @returns {boolean} True if position is valid
     */
    isValidPosition(piece, x, y, rotation = null) {
        if (rotation === null) {
            rotation = piece.rotation;
        }
        
        const shape = piece.getShape(rotation);
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardX = x + col;
                    const boardY = y + row;
                    
                    // Boundary check (left and right)
                    if (boardX < 0 || boardX >= this.width) {
                        return false;
                    }
                    
                    // Bottom boundary check
                    if (boardY >= this.height) {
                        return false;
                    }
                    
                    // Collision check (only check if within board bounds)
                    // Allow negative Y for spawn area above board
                    if (boardY >= 0 && this.grid[boardY][boardX] !== 0) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }

    /**
     * Place a piece temporarily on the board (for preview/ghost)
     * @param {Tetromino} piece - The tetromino piece
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} rotation - Rotation index
     * @returns {boolean} True if placement was successful
     */
    placePiece(piece, x, y, rotation = null) {
        if (!this.isValidPosition(piece, x, y, rotation)) {
            return false;
        }
        
        // This is a temporary placement, so we don't actually modify the grid
        // This method is mainly for validation
        return true;
    }

    /**
     * Lock a piece permanently on the board
     * @param {Tetromino} piece - The tetromino piece
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} rotation - Rotation index
     * @returns {boolean} True if locking was successful
     */
    lockPiece(piece, x, y, rotation = null) {
        if (!this.isValidPosition(piece, x, y, rotation)) {
            return false;
        }
        
        const shape = piece.getShape(rotation);
        const pieceTypeValue = this.getPieceTypeValue(piece.type);
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardX = x + col;
                    const boardY = y + row;
                    
                    // Only lock cells that are within board bounds
                    if (boardY >= 0 && boardY < this.height && 
                        boardX >= 0 && boardX < this.width) {
                        this.grid[boardY][boardX] = pieceTypeValue;
                    }
                }
            }
        }
        
        return true;
    }

    /**
     * Get numeric value for piece type (for grid storage)
     * @param {string} type - Piece type ('I', 'O', 'T', 'S', 'Z', 'J', 'L')
     * @returns {number} Numeric value (1-7)
     */
    getPieceTypeValue(type) {
        const typeMap = {
            'I': 1,
            'O': 2,
            'T': 3,
            'S': 4,
            'Z': 5,
            'J': 6,
            'L': 7
        };
        return typeMap[type] || 0;
    }

    /**
     * Get piece type from numeric value
     * @param {number} value - Numeric value (1-7)
     * @returns {string} Piece type
     */
    getPieceType(value) {
        const valueMap = {
            1: 'I',
            2: 'O',
            3: 'T',
            4: 'S',
            5: 'Z',
            6: 'J',
            7: 'L'
        };
        return valueMap[value] || null;
    }

    /**
     * Get array of row indices that are completely filled
     * @returns {Array<number>} Array of full line row indices
     */
    getFullLines() {
        const fullLines = [];
        
        for (let row = 0; row < this.height; row++) {
            let isFull = true;
            for (let col = 0; col < this.width; col++) {
                if (this.grid[row][col] === 0) {
                    isFull = false;
                    break;
                }
            }
            if (isFull) {
                fullLines.push(row);
            }
        }
        
        return fullLines;
    }

    /**
     * Remove a specific line and shift all lines above down
     * @param {number} rowIndex - Row index to remove
     */
    removeLine(rowIndex) {
        if (rowIndex < 0 || rowIndex >= this.height) {
            return;
        }
        
        // Remove the line
        this.grid.splice(rowIndex, 1);
        
        // Add a new empty line at the top
        this.grid.unshift(new Array(this.width).fill(0));
    }

    /**
     * Clear all full lines and return the count
     * @returns {number} Number of lines cleared
     */
    clearLines() {
        const fullLines = this.getFullLines();
        
        if (fullLines.length === 0) {
            return 0;
        }
        
        // Remove lines from bottom to top to maintain correct indices
        fullLines.sort((a, b) => b - a);
        
        for (const rowIndex of fullLines) {
            this.removeLine(rowIndex);
        }
        
        return fullLines.length;
    }

    /**
     * Check if the game is over (spawn area is blocked)
     * @param {Tetromino} piece - The piece that would spawn
     * @returns {boolean} True if game is over
     */
    isGameOver(piece = null) {
        // Check if spawn area (top rows) is blocked
        // Check top 2-3 rows for any locked pieces
        const spawnCheckRows = Math.min(3, this.height);
        
        for (let row = 0; row < spawnCheckRows; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.grid[row][col] !== 0) {
                    return true;
                }
            }
        }
        
        // If a piece is provided, also check if it can spawn
        if (piece) {
            piece.spawn(this.width);
            if (!this.isValidPosition(piece, piece.x, piece.y, piece.rotation)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Clear the entire board
     */
    clear() {
        this.initialize();
    }
}

