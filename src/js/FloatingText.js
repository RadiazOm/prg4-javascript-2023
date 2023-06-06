import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, Timer, vec } from "excalibur";
import { Level } from "./level.js";
import { Resources, ResourceLoader } from "./resources.js";
import { UI } from "./UI.js";

export class FloatingText extends UI {
    
    score;
    timeAlive;
    lifetime;
    engine;
    flashes = 3;
    hidden = false;
    label;

    constructor(score, lifetime, target, ){
        super()
        this.lifetime = lifetime
        this.score = score
        this.target = target
    }
    

    onInitialize(Engine) {
        this.engine = Engine
        this.anchor = new Vector(0.5, 0.5)

        this.label = new Label({
            text: `+${this.score}`,
            anchor: new Vector(0.5, 0.5),
            pos: new Vector(this.target.pos.x - 30, this.target.pos.y - 40),
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

        this.engine.add(this.timeAlive)
        this.timeAlive.start()

        this.addChild(this.label)
    }
}