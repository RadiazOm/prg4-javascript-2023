import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, GraphicsGroup, CompositeCollider, Shape } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { TreeLine } from "./treeLine.js";

export class TreeSpawner {
    game;
    treeLineImages = [];
    treeLines = [];
    treeCollisions = [];
    treeImage = Resources.Tree.toSprite()

    constructor(game) {
        this.game = game
        this.treeLineImages.push(new GraphicsGroup({
            members: [
                {
                    graphic: this.treeImage,
                    pos: new Vector(0, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width * 2, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width * 3, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width * 4, this.game.screen.drawHeight / 3)
                },

                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 2, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 3, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 4, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 5, this.game.screen.drawHeight / 3 * 2)
                },
                
            ]
        }), new GraphicsGroup({
            members: [
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 2, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 3, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 4, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(-this.treeImage.width * 5, this.game.screen.drawHeight / 3)
                },

                {
                    graphic: this.treeImage,
                    pos: new Vector(0, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width * 2, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width * 3, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: this.treeImage,
                    pos: new Vector(this.treeImage.width * 4, this.game.screen.drawHeight / 3 * 2)
                },
                
            ]
        }))
        // this.treeCollisions.push(new CompositeCollider([
        //     Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 0), new Vector(0, this.game.screen.drawHeight / 3)),
        //     Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 0), new Vector(-this.treeImage.width * 5, this.game.screen.drawHeight / 3 * 2))
        // ]), new CompositeCollider([
        //     Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 0), new Vector(-this.treeImage.width * 5, this.game.screen.drawHeight / 3)),
        //     Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 0), new Vector(0, this.game.screen.drawHeight / 3 * 2))
        // ]))

        // this.pos = new Vector(this.game.screen.drawWidth / 2, this.game.screen.drawHeight)
        // this.graphics.add(this.treeLines[1])
        // this.collider.useCompositeCollider(this.treeCollisions[1].getColliders())
        // this.anchor = new Vector(0, 0)
        // this.vel = new Vector(0, -100)
        for (let i = 0; i < 2; i++) {
            this.treeLines.push(new TreeLine(this.createCompositeCollider(i).getColliders(), this.treeLineImages[i], new Vector(this.game.screen.drawWidth / 2, this.game.screen.drawHeight * (i + 1) + this.game.screen.drawHeight)))
            this.game.add(this.treeLines[i])
        }
    }

    // createCompositeCollider(CompositeCollider) {
    //     return new CompositeCollider(CompositeCollider)
    // }

    createCompositeCollider(_treeline) {
        switch (_treeline) {
            case 0:
                return new CompositeCollider([
                    Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 1), new Vector(0, -this.game.screen.drawHeight / 3)),
                    Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 1), new Vector(-this.treeImage.width * 5, 0))
                ])
            case 1:
                return new CompositeCollider([
                    Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 1), new Vector(-this.treeImage.width * 5, -this.game.screen.drawHeight / 3)),
                    Shape.Box(this.treeImage.width * 5, this.treeImage.height, new Vector(0, 1), new Vector(0, 0))
                ])
            }
    }

    update() {
        for (const treeLine of this.treeLines) {
            if (treeLine.pos.y < 0) {
                console.log('new treeline')
                treeLine.kill()
                this.treeLines.splice(this.treeLines.indexOf(treeLine), 1)
                let treelineChance = Math.round(Math.random() * this.treeLines.length)
                let newTreeline = new TreeLine(this.createCompositeCollider(treelineChance).getColliders(), this.treeLineImages[treelineChance], new Vector(this.game.screen.drawWidth / 2, this.game.screen.drawHeight * 2))
                this.treeLines.push(newTreeline)
                this.game.add(newTreeline)
            }
        }
    }
}