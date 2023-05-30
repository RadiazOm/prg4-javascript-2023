import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, ParticleEmitter, EmitterType, Timer } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class Collectable extends Actor {
    game;
    particles;
    constructor(game) {
        super({
            width: Resources.Snowman.width,
            height: Resources.Snowman.height
        });
        this.game = game;
        this.graphics.use(Resources.Snowman.toSprite());
        this.pos = new Vector(
            Math.random() * (this.game.screen.drawWidth - 64) + 64,
            Math.random() * (this.game.screen.drawHeight) + this.game.screen.drawHeight
          );
        this.vel = new Vector(0, -100);   
        this.scale = new Vector(1, 1);
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
            isEmitting: false
        })
        this.game.add(this.particle)
     }

     update() {
        if (this.pos.y < -20) {
            this.graphics.visible = true
            this.pos = new Vector(
            Math.random() * (this.game.screen.drawWidth - 64) + 32,
            this.game.screen.drawHeight
            );
        }
        this.particle.pos = this.pos
    }

    explode() {
        this.particle.isEmitting = true
        this.timeAlive = new Timer({
            fcn: () => this.particle.isEmitting = false,
            repeats: false,
            interval: 200,
        })
        this.game.add(this.timeAlive);
        this.timeAlive.start()
    }
}