import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, GraphicsGroup, CompositeCollider, Shape } from "excalibur";
import { Game } from "./main.js";
import { Tree } from "./tree.js"
import { Resources, ResourceLoader } from "./resources.js";
import { TreeLine } from "./treeLine.js";

export class TreeSpawner extends Actor{
    game;
    treeLineImages = [];
    treeLines = [];
    treeCollisions = [];
    constructor(game) {
        super()
        this.game = game

        let treeImage = Resources.Tree.toSprite()

        this.treeLineImages.push(new GraphicsGroup({
            members: [
                {
                    graphic: treeImage,
                    pos: new Vector(0, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width * 2, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width * 3, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width * 4, this.game.screen.drawHeight / 3)
                },

                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 2, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 3, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 4, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 5, this.game.screen.drawHeight / 3 * 2)
                },
                
            ]
        }), new GraphicsGroup({
            members: [
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 2, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 3, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 4, this.game.screen.drawHeight / 3)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(-treeImage.width * 5, this.game.screen.drawHeight / 3)
                },

                {
                    graphic: treeImage,
                    pos: new Vector(0, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width * 2, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width * 3, this.game.screen.drawHeight / 3 * 2)
                },
                {
                    graphic: treeImage,
                    pos: new Vector(treeImage.width * 4, this.game.screen.drawHeight / 3 * 2)
                },
                
            ]
        }))
        this.treeCollisions.push(new CompositeCollider([
            Shape.Box(treeImage.width * 5, treeImage.height, new Vector(0, 0), new Vector(0, this.game.screen.drawHeight / 3)),
            Shape.Box(treeImage.width * 5, treeImage.height, new Vector(0, 0), new Vector(-treeImage.width * 5, this.game.screen.drawHeight / 3 * 2))
        ]), new CompositeCollider([
            Shape.Box(treeImage.width * 5, treeImage.height, new Vector(0, 0), new Vector(-treeImage.width * 5, this.game.screen.drawHeight / 3)),
            Shape.Box(treeImage.width * 5, treeImage.height, new Vector(0, 0), new Vector(0, this.game.screen.drawHeight / 3 * 2))
        ]))

        // this.pos = new Vector(this.game.screen.drawWidth / 2, this.game.screen.drawHeight)
        // this.graphics.add(this.treeLines[1])
        // this.collider.useCompositeCollider(this.treeCollisions[1].getColliders())
        // this.anchor = new Vector(0, 0)
        // this.vel = new Vector(0, -100)
        for (let i = 0; i < 2; i++) {
            this.treeLines.push(new TreeLine(this.treeCollisions[i].getColliders(), this.treeLineImages[i], new Vector(this.game.screen.drawWidth / 2, this.game.screen.drawHeight * (i + 1))))
            this.game.add(this.treeLines[i])
        }
    }

    update() {
        for (const treeLine of this.treeLines) {
            if (treeLine.pos.y < -this.game.screen.drawHeight / 3 * 2 - treeLine.height) {
                treeLine.kill()
                this.treeLines.splice(this.treeLines.indexOf(treeLine), 1)
                let treelineChance = Math.round(Math.random() * this.treeLines.length)
                console.log(treelineChance)
                let newTreeline = new TreeLine(this.treeCollisions[treelineChance].getColliders(), this.treeLineImages[treelineChance], new Vector(this.game.screen.drawWidth / 2, this.game.screen.drawHeight))
                this.treeLines.push(newTreeline)
                this.game.add(newTreeline)
            }
        }
    }
}