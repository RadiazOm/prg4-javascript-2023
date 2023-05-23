import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, GraphicsGroup, CompositeCollider, Shape } from "excalibur";
import { Game } from "./main.js";
import { Tree } from "./tree.js"
import { Resources, ResourceLoader } from "./resources.js";

export class TreeLine extends Actor {
    constructor(CompositeCollider, GraphicsGroup, pos) {
        super()
        this.anchor = new Vector(0, 0)
        this.graphics.add(GraphicsGroup)
        this.collider.useCompositeCollider(CompositeCollider)
        this.pos = pos
        this.vel = new Vector(0, -100)
    }
}