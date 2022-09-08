export class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootgame");
  }
  preload() {
    this.load.image("background", "../../assets/image/background.png");
    this.load.image("ship", "../../assets/image/plane.png");
    this.load.image("btn1", "../../assets/image/btn1.png");
    var url;
    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdragplugin.min.js";
    this.load.plugin("rexdragplugin", url, true);
  }
  create() {
    this.background = this.add.image(750 / 2.59, 600 / 1.6, "background");
    const startButton = this.add.sprite(300, 500, "btn1", {
      frameWidth: 100,
      frameHeight: 100,
    });
    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.scene.start("playerGame");
    });
    this.btn = this.add.image(100, 100, "ship");
    this.btn.setInteractive();
    this.add.text(20, 20, "Loaded game...");
  }
}
