import { Vector, Label, Actor } from "excalibur";
import { Resources } from "./resources.js";
import { UI } from "./UI.js";

export class GameOverScreen extends UI {

    score;
    engine;
    self;

    constructor(score) {
        super()
        this.score = score
    }

    onInitialize(engine) {
      this.self = this;
      this.engine = engine
        const label = new Label({
            text: `Game Over. Your score was:
    ${Math.ceil(this.score)}`,
            pos: new Vector(this.engine.currentScene.camera.pos.x - 43, this.engine.currentScene.camera.pos.y - 40),
            font: this.spriteFont
        });
        label.scale = new Vector(0.5, 0.5)
        if (localStorage.getItem('highscore')){
          if (Math.ceil(this.score) > localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', Math.ceil(this.score));
          }
          label.text = `Highscore:
${localStorage.getItem('highscore')}
    
Your score:
${Math.ceil(this.score)}`;
        } else {
          localStorage.setItem('highscore', Math.ceil(this.score));
        }
        
        const button = new Actor({
          x: this.engine.currentScene.camera.pos.x,
          y: this.engine.currentScene.camera.pos.y + 20,
          width: Resources.Retry.width,
          height: Resources.Retry.height,
          scale: new Vector(0.5, 0.5)
        })
        button.graphics.use(Resources.Retry.toSprite())
        this.engine.input.keyboard.on('press', (e) => {
          if (e.value === ' ') {
            this.engine.currentScene.retry()
          }
        })

        document.addEventListener("joystick0button0", this.retryButton);
        document.addEventListener("joystick1button0", this.retryButton);

        button.on('pointerup', () => {this.engine.currentScene.retry()})
        this.addChild(button)
        this.addChild(label);
    }

    retryButton() {
      document.removeEventListener("joystick0button0", self.retryButton)
      document.removeEventListener("joystick1button0", self.retryButton);
      self.engine.currentScene.retry()
    }
}