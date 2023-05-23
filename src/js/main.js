import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { Tree } from "./tree.js";
import { Collectable } from "./collectable.js";
import { FloatingText } from "./FloatingText.js";
import { TreeSpawner } from "./treeSpawner.js";




export class Game extends Engine {
  // Global variables
  tilemap;
  player;
  score = 0;
  trees = [];
  gameover = false;
  background;
  treeSpawner;
  collectable;
  UIScore;

  constructor() {
    super({ width: 256,
            height: 256,
            displayMode: DisplayMode.FitScreen
        });
        this.showDebug(false)
        this.maxFps = 60;
    this.start(ResourceLoader).then(() => this.startGame());

  }

  startGame() {

        
    // Background initialization
    this.background = new Background(this.treeSpawner);
    this.add(this.background);


    // Player initialization
    this.player = new Player(200, this);
    this.add(this.player);

    // // Collectable initialization
    this.collectable = new Collectable(this);
    this.add(this.collectable);

    // Tree spawner
    this.treeSpawner = new TreeSpawner(this);
    this.add(this.treeSpawner);

    // Score initialization
    this.UIScore = new Label({
      text: `Score: ${this.score}`,
      pos: new Vector(10, 20),
      font: new Font({
          family: 'impact',
          size: 12,
          unit: FontUnit.Px
      })
    });
    this.add(this.UIScore);

  }

  showText(pos, text){
    const label = new FloatingText(pos, text, 2000, this.player, this);
    this.add(label);
  }

  gameOver() {
    this.gameover = true
    this.player.vel.x = 0;
    this.background.vel.y = 0;
    this.collectable.vel.y = 0
    this.input.keyboard.off("press");
    this.input.keyboard.off("release");
    for (const tree of this.treeSpawner.treeLines) {
        tree.vel.y = 0;
    }
    const label = new Label({
        text: `Game Over. Your score was ${this.score}`,
        pos: new Vector(20, this.screen.drawHeight / 2),
        font: new Font({
            family: 'impact',
            size: 12,
            unit: FontUnit.Px
        })
    });
    if (localStorage.getItem('highscore')){
      if (this.score > localStorage.getItem('highscore')) {
        localStorage.setItem('highscore', this.score);
      }
      label.text = `Highscore: ${localStorage.getItem('highscore')}. Your score: ${this.score}`;
    } else {
      localStorage.setItem('highscore', this.score);
    }
    this.add(label);
  }

  onPostDraw() {
    if (this.gameover == false) {
        this.score++
        this.UIScore.text = `Score: ${this.score}`
    }
  }
}

new Game();
