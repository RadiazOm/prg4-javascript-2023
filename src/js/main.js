import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont} from "excalibur";
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
  spriteFont;

  constructor() {
    super({ width: 256,
            height: 256,
            maxFps: 144,
            displayMode: DisplayMode.FitScreen
        });
        this.showDebug(true)
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
    const spriteFontSheet = SpriteSheet.fromImageSource({
      image: Resources.Fontmap,
      grid: {
        rows: 4,
        columns: 12,
        spriteWidth: 16,
        spriteHeight: 16,
      },
    })

    this.spriteFont = new SpriteFont({
      alphabet: '0123456789: ABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%+-*/=.',
      caseInsensitive: true,
      spriteSheet: spriteFontSheet,
      spacing: 0,
    })

    this.UIScore = new Label({
      text: `Score:${Math.ceil(this.score)}`,
      pos: new Vector(5, 5),
      font: this.spriteFont
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
        text: `Game Over. Your score was:
${Math.ceil(this.score)}`,
        anchor: new Vector(1, 0.5),
        pos: new Vector(0, this.screen.drawHeight / 2),
        font: this.spriteFont
    });
    if (localStorage.getItem('highscore')){
      if (Math.ceil(this.score) > localStorage.getItem('highscore')) {
        localStorage.setItem('highscore', Math.ceil(this.score));
      }
      label.text = `Highscore:${localStorage.getItem('highscore')}

Your score:${Math.ceil(this.score)}`;
    } else {
      localStorage.setItem('highscore', Math.ceil(this.score));
    }
    this.add(label);
  }

  onPostDraw() {
    if (this.gameover == false) {
        this.score += this.clock.elapsed() / 10
        this.UIScore.text = `Score:${Math.ceil(this.score)}`
    }
  }
}

new Game();
