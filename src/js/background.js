import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, GraphicsGroup} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";

export class Background extends Actor{
    straightImage;

    constructor() {
        super()
        this.z = -2
    }

    onInitialize() {
        this.straightImage = Resources.Straight.toSprite()
        this.anchor = new Vector(0, 0)

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: this.straightImage,
                    pos: new Vector(0, 0)
                },
                {
                    graphic: this.straightImage,
                    pos: new Vector(0, this.straightImage.height)
                }
            ]
        })

        this.graphics.add(group)
        this.pos = new Vector(0, 0)
        this.vel = new Vector(0, -100)
    }

    onPostUpdate() {
        if (this.pos.y < -this.straightImage.height) {
            this.pos = new Vector(0, 0);
        }

        // let highestYvalue = -Infinity;
        // let changedMap;
        // for (const map of this.maps){
        //     if (map.pos.y <= 0) {
        //         changedMap = map;
        //     }
        //     if (highestYvalue < map.pos.y) {
        //         highestYvalue = map.pos.y;
        //     }   
        // }
        // console.log(changedMap)
        // if (changedMap !== undefined) {
        //     console.log(highestYvalue)
        //     changedMap.pos.y = highestYvalue + this.maps[0].height;
        // }
    }

}