// Sound Generator - Generates simple sound effects using Web Audio API
// This provides fallback sounds if audio files are not available
class SoundGenerator {
    constructor() {
        this.audioContext = null;
        this.initialized = false;
    }

    /**
     * Initialize the audio context
     */
    init() {
        try {
            // Create audio context (handle browser differences)
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioContext = new AudioContext();
                this.initialized = true;
            }
        } catch (error) {
            console.warn('Web Audio API not available:', error);
            this.initialized = false;
        }
    }

    /**
     * Generate a simple beep sound
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in milliseconds
     * @param {string} type - Waveform type ('sine', 'square', 'triangle', 'sawtooth')
     * @param {number} volume - Volume (0.0 to 1.0)
     */
    beep(frequency = 440, duration = 100, type = 'sine', volume = 0.3) {
        if (!this.initialized || !this.audioContext) {
            return;
        }

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;
            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration / 1000);
        } catch (error) {
            console.warn('Error generating beep:', error);
        }
    }

    /**
     * Generate rotation sound (short click)
     */
    rotate() {
        this.beep(800, 50, 'square', 0.2);
    }

    /**
     * Generate line clear sound (ascending tone)
     */
    lineClear() {
        // Play a short ascending tone
        this.beep(400, 80, 'sine', 0.3);
        setTimeout(() => {
            this.beep(600, 80, 'sine', 0.3);
        }, 50);
    }

    /**
     * Generate Tetris sound (4 lines cleared - more celebratory)
     */
    tetris() {
        // Play a more complex celebratory sound
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.beep(freq, 150, 'sine', 0.4);
            }, index * 80);
        });
    }

    /**
     * Generate game over sound (descending tone)
     */
    gameOver() {
        // Play a descending sad tone
        const notes = [440, 392, 349, 294]; // A4, G4, F4, D4
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.beep(freq, 200, 'sine', 0.4);
            }, index * 150);
        });
    }
}

