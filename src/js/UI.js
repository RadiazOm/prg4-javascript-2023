import { Actor, Engine, Vector, Label, Color, Font, FontUnit, TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont, ScreenElement } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";


export class UI extends ScreenElement { 

    UIScore;
    spriteFont;

    constructor() {
        super({
            x: 10,
            y: 10,
            z: 0
        })
        this.z =  0
    }

    onInitialize(engine) {
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

        this.addChild(this.UIScore)
    }
}