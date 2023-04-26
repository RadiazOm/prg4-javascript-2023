import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";

export class Player extends Actor {
    constructor(Xpos, game) {
        super({
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        game.input.keyboard.on("press", () =>  this.keyPressed);
        game.input.keyboard.on("release", () =>  this.keyReleased);
        this.graphics.use(Resources.Ski.toSprite());
        this.pos = new Vector(Xpos, 100);
        this.scale = new Vector(3, 3);
        this.on("collisionstart", this.playerCollision)
    }

    OnCollision(e) {
        if (e.target.tags.includes('tree')){
            game.gameOver()
        }
    }

    keyPressed(e) {
        console.log(this);
        if (e.value == "a") {
            this.vel.x -= 200;
        }
        if (e.value == "d") {
            this.vel.x += 200;
        }
    }

    keyReleased(e) {
        if (e.value == "a") {
            this.vel.x += 200
        }
        if (e.value == "d") {
            this.vel.x -= 200
        }
          
    }

}
