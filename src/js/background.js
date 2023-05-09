import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";


export class Background extends TileMap {
    constructor() {
        super({
            rows: 100,
            columns: 120,
            tileWidth: 64,
            tileHeight: 64,
        })

        for (let cell of this.tiles) {
        const sprite = Resources.Snow.toSprite();
        sprite.scale = new Vector(4, 4)
        if (sprite) {
            cell.addGraphic(sprite);
        }
        }
        this.vel = new Vector(0, -100);
    }

    update() {
        if (this.pos.y < -320) {
            this.pos = new Vector(0, 0);
        }
    }

}