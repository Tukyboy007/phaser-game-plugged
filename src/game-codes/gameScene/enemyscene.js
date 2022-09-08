export class EnemyScene extends Phaser.Scene {
  constructor() {
    super({ key: "enemy-scene" });
  }
  preload() {}
  create() {
    this.add.text(40, 40, "EnemyScene");
  }
  update() {}
}
