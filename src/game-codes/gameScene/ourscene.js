const Random = Phaser.Math.Between;

export class OurScene extends Phaser.Scene {
  constructor() {
    super({ key: "our-scene" });
  }
  preload() {
    this.load.scenePlugin(
      "rexboardplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js",
      "rexBoard",
      "rexBoard"
    );
  }
  create() {
    var graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });

    var grid = this.rexBoard.add.quadGrid({
      x: 115,
      y: 180,
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

    mainBoard
      .setInteractive()
      .on("tiledown", function (pointer, tileXY) {
        console.log("down " + tileXY.x + "," + tileXY.y);
      })
      .on("gameobjectdown", function (pointer, gameObject) {
        gameObject.setFillStyle(Random(0, 0xffffff), 0.7);
      })
      .on("tile1tap", function (tap, tileXY) {
        console.log("1 tap " + tileXY.x + "," + tileXY.y);
      })
      .on("tile2tap", function (tap, tileXY) {
        console.log("2 tap " + tileXY.x + "," + tileXY.y);
      });
    //------------------------

    var planes = [];
    var map = [" 0 ", "000", " 0 ", "000"],
      line;
    var planeCount;

    var color = ["", 0x2274a5, 0xe7eb90, 0xfadf63];
    var x = 155,
      y = 220;
    for (var n = 0; n < 3; n++) {
      planes[n] = this.rexBoard.add.miniBoard(x, y, {
        grid: grid,
        draggable: true,
      });
      x = x + 120.5;
    }
    planeCount = planes.length;
    planes.forEach((plane) => {
      for (let i = 0, icnt = map.length; i < icnt; i++) {
        line = map[i].split("");
        for (var j = 0, jcnt = line.length; j < jcnt; j++) {
          if (line[j] !== " ") {
            this.rexBoard.add.shape(plane, j - 1, i - 1, 0, color[planeCount]);
          }
        }
      }
      planeCount--;
      plane
        .on(
          "dragstart",
          function (pointer, dragX, dragY) {
            this.pullOutFromMainBoard();
            this.setAlpha(1);
            this.alignToMainBoard(mainBoard);
          },
          plane
        )
        .on(
          "drag",
          function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            if (this.isOverlapping(mainBoard)) {
              this.setAlpha(1);
              this.alignToMainBoard(mainBoard);
            } else {
              this.setAlpha(1);
            }
          },
          plane
        )
        .on(
          "dragend",
          function (pointer, dragX, dragY) {
            if (this.mainBoard) {
              this.setAlpha(1);
            }
          },
          plane
        );
      let lastTime = 0;
      plane.on("pointerdown", () => {
        let clickDelay = this.time.now - lastTime;
        lastTime = this.time.now;
        if (clickDelay < 350) {
          console.log(plane);
          plane.rotate(1);
        }
      });
    });
    // console.log(planes);

    //------------------------
    // var plane1 = this.rexBoard.add.miniBoard(x, y, {
    //   grid: grid,
    //   draggable: true,
    // });

    // for (let i = 0, icnt = map.length; i < icnt; i++) {
    //   line = map[i].split("");
    //   for (let j = 0, jcnt = line.length; j < jcnt; j++) {
    //     if (line[j] !== " ") {
    //       this.rexBoard.add.shape(plane1, j - 1, i - 1, 0, 0x2274a5);
    //     }
    //   }
    // }
    // var plane2 = this.rexBoard.add.miniBoard(275.5, 220, {
    //   grid,
    //   grid,
    //   draggable: true,
    // });
    // for (let i = 0, icnt = map.length; i < icnt; i++) {
    //   line = map[i].split("");
    //   for (var j = 0, jcnt = line.length; j < jcnt; j++) {
    //     if (line[j] !== " ") {
    //       this.rexBoard.add.shape(plane2, j - 1, i - 1, 0, 0xffffff);
    //     }
    //   }
    // }
    // plane1
    //   .on(
    //     "dragstart",
    //     function (pointer, dragX, dragY) {
    //       this.pullOutFromMainBoard();
    //       this.setAlpha(1);
    //       this.alignToMainBoard(mainBoard);
    //     },
    //     plane1
    //   )
    //   .on(
    //     "drag",
    //     function (pointer, dragX, dragY) {
    //       this.setPosition(dragX, dragY);
    //       if (this.isOverlapping(mainBoard)) {
    //         this.setAlpha(1);
    //         this.alignToMainBoard(mainBoard);
    //       } else {
    //         this.setAlpha(1);
    //       }
    //     },
    //     plane1
    //   )
    //   .on(
    //     "dragend",
    //     function (pointer, dragX, dragY) {
    //       if (this.mainBoard) {
    //         this.setAlpha(1);
    //       }
    //     },
    //     plane1
    //   );

    // plane2
    //   .on(
    //     "dragstart",
    //     function (pointer, dragX, dragY) {
    //       this.pullOutFromMainBoard();
    //       this.setAlpha(0.3);
    //     },
    //     plane2
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
    //     plane2
    //   )
    //   .on(
    //     "dragend",
    //     function (pointer, dragX, dragY) {
    //       this.putOnMainBoard(mainBoard);
    //       if (this.mainBoard) {
    //         this.setAlpha(1);
    //       }
    //     },
    //     plane2
    //   );
  }
  update() {}
}
