import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";

<<<<<<< HEAD

let tilemap;
let player;
let trees = [];
let gameover = false;
let self;
let frame

=======
>>>>>>> da7df8ad74a91594aaf3f97fd048a35fb9e8e448
export class Game extends Engine {
  tilemap;
  player;
  trees = [];
  gameover = false;
  constructor() {
    super({ width: 500,
            height: 500,
            displayMode: DisplayMode.FitScreen
        });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
<<<<<<< HEAD
    self = this;
    tilemap = new TileMap({
=======
    this.tilemap = new TileMap({
>>>>>>> da7df8ad74a91594aaf3f97fd048a35fb9e8e448
      rows: 100,
      columns: 120,
      tileWidth: 64,
      tileHeight: 64,
    });

    for (let cell of this.tilemap.tiles) {
      const sprite = Resources.Snow.toSprite();
      sprite.scale = new Vector(4, 4)
      if (sprite) {
        cell.addGraphic(sprite);
      }
    }
    this.tilemap.vel = new Vector(0, -100);
    this.add(this.tilemap);

    this.player = new Player(200, this);
    this.add(this.player);

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
      tree.addTag('tree')
      this.trees.push(tree);
      this.add(tree);

      frame = new FrameStats

    }

    this.input.keyboard.on("press", (e) => {this.player.keyPressed(e)});


    this.input.keyboard.on("release", (e) => {this.player.keyReleased(e)});
  }

  gameOver() {
<<<<<<< HEAD
    gameover = true
    player.vel.x = 0;
    tilemap.vel.y = 0;
    // this.input.keyboard.off("press");
    // this.input.keyboard.off("release");
    for (const tree of trees) {
=======
    console.log('press');
    this.gameover = true
    console.log('collision')
    this.player.vel.x = 0;
    this.tilemap.vel.y = 0;
    this.input.keyboard.off("press", this.keyPressed);
    this.input.keyboard.off("release", this.keyReleased);
    for (const tree of this.trees) {
>>>>>>> da7df8ad74a91594aaf3f97fd048a35fb9e8e448
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
<<<<<<< HEAD
    self.add(label);
=======
    this.add(label);
>>>>>>> da7df8ad74a91594aaf3f97fd048a35fb9e8e448
  }

  onPostDraw() {
    if (this.gameover == false) {
            if (this.tilemap.pos.y < -320) {
                this.tilemap.pos = new Vector(0, 0);
            }
            for (const tree of this.trees) {
                if (tree.pos.y < -20) {
                    tree.pos = new Vector(
                    Math.random() * this.canvasWidth,
                    this.canvas.height
                    );
                }
            }
            this.player.update()
        }
        let frames = new FrameStats
        

    }
}

new Game();
