import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";

export class Player extends Actor {
    direction = new Vector(0, 0)
    game;
    turningRadius = 0.5;
    turningSpeed = 0.01
    strafingSpeed = 500
    constructor(Xpos, game) {
        super({
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        this.game = game
        game.input.keyboard.on("press", (e) =>  this.keyPressed(e));
        game.input.keyboard.on("release", (e) =>  this.keyReleased(e));
        this.graphics.use(Resources.Ski.toSprite());
        this.pos = new Vector(Xpos, 100);
        this.scale = new Vector(3, 3);
        this.on("collisionstart", (e) => this.OnCollision(e))
    }

    OnCollision(e) {
        if (e.target.tags.includes('tree')){
            this.game.gameOver()
        }
    }

    keyPressed(e) {
        console.log(this);
        if (e.value == "a") {
            this.direction.x -= 1
        }
        if (e.value == "d") {
            this.direction.x += 1;
        }
    }

    keyReleased(e) {
        if (e.value == "a") {
            this.direction.x += 1
        }
        if (e.value == "d") {
            this.direction.x -= 1
        }     
    }

    update() {
        if (this.rotation <= this.turningRadius) {
            this.rotation = Math.min(this.turningRadius, this.rotation + this.direction.x * this.turningSpeed)
        } else if (this.rotation >= Math.PI * 2 - this.turningRadius ) {
            this.rotation = Math.max(Math.PI * 2 - this.turningRadius , this.rotation + this.direction.x * this.turningSpeed)
        }
        this.vel.x = (this.rotation - ((this.rotation > this.turningRadius) * Math.PI * 2)) * this.strafingSpeed
        
    }

}
