import { Vector, Label, Actor } from "excalibur";
import { Resources } from "./resources.js";
import { UI } from "./UI.js";

export class GameOverScreen extends UI {

    score;
    engine;

    constructor(score) {
        super()
        this.score = score
    }

    onInitialize(Engine) {
      this.engine = Engine
        const label = new Label({
            text: `Game Over. Your score was:
    ${Math.ceil(this.score)}`,
            pos: new Vector(50, 64),
            font: this.spriteFont
        });
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
          x: 256 / 2,
          y: 160,
          width: Resources.Retry.width,
          height: Resources.Retry.height
        })
        button.graphics.use(Resources.Retry.toSprite())
        this.engine.input.keyboard.on('press', (e) => {
          if (e.value === ' ') {
            this.engine.retry()
          }
        })
        button.on('pointerup', () => {this.engine.retry()})
        this.addChild(button)
        this.addChild(label);
    }
}