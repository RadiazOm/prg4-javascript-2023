import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class Tree extends Actor {
    game
    constructor(game) {
        super({
            width: Resources.Tree.width - 10,
            height: Resources.Tree.height
          })
          this.game = game
          this.graphics.use(Resources.Tree.toSprite());
          this.pos = new Vector(
            Math.random() * (this.game.screen.drawWidth - 64) + 32,
            Math.random() * (this.game.screen.drawHeight) + this.game.screen.drawHeight
          );
          this.vel = new Vector(0, -100);
          this.scale = new Vector(1, 1);
          this.addTag('tree')
    }

    update() {
        if (this.pos.y < -20) {
            this.pos = new Vector(
            Math.random() * (this.game.screen.drawWidth - 64) + 32,
            this.game.screen.drawHeight + 20
            );
        }
    }
}