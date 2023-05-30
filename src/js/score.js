import { Actor, Engine, Vector, Label, Color, Font, FontUnit, TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont, ScreenElement } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { UI } from "./UI.js";

export class Score extends UI {

    score;
    label;

    constructor(score){
        super()
        this.score = score
    }

    onInitialize() {
        this.label = new Label({
            text: `Score: ${Math.ceil(this.score)}`,
            pos: new Vector(5, 5),
            font: this.spriteFont
        });

        this.addChild(this.label)
    }

    updateScore(score) {
        this.score += score
        this.label.text = `Score: ${Math.ceil(this.score)}`
    }
}