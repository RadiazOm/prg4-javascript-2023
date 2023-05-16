import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { Tree } from "./tree.js";
import { Collectable } from "./collectable.js";
import { FloatingText } from "./FloatingText.js";
import { BackgroundSpawner } from "./backgroundSpawner.js";




export class Game extends Engine {
  // Global variables
  tilemap;
  player;
  score = 0;
  trees = [];
  gameover = false;
  collectable;
  UIScore;

  constructor() {
    super({ width: 250,
            height: 750,
            //displayMode: DisplayMode.FitScreen
        });
        this.showDebug(false)
        this.maxFps = 60;
    this.start(ResourceLoader).then(() => this.startGame());

  }

  startGame() {
    // Background initialization
    this.backgroundSpawner = new BackgroundSpawner(this)
    this.add(this.backgroundSpawner)

    // Player initialization
    this.player = new Player(200, this);
    this.add(this.player);

    // Trees initialization
    // for (let i = 0; i < 8; i++) {
    //   const tree = new Tree(this)
    //   this.trees.push(tree);
    //   this.add(tree);
    // }

    // // Collectable initialization
    // this.collectable = new Collectable(this)
    // this.add(this.collectable)

    // Score initialization
    // this.UIScore = new Label({
    //   text: `Score: ${this.score}`,
    //   pos: new Vector(10, 20),
    //   font: new Font({
    //       family: 'impact',
    //       size: 12,
    //       unit: FontUnit.Px
    //   })
    // });
    // this.add(this.UIScore)

  }

  // showText(pos, text){
  //   const label = new FloatingText(pos, text, 2000, this.player, this)
  //   this.add(label)
  // }

  // gameOver() {
  //   this.gameover = true
  //   this.player.vel.x = 0;
  //   this.tilemap.vel.y = 0;
  //   this.collectable.vel.y = 0
  //   this.input.keyboard.off("press");
  //   this.input.keyboard.off("release");
  //   for (const tree of this.trees) {
  //       tree.vel.y = 0;
  //   }
  //   const label = new Label({
  //       text: `Game Over. Your score was ${this.score}`,
  //       pos: new Vector(100, 200),
  //       font: new Font({
  //           family: 'impact',
  //           size: 24,
  //           unit: FontUnit.Px
  //       })
  //   });
  //   if (localStorage.getItem('highscore')){
  //     if (this.score > localStorage.getItem('highscore')) {
  //       localStorage.setItem('highscore', this.score);
  //     }
  //     label.text = `Highscore: ${localStorage.getItem('highscore')}. Your score: ${this.score}`;
  //   } else {
  //     localStorage.setItem('highscore', this.score);
  //   }
  //   this.add(label);
  // }

  // onPostDraw() {
  //   if (this.gameover == false) {
  //       this.score++
  //       this.UIScore.text = `Score: ${this.score}`
  //   }
  // }
}

new Game();
