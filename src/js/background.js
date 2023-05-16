import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";


export class Background extends Actor {
    constructor() {
        super({
            width: Resources.Straight.width,
            height: Resources.Straight.height
        })
        this.graphics.use(Resources.Straight.toSprite())
        this.anchor = new Vector(0, 0)

    }

}