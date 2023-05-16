import { ImageSource, Sound, Resource, Loader } from "excalibur";
import fishImage from "../images/fish.png";
import skiImage from "../images/tile_0071.png";
import snowImage from "../images/tile_0005.png";
import treeImage from "../images/tile_0030.png";
import snowmanImage from "../images/tile_0069.png";
import straightImage from "../images/pixelmap_straightaway.png";

const Resources = {
  Fish: new ImageSource(fishImage),
  Ski: new ImageSource(skiImage),
  Snow: new ImageSource(snowImage),
  Tree: new ImageSource(treeImage),
  Snowman: new ImageSource(snowmanImage),
  Straight: new ImageSource(straightImage)
};
const ResourceLoader = new Loader([
  Resources.Fish,
  Resources.Ski,
  Resources.Snow,
  Resources.Tree,
  Resources.Snowman,
  Resources.Straight
]);

export { Resources, ResourceLoader };
