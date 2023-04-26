import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class Player extends Actor {

    // Global variables
    game;

    constructor(Xpos, game) {
        super({
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        this.game = game
        this.graphics.use(Resources.Ski.toSprite());
        this.pos = new Vector(Xpos, 100);
        this.scale = new Vector(3, 3);
        this.on("collisionstart", (e) => {this.onCollision(e)})
    }

    onCollision(e) {
        if (e.other.tags.includes('tree')){
            this.game.gameOver();
        }
    }

    update() {
        if (this.pos.x < 0) {
            this.pos.x = 0;
        } else if (this.pos.x > this.canvasWidth) {
            this.pos.x = this.canvasWidth;
        }
    }

    keyPressed(e) {
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
