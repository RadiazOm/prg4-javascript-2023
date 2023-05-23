import { Actor, Resource, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { TreeSpawner } from "./treeSpawner.js";
import { TreeLine } from "./treeLine.js";

export class Player extends Actor {
    direction = new Vector(0, 0)
    game;
    turningRadius = 0.5;
    turningSpeed = 0.015 / 2
    strafingSpeed = 800 / 2

    constructor(Xpos, game) {
        super({
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        game.input.keyboard.on("press", (e) =>  this.keyPressed(e));
        game.input.keyboard.on("release", (e) =>  this.keyReleased(e));
        this.game = game;
        this.graphics.use(Resources.Ski.toSprite());
        this.pos = new Vector(Xpos, 100);
        this.scale = new Vector(1, 1);
        this.on("collisionstart", (e) => this.OnCollision(e))
    }

    OnCollision(e) {
        console.log(e)
        if (e.other.tags.includes('tree')){
            this.game.gameOver()
        } else if(e.other.tags.includes('collectable')){
            this.game.score += 100
            this.game.showText(this.pos, '+100')
            e.other.graphics.visible = false;
            e.other.explode();
        }
        if (e.other instanceof TreeLine) {
            this.game.gameOver()
        }
    }

    keyPressed(e) {
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
        if (this.game.gameover == false) {
            if (this.rotation <= this.turningRadius) {
                this.rotation = Math.min(this.turningRadius, this.rotation + this.direction.x * this.turningSpeed)
            } else if (this.rotation >= Math.PI * 2 - this.turningRadius ) {
                this.rotation = Math.max(Math.PI * 2 - this.turningRadius , this.rotation + this.direction.x * this.turningSpeed)
            }
            this.vel.x = (this.rotation - ((this.rotation > this.turningRadius) * Math.PI * 2)) * this.strafingSpeed
            if (this.pos.x > this.game.screen.drawWidth - 48) {
                
                this.pos.x = this.game.screen.drawWidth - 48
            }
            if (this.pos.x < 48) {
                this.pos.x = 48
            }
        }
    }
}
