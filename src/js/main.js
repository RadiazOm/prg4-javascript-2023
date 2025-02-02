import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont, Scene} from "excalibur";
import { Arcade } from "arcade-game"
import { Resources, ResourceLoader } from "./resources.js";
import { Level } from "./level.js";
import { StartScreen } from "./startscreen.js";

export class Game extends Engine {

    arcade;
    joystickListener;
    button;

    constructor() {
        super({
            width: 256,
            height: 256,
            maxFps: 144,
            displayMode: DisplayMode.FitScreen
        });
        this.setAntialiasing(false)
        this.showDebug(false)
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.arcade = new Arcade(this, true, false)

        document.addEventListener("joystick0button0",() => {this.buttonHandler()});
        document.addEventListener("joystick1button0",() => {this.buttonHandler()});


        this.addScene('startScreen', new StartScreen())
        this.addScene('game', new Level())

        this.goToScene('startScreen')
    }

    onPreUpdate() {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
     }

    buttonHandler(e) {
        console.log('button')

        if (this.currentScene instanceof StartScreen) {
            this.currentScene.startButton()
        }
        if (this.currentScene instanceof Level) {
            this.currentScene.retry()
            console.log('retry')
        }
    }

    disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener)
    }

}

new Game()