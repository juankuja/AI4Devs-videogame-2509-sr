// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.MAIN_MENU });
    }

    create() {
        // Get center of screen
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Game Title
        this.add.text(centerX, centerY - 150, 'TETRIS', {
            fontSize: '72px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Menu Items
        this.menuItems = [
            { text: 'New Game', action: () => this.startNewGame() },
            { text: 'High Scores', action: () => this.showHighScores() }
        ];

        this.selectedIndex = 0;
        this.menuTexts = [];

        // Create menu items
        this.menuItems.forEach((item, index) => {
            const y = centerY + (index * 80);
            const menuText = this.add.text(centerX, y, item.text, {
                fontSize: '36px',
                fontFamily: 'Arial',
                color: index === 0 ? '#ffff00' : '#ffffff'
            }).setOrigin(0.5);

            this.menuTexts.push(menuText);
        });

        // Keyboard Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Prevent default browser behavior
        this.input.keyboard.preventDefault = true;
    }

    update() {
        // Menu Navigation
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
            this.updateMenuHighlight();
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
            this.updateMenuHighlight();
        }

        // Select Menu Item
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || 
            Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.selectMenuItem(this.selectedIndex);
        }
    }

    updateMenuHighlight() {
        this.menuTexts.forEach((text, index) => {
            text.setColor(index === this.selectedIndex ? '#ffff00' : '#ffffff');
        });
    }

    selectMenuItem(index) {
        if (this.menuItems[index]) {
            this.menuItems[index].action();
        }
    }

    startNewGame() {
        this.scene.start(SCENE_KEYS.GAME);
    }

    showHighScores() {
        this.scene.start(SCENE_KEYS.HIGH_SCORES);
    }
}

