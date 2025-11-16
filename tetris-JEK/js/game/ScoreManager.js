// Score Manager
class ScoreManager {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.linesCleared = 0;
        this.linesForNextLevel = LINES_PER_LEVEL;
    }

    /**
     * Add points to the current score
     * @param {number} amount - Points to add
     */
    addScore(amount) {
        this.score += amount;
    }

    /**
     * Calculate and add score for clearing lines
     * @param {number} count - Number of lines cleared (1-4)
     * @param {number} level - Current level (for multiplier)
     * @returns {number} Points awarded
     */
    clearLines(count, level = null) {
        if (level === null) {
            level = this.level;
        }

        let baseScore = 0;
        
        switch(count) {
            case 1:
                baseScore = SCORE_VALUES.SINGLE;
                break;
            case 2:
                baseScore = SCORE_VALUES.DOUBLE;
                break;
            case 3:
                baseScore = SCORE_VALUES.TRIPLE;
                break;
            case 4:
                baseScore = SCORE_VALUES.TETRIS;
                break;
            default:
                baseScore = 0;
        }

        // Apply level multiplier
        const points = baseScore * level;
        this.addScore(points);
        
        // Update lines cleared
        this.linesCleared += count;
        
        // Check for level up
        this.checkLevelUp();
        
        return points;
    }

    /**
     * Add score for dropping a piece
     * @param {number} distance - Number of cells dropped
     * @param {boolean} isHardDrop - True if hard drop, false if soft drop
     */
    addDropScore(distance, isHardDrop = false) {
        const pointsPerCell = isHardDrop ? SCORE_VALUES.HARD_DROP : SCORE_VALUES.SOFT_DROP;
        const points = distance * pointsPerCell;
        this.addScore(points);
        return points;
    }

    /**
     * Check if level should increase (called after clearing lines)
     * Level increases every 10 lines cleared (cumulative)
     * @returns {boolean} True if level increased
     */
    checkLevelUp() {
        // Level increases every 10 lines (10, 20, 30, etc.)
        const newLevel = Math.floor(this.linesCleared / LINES_PER_LEVEL) + 1;
        
        if (newLevel > this.level) {
            this.level = newLevel;
            this.linesForNextLevel = this.level * LINES_PER_LEVEL;
            return true;
        }
        return false;
    }

    /**
     * Increase the level manually (if needed)
     */
    increaseLevel() {
        this.level++;
        this.linesForNextLevel = this.level * LINES_PER_LEVEL;
    }

    /**
     * Get current score
     * @returns {number} Current score
     */
    getScore() {
        return this.score;
    }

    /**
     * Get current level
     * @returns {number} Current level
     */
    getLevel() {
        return this.level;
    }

    /**
     * Get total lines cleared
     * @returns {number} Total lines cleared
     */
    getLinesCleared() {
        return this.linesCleared;
    }

    /**
     * Get lines needed for next level
     * @returns {number} Lines needed for next level
     */
    getLinesForNextLevel() {
        return Math.max(0, this.linesForNextLevel - this.linesCleared);
    }

    /**
     * Reset score manager for new game
     */
    reset() {
        this.score = 0;
        this.level = 1;
        this.linesCleared = 0;
        this.linesForNextLevel = LINES_PER_LEVEL;
    }
}

