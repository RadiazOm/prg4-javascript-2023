import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, ParticleEmitter, EmitterType, Timer } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class Collectable extends Actor {
    game;
    particles;
    hit = false;
    constructor(game) {
        super({
            width: Resources.Snowman.width,
            height: Resources.Snowman.height
        });
        this.game = game;
        this.graphics.use(Resources.Snowman.toSprite());
        this.pos = new Vector(
            Math.random() * this.game.screen.drawWidth,
            Math.random() * (this.game.screen.drawHeight - 200) + 401
        );
        this.vel = new Vector(0, -100);   
        this.scale = new Vector(2, 2);
        this.addTag('collectable')
        this.particle = new ParticleEmitter({
            emitterType: EmitterType.Circle,
            radius: 5,
            minVel: 100,
            maxVel: 200,
            minAngle: 0,
            maxAngle: Math.PI * 2,
            emitRate: 300,
            opacity: 1,
            fadeFlag: true,
            particleLife: 1000,
            maxSize: 10,
            minSize: 1,
            particleColor: new Color(255, 0, 0),
            isEmitting: true
        })
     }

     update() {
        if (this.pos.y < -20) {
            this.graphics.visible = true
            this.pos = new Vector(
            Math.random() * this.game.screen.drawWidth,
            this.game.screen.drawHeight
            );
        }
        if (this.hit) {
            this.particle.pos = this.pos
        }
    }

    explode() {
        this.timeAlive = new Timer({
            fcn: () => this.hit = false,
            repeats: false,
            interval: 100,
        })
        this.hit = true
        this.game.add(this.particle)
    }
}