// Pause Scene
class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.PAUSE });
    }

    create() {
        // Create dimmed overlay
        this.overlay = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.7
        );
        
        // Pause title
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        this.add.text(centerX, centerY - 100, 'PAUSED', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Menu items
        this.menuItems = [
            { text: 'Resume', action: () => this.resumeGame() },
            { text: 'Main Menu', action: () => this.goToMainMenu() }
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
        
        // Keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        // Prevent default browser behavior
        this.input.keyboard.preventDefault = true;
    }

    update() {
        // Menu navigation
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
            this.updateMenuHighlight();
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
            this.updateMenuHighlight();
        }

        // Select menu item
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || 
            Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.selectMenuItem(this.selectedIndex);
        }
        
        // Resume with P or ESC (when Resume is selected)
        if (this.selectedIndex === 0 && 
            (Phaser.Input.Keyboard.JustDown(this.pKey) || 
             Phaser.Input.Keyboard.JustDown(this.escKey))) {
            this.resumeGame();
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

    resumeGame() {
        // Resume the game scene
        const gameScene = this.scene.get(SCENE_KEYS.GAME);
        if (gameScene && gameScene.gameManager) {
            gameScene.gameManager.resume();
        }
        this.scene.stop();
    }

    goToMainMenu() {
        // Stop pause scene and return to main menu
        this.scene.stop();
        this.scene.stop(SCENE_KEYS.GAME);
        this.scene.start(SCENE_KEYS.MAIN_MENU);
    }
}

