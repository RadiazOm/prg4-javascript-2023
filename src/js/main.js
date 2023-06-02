import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { Collectable } from "./collectable.js";
import { FloatingText } from "./FloatingText.js";
import { TreeSpawner } from "./treeSpawner.js";
import { Score } from "./score.js";
import { GameOverScreen } from "./gameOverUI.js";




export class Game extends Engine {
  // Global variables
  tilemap;
  player;
  score = 0;
  trees = [];
  gameover = false;
  gameOverScreen;
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
        this.setAntialiasing(false)
        this.showDebug(false)
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    // Score initialization  
    this.UIScore = new Score(this.score)
    this.add(this.UIScore)
        
    // Background initialization
    this.background = new Background(this.treeSpawner);
    this.add(this.background);


    // Player initialization
    this.player = new Player(this);
    this.add(this.player);

    // // Collectable initialization
    this.collectable = new Collectable(this);
    this.add(this.collectable);

    // Tree spawner
    this.treeSpawner = new TreeSpawner(this);
    this.add(this.treeSpawner);

  }

  showText(score){
    this.UIScore.updateScore(score)
    const label = new FloatingText(score, 100, this.player, this);
    this.add(label);
  }

  gameOver() {
    this.gameover = true
    this.player.vel.x = 0;
    this.background.vel.y = 0;
    this.collectable.vel.y = 0
    this.input.keyboard.off("press");
    this.input.keyboard.off("release");
    this.player.direction.x = 0
    for (const tree of this.treeSpawner.treeLines) {
        tree.vel.y = 0;
    }
    this.gameOverScreen = new GameOverScreen(this.UIScore.score, this)
    this.add(this.gameOverScreen)
  }

  retry() {
    // Config reset
    this.gameover = false
    this.UIScore.score = 0
    // Player reset
    this.player.pos.x = this.screen.drawWidth / 2
    this.player.rotation = 0
    // Background reset
    this.background.vel.y = -100
    this.background.pos = new Vector(0, 0)
    // Collectable reset
    this.collectable.vel.y = -100
    this.collectable.pos = new Vector(
      Math.random() * (this.screen.drawWidth - 64) + 64,
      Math.random() * (this.screen.drawHeight) + this.screen.drawHeight
    );
    this.collectable.graphics.visible = true
    // Input reset
    this.input.keyboard.off("press")
    this.input.keyboard.on("press", (e) => this.player.keyPressed(e));
    this.input.keyboard.on("release", (e) => this.player.keyReleased(e));
    if (this.input.keyboard.isHeld('KeyA') || this.input.keyboard.isHeld('ArrowLeft')) {
      this.player.direction.x = 1
    } else if (this.input.keyboard.isHeld('KeyD') || this.input.keyboard.isHeld('ArrowRight')) {
      this.player.direction.x = -1
    }
    // Trees reset
    for (let i = 0; i < this.treeSpawner.treeLines.length; i++) {
      this.treeSpawner.treeLines[i].vel.y = -100;
      this.treeSpawner.treeLines[i].pos = new Vector(this.screen.drawWidth / 2, this.screen.drawHeight * (i + 1))
    }
    // Screen reset
    this.gameOverScreen.kill()

  }

  onPostUpdate() {
    this.treeSpawner.update()
  }

  onPostDraw() {
    if (this.gameover == false) {
        this.UIScore.updateScore(this.clock.elapsed() / 100)
    }
  }
}

new Game();
