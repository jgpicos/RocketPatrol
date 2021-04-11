class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        console.log("menu creating!");
        this.add.text(20, 20, "Rocket Patrol");
        this.scene.start("playScene");
    }
}