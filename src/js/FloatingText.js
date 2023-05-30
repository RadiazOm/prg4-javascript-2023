import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, Timer, vec } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";
import { UI } from "./UI.js";

export class FloatingText extends UI {
    
    score;
    timeAlive;
    lifetime;
    game;
    flashes = 3;
    hidden = false;
    label;

    constructor(score, lifetime, target, game){
        super()
        this.lifetime = lifetime
        this.game = game
        this.score = score
        this.anchor = new Vector(0.5, 0.5)
        this.target = target
    }

    onInitialize() {
        this.label = new Label({
            text: `+${this.score}`,
            pos: new Vector(this.target.pos.x, this.target.pos.y - 40),
            vel: new Vector(0, -20),
            font: this.spriteFont
        });

        this.timeAlive = new Timer({
            fcn: () => {
                if (this.flashes < 0) {
                    this.kill()
                } else if (this.hidden === false){
                    this.flashes -= 1
                    this.label.opacity = 0
                    this.hidden = true
                } else {
                    this.label.opacity = 1
                    this.hidden = false;
                }
            },
            repeats: true,
            interval: this.lifetime,
        })

        this.game.add(this.timeAlive)
        this.timeAlive.start()

        this.addChild(this.label)
    }
}