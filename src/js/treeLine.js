import { Actor, Vector} from "excalibur";

export class TreeLine extends Actor {
    constructor(CompositeCollider, GraphicsGroup, pos) {
        super()
        this.graphics.add(GraphicsGroup)
        this.collider.useCompositeCollider(CompositeCollider)
        this.anchor = new Vector(0, 1)
        this.pos = pos
        this.vel = new Vector(0, -100)
        this.z = -1
    }

    onPreUpdate() {
        if (this.y === 0) {
            console.log('dissapear')
        }
    }
}