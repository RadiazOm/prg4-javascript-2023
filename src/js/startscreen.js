import { Actor, Engine, Vector, Scene, GraphicsGroup } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Game } from "./main";

export class StartScreen extends Scene {

    bg;

    constructor() {
        super()
    }

    onInitialize(engine) {
        this.bg = new Actor({
            x: 256 / 2,
            y: 256 / 2
        })
        const straightImage = Resources.Straight.toSprite()
        const group = new GraphicsGroup({
            members: [
                {
                    graphic: straightImage,
                    pos: new Vector(0, 0)
                },
                {
                    graphic: straightImage,
                    pos: new Vector(0, straightImage.height)
                }
            ]
        })
        this.bg.graphics.add(group)
        this.bg.vel.y = -20;
        const title = new Actor({
            x: 256 / 2 - 3,
            y: 256 / 4 + 20
        })
        title.graphics.use(Resources.Title.toSprite())
        const button = new Actor({
            x: 256 / 2,
            y: 256 / 2,
            width: Resources.Start.width,
            height: Resources.Start.height
        })
        button.graphics.use(Resources.Start.toSprite())
        engine.input.keyboard.on('press', (e) => {
            if (e.value === ' ') {
                engine.input.keyboard.off('press')
                engine.goToScene('game', this.bg.pos.y)
            }
        })
        button.on('pointerup', () => { 
            engine.input.keyboard.off('press')
            engine.goToScene('game', this.bg.pos.y)
     })
     
        this.add(this.bg)
        this.add(button)
        this.add(title)
    }

    onPreUpdate() {
        if (this.bg.pos.y < 0) {
            this.bg.pos = new Vector(128, 256);
        }
    }
}