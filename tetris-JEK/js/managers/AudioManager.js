// Audio Manager
class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.sounds = {};
        this.muted = false;
        this.volume = 1.0;
        this.audioEnabled = true;
        this.soundGenerator = null; // Fallback sound generator
    }

    /**
     * Initialize audio manager and load sounds
     * Should be called after audio files are preloaded
     */
    init() {
        try {
            let loadedCount = 0;
            const soundKeys = ['rotate', 'lineClear', 'tetris', 'gameOver'];
            
            console.log('Initializing AudioManager...');
            console.log('AUDIO_DATA available:', typeof AUDIO_DATA !== 'undefined' && Object.keys(AUDIO_DATA).length > 0);
            console.log('Audio cache check:', soundKeys.map(k => ({key: k, exists: this.scene.cache.audio.exists(k)})));
            
            // First, try to load from base64 data (works with file:// protocol)
            if (typeof AUDIO_DATA !== 'undefined' && Object.keys(AUDIO_DATA).length > 0) {
                console.log('Trying to load from base64 data...');
                soundKeys.forEach(key => {
                    try {
                        if (AUDIO_DATA[key]) {
                            // Use native Audio API with data URI (works without server)
                            const audio = new Audio(AUDIO_DATA[key]);
                            audio.volume = this.volume;
                            
                            // Create a wrapper that matches Phaser's sound interface
                            this.sounds[key] = {
                                play: () => {
                                    // Clone and play to allow overlapping sounds
                                    const clone = audio.cloneNode();
                                    clone.volume = this.volume;
                                    clone.play().catch(err => {
                                        // Ignore play() errors (e.g., user hasn't interacted yet)
                                    });
                                },
                                setVolume: (vol) => {
                                    this.volume = vol;
                                    audio.volume = vol;
                                },
                                stop: () => {
                                    audio.pause();
                                    audio.currentTime = 0;
                                }
                            };
                            loadedCount++;
                            console.log(`✓ Loaded audio from base64: ${key}`);
                        }
                    } catch (error) {
                        console.warn(`✗ Error loading base64 audio "${key}":`, error);
                    }
                });
            }
            
            // Also try to load from cached audio files (if running from server)
            console.log('Trying to load from Phaser cache...');
            soundKeys.forEach(key => {
                try {
                    // Check if audio exists in cache (from preload) and not already loaded
                    if (this.scene.cache.audio.exists(key)) {
                        if (!this.sounds[key]) {
                            // Create sound object from cached audio
                            this.sounds[key] = this.scene.sound.add(key);
                            this.sounds[key].setVolume(this.volume);
                            loadedCount++;
                            console.log(`✓ Loaded audio file from cache: ${key}`);
                        } else {
                            console.log(`- Audio "${key}" already loaded from base64`);
                        }
                    } else {
                        console.log(`- Audio "${key}" not found in cache`);
                    }
                } catch (error) {
                    console.warn(`✗ Error loading cached audio "${key}":`, error);
                }
            });
            
            // If no audio files loaded, use sound generator as fallback
            if (loadedCount === 0) {
                console.log('⚠ No audio files found, using generated sound effects (Web Audio API)');
                this.soundGenerator = new SoundGenerator();
                this.soundGenerator.init();
            } else {
                console.log(`✓ Successfully loaded ${loadedCount} audio file(s)`);
            }
            
            this.audioEnabled = loadedCount > 0 || this.soundGenerator !== null;
        } catch (error) {
            console.error('Error initializing AudioManager:', error);
            // Try to use sound generator as fallback
            try {
                this.soundGenerator = new SoundGenerator();
                this.soundGenerator.init();
                this.audioEnabled = true;
            } catch (genError) {
                console.error('Sound generator also failed:', genError);
                this.audioEnabled = false;
            }
        }
    }

    /**
     * Play a sound effect
     * @param {string} soundName - Name of the sound to play
     */
    play(soundName) {
        if (!this.audioEnabled || this.muted) {
            return;
        }
        
        try {
            // Try to play preloaded sound file first
            if (this.sounds[soundName]) {
                this.sounds[soundName].play();
            } 
            // Fallback to generated sound if file not available
            else if (this.soundGenerator) {
                switch(soundName) {
                    case 'rotate':
                        this.soundGenerator.rotate();
                        break;
                    case 'lineClear':
                        this.soundGenerator.lineClear();
                        break;
                    case 'tetris':
                        this.soundGenerator.tetris();
                        break;
                    case 'gameOver':
                        this.soundGenerator.gameOver();
                        break;
                }
            }
        } catch (error) {
            console.warn(`Error playing sound "${soundName}":`, error);
        }
    }

    /**
     * Set muted state
     * @param {boolean} muted - True to mute, false to unmute
     */
    setMuted(muted) {
        this.muted = muted;
    }

    /**
     * Set volume for all sounds
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    setVolume(volume) {
        this.volume = Phaser.Math.Clamp(volume, 0, 1);
        
        // Apply volume to all sounds
        Object.values(this.sounds).forEach(sound => {
            if (sound) {
                sound.setVolume(this.volume);
            }
        });
    }

    /**
     * Stop all sounds
     */
    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            if (sound && typeof sound.stop === 'function') {
                sound.stop();
            }
        });
    }

    /**
     * Check if audio is enabled
     * @returns {boolean} True if audio is enabled
     */
    isEnabled() {
        return this.audioEnabled && !this.muted;
    }
}

