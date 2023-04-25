import { ImageSource, Sound, Resource, Loader } from "excalibur";
import fishImage from "../images/fish.png";
import skiImage from "../images/tile_0071.png";
import snowImage from "../images/tile_0005.png";
import treeImage from "../images/tile_0030.png";

const Resources = {
  Fish: new ImageSource(fishImage),
  Ski: new ImageSource(skiImage),
  Snow: new ImageSource(snowImage),
  Tree: new ImageSource(treeImage),
};
const ResourceLoader = new Loader([
  Resources.Fish,
  Resources.Ski,
  Resources.Snow,
  Resources.Tree,
]);

export { Resources, ResourceLoader };
