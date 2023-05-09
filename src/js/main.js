import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";


let tilemap;
let player;
let trees = [];
let gameover = false;
let self;
let frame

export class Game extends Engine {
  constructor() {
    super({ width: 500,
            height: 500,
            displayMode: DisplayMode.FitScreen
        });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    self = this;
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

    player = new Player(200, this);
    this.add(player);

    for (let i = 0; i < 8; i++) {
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

      frame = new FrameStats

    }
  }

  gameOver() {
    gameover = true
    player.vel.x = 0;
    tilemap.vel.y = 0;
    // this.input.keyboard.off("press");
    // this.input.keyboard.off("release");
    for (const tree of trees) {
        tree.vel.y = 0;
    }
    const label = new Label({
        text: 'Game Over',
        pos: new Vector(200, 200),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px
        })
    });
    self.add(label);
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
                player.pos.x = 0;
            } else if (player.pos.x > this.canvasWidth) {
                player.pos.x = this.canvasWidth;
            }
        }
        let frames = new FrameStats
        

    }
}

new Game();
