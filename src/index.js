import Phaser from "phaser";
import { Scene1 } from "./game-codes/scene1";
("./game-codes/scene1");
import { Scene2 } from "./game-codes/scene2";
import FSMPlugin from "../plugins/fsm-plugin";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

import { OurScene } from "./game-codes/gameScene/ourscene";
import { EnemyScene } from "./game-codes/gameScene/enemyscene";

var config = {
  width: 600,
  height: 700,
  scene: [Scene1, Scene2, OurScene, EnemyScene],
  plugins: {
    global: [
      {
        key: "rexFSM",
        plugin: FSMPlugin,
        start: true,
      },
    ],
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 200 },
    },
  },
  pixelArt: true,
};

window.onload = function () {
  var game = new Phaser.Game(config);
};
