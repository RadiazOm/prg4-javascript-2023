import { Vector, Label, Actor } from "excalibur";
import { Resources } from "./resources.js";
import { UI } from "./UI.js";

export class PauseMenu extends UI {

    engine;
    currentSprite;

    constructor(currentSprite) {
        super()
        this.currentSprite = currentSprite
    }

    onInitialize(engine) {
        this.engine = engine;

        const background = new Actor({
            x: 128,
            y: 128,
            width: Resources.Pause.width,
            height: Resources.Pause.height,
        })
        background.graphics.use(Resources.Pause.toSprite())

        const playerSprite = new Actor({
            x: 128,
            y: 128 + 10,
            width: Resources.Penguin.width,
            height: Resources.Penguin.height
        })
        playerSprite.graphics.use(Resources.Penguin.toSprite())

        const leftArrow = new Actor({
            x: 128 - 17,
            y: 128 + 10,
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        leftArrow.graphics.use(Resources.Ski.toSprite())
        leftArrow.on('pointerup', () => {this.changeSprite(-1)})

        const rightArrow = new Actor({
            x: 128 + 17,
            y: 128 + 10,
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        rightArrow.graphics.use(Resources.Ski.toSprite())
        rightArrow.on('pointerup', () => {this.changeSprite(1)})


        const button = new Actor({
            x: 128,
            y: 128 + 50,
            width: Resources.Resume.width,
            height: Resources.Resume.height,
        })
        button.graphics.use(Resources.Resume.toSprite())
        this.engine.input.keyboard.on('press', (e) => {
            if (e.value === ' ' && this.engine.currentScene.paused === true) {
                this.engine.currentScene.pause()
                this.engine.currentScene.paused = false
            }
        })
        button.on('pointerup', () => {
            this.engine.currentScene.pause()
            this.engine.currentScene.paused = false
        })

        this.addChild(background)
        this.addChild(playerSprite)
        this.addChild(leftArrow)
        this.addChild(rightArrow)
        this.addChild(button)
    }

    changeSprite(arrow) {
        console.log(this.currentSprite)

        this.currentSprite += arrow
        if (this.currentSprite < 0) {
            this.currentSprite = this.engine.currentScene.sprites.length - 1
        }
        if (this.currentSprite > this.engine.currentScene.sprites.length - 1) {
            this.currentSprite = 0
        }
        this.engine.currentScene.player.graphics.use(this.engine.currentScene.sprites[this.currentSprite])
        this.engine.currentScene.playerSprite = this.currentSprite
        localStorage.setItem('playerSprite', this.currentSprite.toString())
    }

}