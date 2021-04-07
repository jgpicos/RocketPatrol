class Play extends Phaser.scene {
    constructor() {
        super("playScene");
    }

    create() {
        //green UI background
        this.add.rectangle(
            0, 
            borderUIsize + borderPadding, 
            game.config.width, 
            borderUIsize * 2,
            0x00FF00,
            ).setOrigin(0,0)

        //white borders in slides
    }
}