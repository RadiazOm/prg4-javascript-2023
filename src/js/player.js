import { Actor, Resource, Vector, clamp } from "excalibur";
import { Resources } from "./resources.js";
import { TreeSpawner } from "./treeSpawner.js";
import { TreeLine } from "./treeLine.js";

export class Player extends Actor {
    direction = new Vector(0, 0)
    engine;
    collectable;
    gamepad;

    turningRadius = 0.5;
    turningSpeed = 0.0015
    strafingSpeed = 400

    constructor(collectable) {
        super({
            width: Resources.Ski.width,
            height: Resources.Ski.height
        })
        this.collectable = collectable;

    }

    onInitialize(engine) {
        this.engine = engine
        this.engine.input.keyboard.on("press", (e) => this.keyPressed(e));
        this.engine.input.keyboard.on("release", (e) => this.keyReleased(e));
        document.addEventListener("joystick0left", () => this.gamepadLeft());
        document.addEventListener("joystick1left", () => this.gamepadLeft());

        document.addEventListener("joystick0right", () => this.gamepadRight());
        document.addEventListener("joystick1right", () => this.gamepadRight());

        document.addEventListener("joystick0neutral", () => this.gamepadNeutral());
        document.addEventListener("joystick1neutral", () => this.gamepadNeutral());



        this.graphics.use(Resources.Ski.toSprite());
        this.pos = new Vector(this.engine.screen.drawWidth / 2, -100);
        this.scale = new Vector(1, 1);
        this.on("collisionstart", (e) => this.OnCollision(e))
    }

    OnCollision(e) {
        if (e.other.tags.includes('collectable')) {
            this.engine.currentScene.score += 100
            this.engine.currentScene.showText(100)
            this.collectable.graphics.visible = false;
            this.collectable.explode();
        }
        if (e.other instanceof TreeLine) {
            this.engine.currentScene.gameOver()
            this.focusPlayer()
        }
    }

    mobileControls(leftSide, rightSide) {

        leftSide.on('pointerdown', () => {
            if (this.engine.currentScene.gameover === false) {
                this.direction.x = 1
            }
        })
        rightSide.on('pointerdown', () => {
            if (this.engine.currentScene.gameover === false) {
                this.direction.x = -1
            }
        })
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }

    focusPlayer() {
        this.engine.currentScene.camera.move(this.pos, 1000)
        this.engine.currentScene.camera.zoomOverTime(3, 1000)
    }


    gamepadLeft(e) {
        this.direction.x = Math.min(this.direction.x + 1, 1)
    }

    gamepadRight(e) {
        this.direction.x = Math.max(this.direction.x - 1, -1);
    }

    gamepadNeutral(e) {
        this.direction.x = 0
    }

    keyPressed(e) {
        if (e.value == "a" || e.value == "ArrowLeft") {
            this.direction.x = Math.min(this.direction.x + 1, 1)
        }
        if (e.value == "d" || e.value == "ArrowRight") {
            this.direction.x = Math.max(this.direction.x - 1, -1);
        }
    }

    keyReleased(e) {
        if (e.value == "a" || e.value == "ArrowLeft") {
            this.direction.x = Math.max(this.direction.x - 1, -1);
        }
        if (e.value == "d" || e.value == "ArrowRight") {
            this.direction.x = Math.min(this.direction.x + 1, 1)
        }
    }


    onPostUpdate() {
        if (this.engine.currentScene.gameover == false) {
            if (this.rotation <= this.turningRadius) {
                this.rotation = Math.min(this.turningRadius, this.rotation + this.direction.x * this.turningSpeed * this.engine.clock.elapsed())
            } else if (this.rotation >= Math.PI * 2 - this.turningRadius) {
                this.rotation = Math.max(Math.PI * 2 - this.turningRadius, this.rotation + this.direction.x * this.turningSpeed * this.engine.clock.elapsed())
            }
            this.vel.x = -(this.rotation - ((this.rotation > this.turningRadius) * Math.PI * 2)) * this.strafingSpeed
            this.pos.x = clamp(this.pos.x, 48, 208)
            this.pos.y = this.lerp(this.pos.y, 100, 0.01)
        }
    }

}
