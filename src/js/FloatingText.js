import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, Timer, vec } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class FloatingText extends Label {
    target;
    timeAlive;
    game;
    constructor(pos, text, lifetime, target, game){
        super({
            text: text,
            pos: pos,
            font: game.spriteFont
        })
        this.timeAlive = new Timer({
            fcn: () => this.kill(),
            repeats: true,
            interval: lifetime,
        })
        this.anchor = new Vector(0.5, 0.5)
        this.game = game
        this.target = target
        this.game.add(this.timeAlive)
        this.timeAlive.start()
    }

    update() {
        this.pos = new Vector(this.target.pos.x, this.target.pos.y - 40)
    }
}