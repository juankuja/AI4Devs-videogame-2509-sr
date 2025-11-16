// Game Over Scene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.GAME_OVER });
    }

    init(data) {
        // Receive data from GameScene
        this.finalScore = data.score || 0;
        this.finalLevel = data.level || 1;
        this.finalLines = data.lines || 0;
        this.initials = '';
        this.maxInitials = 3;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        let y = 150;
        
        // Game Over title
        this.add.text(centerX, y, 'GAME OVER', {
            fontSize: '72px',
            fontFamily: 'Arial',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        y += 100;
        
        // Final Score
        this.add.text(centerX, y, 'Final Score:', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#aaaaaa'
        }).setOrigin(0.5);
        
        y += 40;
        this.add.text(centerX, y, this.finalScore.toLocaleString(), {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        y += 80;
        
        // Level and Lines
        this.add.text(centerX, y, `Level: ${this.finalLevel}  |  Lines: ${this.finalLines}`, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#aaaaaa'
        }).setOrigin(0.5);
        
        y += 100;
        
        // Initials input label
        this.add.text(centerX, y, 'Enter Your Initials:', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        y += 60;
        
        // Initials display (3 boxes)
        this.initialsBoxes = [];
        const boxWidth = 60;
        const boxHeight = 80;
        const boxSpacing = 20;
        const totalWidth = (boxWidth * this.maxInitials) + (boxSpacing * (this.maxInitials - 1));
        const startX = centerX - (totalWidth / 2) + (boxWidth / 2);
        
        for (let i = 0; i < this.maxInitials; i++) {
            const x = startX + i * (boxWidth + boxSpacing);
            const box = this.add.rectangle(x, y, boxWidth, boxHeight, 0x333333, 1);
            box.setStrokeStyle(2, 0xffffff, 1);
            
            const text = this.add.text(x, y, '', {
                fontSize: '48px',
                fontFamily: 'Arial',
                color: '#ffff00',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.initialsBoxes.push({ box: box, text: text });
        }
        
        y += 120;
        
        // Instructions
        this.add.text(centerX, y, 'Type 3 letters, then press ENTER', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#888888'
        }).setOrigin(0.5);
        
        // Storage manager
        this.storageManager = new StorageManager();
        
        // Keyboard input
        this.input.keyboard.on('keydown', this.handleKeyInput, this);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.backspaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        
        // Prevent default browser behavior
        this.input.keyboard.preventDefault = true;
    }

    handleKeyInput(event) {
        // Handle letter input (A-Z)
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (this.initials.length < this.maxInitials) {
                const letter = String.fromCharCode(event.keyCode);
                this.initials += letter;
                this.updateInitialsDisplay();
            }
        }
    }

    update() {
        // Handle backspace
        if (Phaser.Input.Keyboard.JustDown(this.backspaceKey)) {
            if (this.initials.length > 0) {
                this.initials = this.initials.substring(0, this.initials.length - 1);
                this.updateInitialsDisplay();
            }
        }
        
        // Handle enter to submit
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            if (this.initials.length === this.maxInitials) {
                this.submitScore();
            }
        }
    }

    updateInitialsDisplay() {
        // Update all boxes
        for (let i = 0; i < this.maxInitials; i++) {
            const letter = i < this.initials.length ? this.initials[i] : '';
            this.initialsBoxes[i].text.setText(letter);
            
            // Highlight current box
            if (i === this.initials.length) {
                this.initialsBoxes[i].box.setStrokeStyle(3, 0xffff00, 1);
            } else {
                this.initialsBoxes[i].box.setStrokeStyle(2, 0xffffff, 1);
            }
        }
        
        // Highlight last box if all filled
        if (this.initials.length === this.maxInitials) {
            this.initialsBoxes[this.maxInitials - 1].box.setStrokeStyle(3, 0x00ff00, 1);
        }
    }

    submitScore() {
        // Validate initials
        if (this.initials.length !== this.maxInitials) {
            return;
        }
        
        // Format initials (uppercase, pad if needed)
        const formattedInitials = this.initials.toUpperCase().padEnd(3, ' ');
        
        // Save score
        this.storageManager.saveScore(
            formattedInitials,
            this.finalScore,
            this.finalLevel,
            this.finalLines
        );
        
        // Navigate to high scores
        this.scene.start(SCENE_KEYS.HIGH_SCORES);
    }
}

