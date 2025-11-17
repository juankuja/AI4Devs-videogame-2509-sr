// Phaser Game Configuration
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
    },
    input: {
        keyboard: {
            preventDefault: true
        }
    }
};

// Initialize Phaser Game
const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

