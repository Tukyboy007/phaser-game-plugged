import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin.js";

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("playerGame");
    this.planeCount = 0; // useless variable
  }
  preload() {
    this.scene.launch("our-scene");
  }
  create() {
    this.background = this.add.image(750 / 2.59, 600 / 1.6, "background");
    this.background.alpha = 0.4;
    var scene = this,
      btn0,
      btn1;
    var stateConfig = {
      states: {
        0: {
          enter: function () {
            scene.scene.launch("enemy-scene");
            scene.scene.stop("our-scene");
            btn0.setBackgroundColor("#6d4c41");
          },

          exit: function () {
            scene.scene.stop("enemy-scene");
            btn0.setBackgroundColor("#40241a");
          },
        },
        1: {
          enter: function () {
            scene.scene.launch("our-scene");
            btn1.setBackgroundColor("#6d4c41");
          },

          exit: function () {
            scene.scene.stop("our-scene");
            btn1.setBackgroundColor("#40241a");
          },
        },
      },
    };
    var state = this.plugins.get("rexFSM").add(stateConfig);
    var textConfig = {
      backgroundColor: "#40241a",
    };

    btn0 = this.add
      .text(100, 100, "Scene-0", textConfig)
      .setInteractive()
      .on("pointerdown", function () {
        state.goto("0");
      });
    btn1 = this.add
      .text(450, 100, "Scene-1", textConfig)
      .setInteractive()
      .on("pointerdown", function () {
        state.goto("1");
      });
  }
}
