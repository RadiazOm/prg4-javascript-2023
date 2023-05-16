import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Background } from "./background.js";

export class BackgroundSpawner extends Actor{

    game;
    constructor(game) {
        super()
        this.game = game
        this.anchor = new Vector(0, 0)
        for (let i = 0; i < 3; i++) {
            const map = new Background()
            map.pos = new Vector(i * 20,i * 256)
  
            this.addChild(map)
        }

        this.vel = new Vector(0,-100)
    }

    onPostUpdate(){
        console.log(this.children.length)
    }

    // onPostUpdate() {
    //     let highestYvalue = -Infinity;
    //     let changedMap;
    //     for (const map of this.maps){
    //         if (map.pos.y <= 0) {
    //             changedMap = map;
    //         }
    //         if (highestYvalue < map.pos.y) {
    //             highestYvalue = map.pos.y;
    //         }   
    //     }
    //     console.log(changedMap)
    //     if (changedMap !== undefined) {
    //         console.log(highestYvalue)
    //         changedMap.pos.y = highestYvalue + this.maps[0].height;
    //     }
    // }

}