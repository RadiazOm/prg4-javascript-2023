import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode } from "excalibur";
import { Game } from "./main.js";
import { Resources, ResourceLoader } from "./resources.js";

export class Tree extends Actor {
    game
    constructor(game) {
        super({
            width: Resources.Tree.width - 5,
            height: Resources.Tree.height
          })
          this.game = game
          this.graphics.use(Resources.Tree.toSprite());
          this.pos = new Vector(
            Math.random() * this.game.screen.drawWidth,
            Math.random() * (this.game.screen.drawHeight - 200) + 401
          );
          this.vel = new Vector(0, -100);
          this.scale = new Vector(2, 2);
          this.addTag('tree')
    }

    update() {
        if (this.pos.y < -20) {
            this.pos = new Vector(
            Math.random() * this.game.screen.drawWidth,
            this.game.screen.drawHeight
            );
        }
    }
}