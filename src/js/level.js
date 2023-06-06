import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont, Scene, Timer, Repeat} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { Collectable } from "./collectable.js";
import { FloatingText } from "./FloatingText.js";
import { TreeSpawner } from "./treeSpawner.js";
import { Score } from "./score.js";
import { GameOverScreen } from "./gameOverUI.js";
import { PauseMenu } from "./pauseMenu.js";




export class Level extends Scene {
  // Global variables
  engine;
  tilemap;
  player;
  playerSprite = 0
  sprites = [Resources.Ski.toSprite(), Resources.Penguin.toSprite()]
  score = 0;
  trees = [];
  paused = false
  pauseMenu;
  gameover = false;
  gameOverScreen;
  gamepad;
  background;
  treeSpawner;
  collectable;
  UIScore;
  spriteFont;

  constructor() {
    super();
  }

  onInitialize(engine) {
    this.engine = engine;
    // Score initialization  
    this.UIScore = new Score(this.score)
    this.add(this.UIScore)
        
    // Background initialization
    this.background = new Background(this.treeSpawner);
    this.add(this.background);

    // // Collectable initialization
    this.collectable = new Collectable(this);
    this.add(this.collectable);

    // Player initialization
    this.player = new Player(this.collectable);
    this.add(this.player);

    // Tree spawner
    this.treeSpawner = new TreeSpawner(this.engine);
    this.add(this.treeSpawner);

    if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
      let left = new Actor({
        anchor: new Vector(0, 0),
        x: 0,
        y: 0,
        width: 128,
        height: 256
      })
      let right = new Actor({
        anchor: new Vector(0, 0),
        x: 128,
        y: 0,
        width: 128,
        height: 256
      })
      this.add(left)
      this.add(right)
      this.player.mobileControls(left, right)
    }


  }

  onActivate(bg) {
    this.background.pos.y = bg.data - 256
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
    this.engine.input.keyboard.off("press");
    this.engine.input.keyboard.off("release");
    this.player.direction.x = 0
    for (const tree of this.treeSpawner.treeLines) {
        tree.vel.y = 0;
    }
    const wait = new Timer({
      fcn: () => {
        this.gameOverScreen = new GameOverScreen(this.UIScore.score, this)
        this.add(this.gameOverScreen)
      },
      repeats: false,
      interval: 1000
    })
    wait.start()
    this.add(wait)
  }

  retry() {
    if (this.gameOverScreen === undefined) {
      return;
    }
    // Config reset
    this.gameover = false
    this.UIScore.score = 0
    // Player reset
    this.player.pos.x = 128
    this.player.rotation = 0
    // Background reset
    this.background.vel.y = -100
    this.background.pos = new Vector(0, 0)
    // Collectable reset
    this.collectable.vel.y = -100
    this.collectable.pos = new Vector(
      Math.random() * (256 - 64) + 64,
      Math.random() * (256) + 256
    );
    this.collectable.graphics.visible = true
    // Input reset
    this.engine.input.keyboard.off("press")
    this.engine.input.keyboard.on("press", (e) => this.player.keyPressed(e));
    this.engine.input.keyboard.on("release", (e) => this.player.keyReleased(e));
    this.player.direction.x = 0
    if (this.engine.input.keyboard.isHeld('KeyA') || this.engine.input.keyboard.isHeld('ArrowLeft')) {
      this.player.direction.x = 1
    } else if (this.engine.input.keyboard.isHeld('KeyD') || this.engine.input.keyboard.isHeld('ArrowRight')) {
      this.player.direction.x = -1
    }
    // Trees reset
    for (let i = 0; i < this.treeSpawner.treeLines.length; i++) {
      this.treeSpawner.treeLines[i].vel.y = -100;
      this.treeSpawner.treeLines[i].pos = new Vector(128, 256 * (i + 1) + 256)
    }
    // Screen reset
    this.gameOverScreen.kill()
    this.gameOverScreen = undefined
    // Camera reset
    this.engine.currentScene.camera.move(new Vector(128, 128), 1000)
    this.engine.currentScene.camera.zoomOverTime(1, 1000)
  }

  pause() {
    if (this.paused === false) {
      this.gameover = true
      this.player.vel.x = 0;
      this.background.vel.y = 0;
      this.collectable.vel.y = 0
      this.player.direction.x = 0
      for (const tree of this.treeSpawner.treeLines) {
          tree.vel.y = 0;
      }
      this.pauseMenu = new PauseMenu(this.playerSprite)
      this.add(this.pauseMenu)
    } else {
      this.gameover = false
      this.background.vel.y = -100
      this.collectable.vel.y = -100
      this.player.direction.x = 0
      if (this.engine.input.keyboard.isHeld('KeyA') || this.engine.input.keyboard.isHeld('ArrowLeft')) {
        this.player.direction.x = 1
      } else if (this.engine.input.keyboard.isHeld('KeyD') || this.engine.input.keyboard.isHeld('ArrowRight')) {
        this.player.direction.x = -1
      }
      for (const tree of this.treeSpawner.treeLines) {
        tree.vel.y = -100;
      }
      this.pauseMenu.kill()
    }
  }

  onPostUpdate() {
    this.treeSpawner.update()
  }

  onPostDraw() {
    if (this.gameover == false) {
        this.UIScore.updateScore(this.engine.clock.elapsed() / 100)
        this.background.vel.y -= this.engine.clock.elapsed() / 1000
        this.collectable.vel.y = this.background.vel.y
        for (const tree of this.treeSpawner.treeLines) {
          tree.vel.y = this.background.vel.y;
        }

    }
  }
}

new Level();
