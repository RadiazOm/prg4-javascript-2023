import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";

let tilemap;
let player;
let trees = [];
let gameover = false;

export class Game extends Engine {
  constructor() {
    super({ width: 500,
            height: 500,
            displayMode: DisplayMode.FillScreen
        });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    tilemap = new TileMap({
      rows: 100,
      columns: 120,
      tileWidth: 64,
      tileHeight: 64,
    });

    for (let cell of tilemap.tiles) {
      const sprite = Resources.Snow.toSprite();
      sprite.scale = new Vector(4, 4)
      if (sprite) {
        cell.addGraphic(sprite);
      }
    }
    tilemap.vel = new Vector(0, -100);
    tilemap.on("pointerup", this.clickEvent);
    this.add(tilemap);

    player = new Actor({
        width: Resources.Ski.width,
        height: Resources.Ski.height
    });
    player.graphics.use(Resources.Ski.toSprite());
    player.pos = new Vector(this.canvasWidth / 2, 100);
    player.scale = new Vector(3, 3);
    player.pointer.useGraphicsBounds = true;
    player.on("pointerup", this.clickEvent);
    player.on("collisionstart", this.playerCollision)
    this.add(player);

    for (let i = 0; i < 20; i++) {
      const tree = new Actor({
        width: Resources.Tree.width,
        height: Resources.Tree.height
      });
      tree.graphics.use(Resources.Tree.toSprite());
      tree.pos = new Vector(
        Math.random() * this.canvasWidth,
        Math.random() * (this.canvasHeight - 200) + 401
      );
      tree.vel = new Vector(0, -100);
      tree.scale = new Vector(2, 2);
      tree.tags.push('tree')
      trees.push(tree);
      this.add(tree);
    }
  }

  clickEvent() {
    if (player.vel.x > 0) {
      player.vel = new Vector(-200, 0);
    } else {
      player.vel = new Vector(200, 0);
    }
  }

  playerCollision(e) {
    console.log(e);
    gameover = true
    console.log('collision')
    player.vel.x = 0;
    tilemap.vel.y = 0;
    player.off('pointerup', this.clickEvent)
    for (const tree of trees) {
        tree.vel.y = 0;
    }
    const label = new Label({
        text: 'Game Over',
        pos: new Vector(this.canvasWidth / 2, this.canvasHeight / 2),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px
        })
    });
    this.add(this.label);
}

  onPostDraw() {
    if (gameover == false) {
            if (tilemap.pos.y < -320) {
                tilemap.pos = new Vector(0, 0);
            }
            for (const tree of trees) {
                if (tree.pos.y < -20) {
                    tree.pos = new Vector(
                    Math.random() * this.canvasWidth,
                    this.canvas.height
                    );
                }
            }
            if (player.pos.x < 0) {
                player.vel = new Vector(200, 0);
            } else if (player.pos.x > this.canvasWidth) {
                player.vel = new Vector(-200, 0);
            }
        }
    }
}

new Game();
