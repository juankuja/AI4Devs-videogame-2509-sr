// High Scores Scene
class HighScoresScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.HIGH_SCORES });
    }

    create() {
        // Set background
        this.cameras.main.setBackgroundColor('#1a1a2e');
        
        const centerX = this.cameras.main.width / 2;
        let y = 80;
        
        // Title
        this.add.text(centerX, y, 'HIGH SCORES', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        y += 100;
        
        // Load scores
        this.storageManager = new StorageManager();
        const scores = this.storageManager.getTopScores(10);
        
        // Define table layout - first set column positions (original layout)
        const rankX = centerX - 200;
        const initialsX = centerX - 100;
        const scoreX = centerX + 50;
        const dateX = centerX + 200;
        
        // Calculate table boundaries based on column positions
        // Add padding to encompass all columns including the widest text
        const leftPadding = 20;
        const rightPadding = 120; // Space for "DATE/TIME" text width
        const tableLeft = rankX - leftPadding;
        const tableRight = dateX + rightPadding;
        
        // Table header
        const headerY = y;
        
        // Create header text objects
        this.add.text(rankX, headerY, 'RANK', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        });
        this.add.text(initialsX, headerY, 'INITIALS', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        });
        this.add.text(scoreX, headerY, 'SCORE', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        });
        this.add.text(dateX, headerY, 'DATE/TIME', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fontStyle: 'bold'
        });
        
        y += 40;
        
        // Draw separator line using the exact table boundaries
        const separatorGraphics = this.add.graphics();
        separatorGraphics.lineStyle(1, 0x666666, 1);
        separatorGraphics.moveTo(tableLeft, y);
        separatorGraphics.lineTo(tableRight, y);
        separatorGraphics.strokePath();
        
        y += 20; // Add spacing after separator
        
        // Display scores
        if (scores.length === 0) {
            // No scores yet
            this.add.text(centerX, y + 50, 'No scores yet!\nPlay a game to set a high score.', {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#888888',
                align: 'center'
            }).setOrigin(0.5);
        } else {
            scores.forEach((scoreEntry, index) => {
                const rank = index + 1;
                const rankColor = rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : rank === 3 ? '#cd7f32' : '#ffffff';
                
                // Rank
                this.add.text(rankX, y, rank.toString(), {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: rankColor,
                    fontStyle: 'bold'
                });
                
                // Initials
                this.add.text(initialsX, y, scoreEntry.initials || '---', {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    fontStyle: 'bold'
                });
                
                // Score
                this.add.text(scoreX, y, scoreEntry.score.toLocaleString(), {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: '#ffffff'
                });
                
                // Date/Time
                const dateTime = this.storageManager.formatDateTime(scoreEntry.dateTime);
                this.add.text(dateX, y, dateTime, {
                    fontSize: '18px',
                    fontFamily: 'Arial',
                    color: '#aaaaaa'
                });
                
                y += 40;
            });
        }
        
        y += 60;
        
        // Back to menu instruction
        this.add.text(centerX, this.cameras.main.height - 80, 'Press ENTER or SPACE to return to Main Menu', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#888888'
        }).setOrigin(0.5);
        
        // Keyboard input
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        // Prevent default browser behavior
        this.input.keyboard.preventDefault = true;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escKey) ||
            Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
            Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start(SCENE_KEYS.MAIN_MENU);
        }
    }
}

