import Phaser from "phaser";
// import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin.js";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin.js";
import {
  Board,
  HexagonGrid,
  QuadGrid,
  TouchEvent,
} from "phaser3-rex-plugins/plugins/board-components.js";

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "examples",
    });
  }

  preload() {}

  create() {
    var graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });

    var grid = this.rexBoard.add.quadGrid({
      x: 50,
      y: 80,
      cellWidth: 40,
      cellHeight: 40,
      type: 0,
    });
    var mainBoard = this.rexBoard.add
      .board({
        grid: grid,
        width: 10,
        height: 10,
      })
      .forEachTileXY(function (tileXY, board) {
        var points = board.getGridPoints(tileXY.x, tileXY.y, true);
        graphics.strokePoints(points, true);
      }, this);

    var plane = [];
    for (let i = 0; i < 3; i++) {
      plane[i] = this.rexBoard.add.miniBoard(500, 150, {
        grid: grid,
        draggable: true,
      });
      // console.log(plane[i]);
      var map = [" 0 ", "000", " 0 ", "000"],
        line;
    }
    for (let i = 0; i < plane.length; i++) {
      for (var n = 0, ncnt = map.length; n < ncnt; n++) {
        line = map[n].split("");
        for (var y = 0, ycnt = line.length; y < ycnt; y++) {
          if (line[y] !== " ") {
            this.rexBoard.add.shape(
              plane[0],
              y - 1,
              n - 1,
              0,
              Random(0, 0xffffff)
            );
          }
        }
      }
      console.log(plane[i]);
      plane[i]
        .on(
          "dragstart",
          function (pointer, dragX, dragY) {
            this.pullOutFromMainBoard();
            this.setAlpha(0.3);
          },
          plane[i]
        )
        .on(
          "drag",
          function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            if (this.isOverlapping(mainBoard)) {
              this.setAlpha(0.7);
              this.alignToMainBoard(mainBoard);
            } else {
              this.setAlpha(0.3);
            }
          },
          plane[i]
        )
        .on(
          "dragend",
          function (pointer, dragX, dragY) {
            this.putOnMainBoard(mainBoard);
            if (this.mainBoard) {
              this.setAlpha(1);
            }
          },
          plane[i]
        );
    }

    //////////
    // var plane1 = this.rexBoard.add.miniBoard(500, 150, {
    //   grid: grid,
    //   draggable: true,
    // });

    // var map = [" 0 ", "000", " 0 ", "000"],
    //   line;
    // for (var i = 0, icnt = map.length; i < icnt; i++) {
    //   line = map[i].split("");
    //   for (var j = 0, jcnt = line.length; j < jcnt; j++) {
    //     if (line[j] !== " ") {
    //       this.rexBoard.add.shape(plane1, j - 1, i - 1, 0, Random(0, 0xffffff));
    //     }
    //   }
    // }
    /////////
    // plane1
    //   .on(
    //     "dragstart",
    //     function (pointer, dragX, dragY) {
    //       this.pullOutFromMainBoard();
    //       this.setAlpha(0.3);
    //     },
    //     plane1
    //   )
    //   .on(
    //     "drag",
    //     function (pointer, dragX, dragY) {
    //       this.setPosition(dragX, dragY);
    //       if (this.isOverlapping(mainBoard)) {
    //         this.setAlpha(0.7);
    //         this.alignToMainBoard(mainBoard);
    //       } else {
    //         this.setAlpha(0.3);
    //       }
    //     },
    //     plane1
    //   )
    //   .on(
    //     "dragend",
    //     function (pointer, dragX, dragY) {
    //       this.putOnMainBoard(mainBoard);
    //       if (this.mainBoard) {
    //         this.setAlpha(1);
    //       }
    //     },
    //     plane1
    //   );

    // this.miniBoard = miniBoard;
    // this.miniBoardState = this.add.text(20, 20, "");
  }

  update() {
    //   var s;
    //   if (this.miniBoard.mainBoard) {
    //     s = "(" + this.miniBoard.tileX + "," + this.miniBoard.tileY + ")";
    //   } else {
    //     s = "--";
    //   }
    //   this.miniBoardState.setText(s);
  }
}

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Demo,
  plugins: {
    scene: [
      {
        key: "rexBoard",
        plugin: BoardPlugin,
        mapping: "rexBoard",
      },
    ],
  },
};

var game = new Phaser.Game(config);
