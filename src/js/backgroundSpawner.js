import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Background } from "./background.js";

export class BackgroundSpawner extends Actor{
    maps = [];
    game;
    constructor(game) {
        super()
        this.game = game
        for (let i = 0; i < 3; i++) {
            const map = new Background()
            map.pos = new Vector(0,0)
            if (this.maps.length > 0) {
                map.pos.x = 0
                map.pos.y = this.maps[i - 1].height + this.maps[i - 1].pos.y
            }
            this.maps.push(map)
            this.game.add(map)
        }
    }

    onPostUpdate() {
        let highestYvalue = -Infinity;
        let changedMap;
        for (const map of this.maps){
            if (map.pos.y <= 0) {
                changedMap = map;
            }
            if (highestYvalue < map.pos.y) {
                highestYvalue = map.pos.y;
            }   
        }
        console.log(changedMap)
        if (changedMap !== undefined) {
            console.log(highestYvalue)
            changedMap.pos.y = highestYvalue + this.maps[0].height;
        }
    }

}