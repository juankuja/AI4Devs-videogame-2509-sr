// Storage Manager
class StorageManager {
    constructor() {
        this.storageKey = 'tetris_high_scores';
        this.maxScores = 10;
    }

    /**
     * Save a new score to localStorage
     * @param {string} initials - Player initials (3 characters)
     * @param {number} score - Final score
     * @param {number} level - Final level
     * @param {number} lines - Total lines cleared
     * @returns {boolean} True if saved successfully
     */
    saveScore(initials, score, level, lines) {
        try {
            // Validate and format initials
            initials = initials.toUpperCase().substring(0, 3).padEnd(3, ' ');
            
            const scores = this.getScores();
            const newEntry = {
                initials: initials,
                score: score,
                level: level,
                lines: lines,
                dateTime: new Date().toISOString()
            };
            
            // Add new score
            scores.push(newEntry);
            
            // Sort by score (highest first)
            scores.sort((a, b) => b.score - a.score);
            
            // Keep only top scores
            scores.splice(this.maxScores);
            
            // Save to localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(scores));
            
            return true;
        } catch (error) {
            console.error('Error saving score:', error);
            // Handle localStorage quota exceeded or other errors
            return false;
        }
    }

    /**
     * Get all scores from localStorage
     * @returns {Array} Array of score objects
     */
    getScores() {
        try {
            const scoresJson = localStorage.getItem(this.storageKey);
            if (!scoresJson) {
                return [];
            }
            
            const scores = JSON.parse(scoresJson);
            // Validate scores array
            if (!Array.isArray(scores)) {
                return [];
            }
            
            return scores;
        } catch (error) {
            console.error('Error loading scores:', error);
            return [];
        }
    }

    /**
     * Get top N scores
     * @param {number} limit - Maximum number of scores to return
     * @returns {Array} Array of top score objects
     */
    getTopScores(limit = this.maxScores) {
        const scores = this.getScores();
        return scores.slice(0, Math.min(limit, scores.length));
    }

    /**
     * Check if a score qualifies as a high score
     * @param {number} score - Score to check
     * @returns {boolean} True if score qualifies
     */
    isHighScore(score) {
        const scores = this.getScores();
        
        // If less than max scores, always qualifies
        if (scores.length < this.maxScores) {
            return true;
        }
        
        // Check if score is higher than lowest high score
        const lowestScore = scores[scores.length - 1];
        return score > lowestScore.score;
    }

    /**
     * Clear all scores (for testing/debugging)
     */
    clearScores() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing scores:', error);
            return false;
        }
    }

    /**
     * Format date/time for display
     * @param {string} isoString - ISO date string
     * @returns {string} Formatted date string
     */
    formatDateTime(isoString) {
        try {
            const date = new Date(isoString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } catch (error) {
            return 'Unknown';
        }
    }
}

