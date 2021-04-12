class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );

        this.ship1 = new Ship(
            this,
            100,
            200,
            'spaceship'
        );

        this.ship2 = new Ship(
            this,
            300,
            240,
            'spaceship'
        );

        this.ship3 = new Ship(
            this,
            380,
            300,
            'spaceship'
        );

        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

            // white borders
            this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
            this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
            this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
            this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);   
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
    }

    update() {
        this.starfield.tilePositionX -= 4;

        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        if(this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.alpha = 0
            this.p1Rocket.reset();
            this.shipExplode(this.ship1)
        };
        if(this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.alpha = 0
            this.p1Rocket.reset();
            this.shipExplode(this.ship2)
        };        
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.alpha = 0
            this.p1Rocket.reset();
            this.shipExplode(this.ship3)
        };
    }

    checkCollision(rocket, Ship) {
        if( rocket.x + rocket.width > Ship.x &&
            rocket.x < Ship.x + Ship.width &&
            rocket.y + rocket.height > Ship.y &&
            rocket.y < Ship.y + Ship.height) {
                return true;
        } 
        else {
                return false;
            }

    }

    shipExplode(Ship) {
        // temporarily hide ship
        Ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(Ship.x, Ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          Ship.reset();                         // reset ship position
          Ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
      }
}