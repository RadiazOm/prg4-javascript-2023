import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, SpriteSheet, SpriteFont, Scene} from "excalibur";
import { Arcade } from "arcade-game"
import { Resources, ResourceLoader } from "./resources.js";
import { Game } from "./main";
import { StartScreen } from "./startscreen.js";

export class Scenes extends Engine {

    arcade;
    joystickListener;

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
        this.arcade = new Arcade(this, false, true)
        this.joystickListener = (e) => this.joyStickFound(e)
        document.addEventListener("joystickcreated",  this.joystickListener)

        this.addScene('startScreen', new StartScreen())
        this.addScene('game', new Game())

        this.goToScene('startScreen')
    }

    joyStickFound(e) {
        console.log('yahoo')

        let joystick = this.arcade.Joysticks[e.detail]
        
        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }
 
    }

    onPreUpdate() {
        console.log('update')
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
     }

    disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener)
    }

}

new Scenes()