import { Actor, Vector} from "excalibur";

export class TreeLine extends Actor {
    constructor(CompositeCollider, GraphicsGroup, pos) {
        super()
        this.anchor = new Vector(0, 0)
        this.graphics.add(GraphicsGroup)
        this.collider.useCompositeCollider(CompositeCollider)
        this.pos = pos
        this.vel = new Vector(0, -100)
        this.z = -1
    }
}