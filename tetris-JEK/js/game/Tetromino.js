// Tetromino Class
class Tetromino {
    constructor(type) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.color = PIECE_COLORS[type] || 0xffffff;
        this.shapes = PIECE_SHAPES[type] || [];
    }

    /**
     * Get the shape array for a specific rotation
     * @param {number} rotation - Rotation index (0-3)
     * @returns {Array} 2D array representing the piece shape
     */
    getShape(rotation = null) {
        if (rotation === null) {
            rotation = this.rotation;
        }
        
        // Normalize rotation to 0-3 range
        rotation = rotation % 4;
        if (rotation < 0) rotation += 4;
        
        // O-piece doesn't rotate, always return first shape
        if (this.type === 'O') {
            return this.shapes[0];
        }
        
        // Return the shape for the requested rotation
        return this.shapes[rotation] || this.shapes[0];
    }

    /**
     * Get the color of this piece
     * @returns {number} Hex color value
     */
    getColor() {
        return this.color;
    }

    /**
     * Get bounding box of the piece
     * @param {number} rotation - Optional rotation to check
     * @returns {Object} {minX, maxX, minY, maxY, width, height}
     */
    getBounds(rotation = null) {
        const shape = this.getShape(rotation);
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    minX = Math.min(minX, col);
                    maxX = Math.max(maxX, col);
                    minY = Math.min(minY, row);
                    maxY = Math.max(maxY, row);
                }
            }
        }
        
        return {
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY,
            width: maxX - minX + 1,
            height: maxY - minY + 1
        };
    }

    /**
     * Set spawn position at top center of board
     * @param {number} boardWidth - Width of the game board
     */
    spawn(boardWidth) {
        const bounds = this.getBounds(0);
        const pieceWidth = bounds.width;
        
        // Center the piece horizontally
        // For O-piece (2x2), center at column 4 (0-indexed: 4-5)
        // For other pieces, center based on their width
        this.x = Math.floor(boardWidth / 2) - Math.floor(pieceWidth / 2);
        
        // Spawn above the board (negative Y)
        // Most pieces need to spawn at y = -2 or -3 to be fully visible
        this.y = -bounds.height;
        
        // Reset rotation
        this.rotation = 0;
    }

    /**
     * Rotate the piece clockwise or counter-clockwise
     * @param {boolean} clockwise - true for clockwise, false for counter-clockwise
     */
    rotate(clockwise = true) {
        // O-piece doesn't rotate
        if (this.type === 'O') {
            return;
        }
        
        if (clockwise) {
            this.rotation = (this.rotation + 1) % 4;
        } else {
            this.rotation = (this.rotation - 1 + 4) % 4;
        }
    }

    /**
     * Create a copy of this tetromino
     * @returns {Tetromino} New Tetromino instance
     */
    clone() {
        const clone = new Tetromino(this.type);
        clone.x = this.x;
        clone.y = this.y;
        clone.rotation = this.rotation;
        return clone;
    }
}

