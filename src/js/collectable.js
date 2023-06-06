import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, ParticleEmitter, EmitterType, Timer } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class Collectable extends Actor {
    
    particles;
    engine;

    constructor() {
        super({
            width: Resources.Snowman.width,
            height: Resources.Snowman.height
        });
     }

     onInitialize(engine) {
        this.engine = engine;
        this.graphics.use(Resources.Snowman.toSprite());
        this.pos = new Vector(
            Math.random() * (this.engine.screen.drawWidth - 64) + 64,
            Math.random() * (this.engine.screen.drawHeight) + this.engine.screen.drawHeight
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
            particleLife: 500,
            maxSize: 10,
            minSize: 1,
            particleColor: new Color(255, 0, 0),
            isEmitting: false
        })
        this.engine.add(this.particle)
     }

    onPreUpdate() {
        if (this.pos.y < -20) {
            this.graphics.visible = true
            this.pos = new Vector(
            Math.random() * (this.engine.screen.drawWidth - 64) + 32,
            this.engine.screen.drawHeight);
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
        this.engine.currentScene.add(this.timeAlive);
        this.timeAlive.start()
    }
}