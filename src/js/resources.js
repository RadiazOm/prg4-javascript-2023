import { ImageSource, Sound, Resource, Loader , Color} from "excalibur";
import fishImage from "../images/fish.png";
import skiImage from "../images/tile_0071.png";
import penguinImage from "../images/Penguin.png"
import snowImage from "../images/tile_0005.png";
import treeImage from "../images/tile_0030.png";
import snowmanImage from "../images/tile_0069.png";
import straightImage from "../images/pixelmap_straightaway.png";
import fontMap from "../images/tilemap_packed_font.png";
import titleImage from "../images/TiltePicture.png";
import titleTextImage from "../images/titleText.png";
import retryImage from "../images/RetryButton.png";
import startImage from "../images/StartButton.png";
import resumeImage from "../images/ResumeButton.png";
import pauseImage from "../images/PauseMenu.png";
import leftArrowImage from "../images/LeftArrow.png";
import rightArrowImage from "../images/RightArrow.png";

const Resources = {
  Fish: new ImageSource(fishImage),
  Ski: new ImageSource(skiImage),
  Snow: new ImageSource(snowImage),
  Tree: new ImageSource(treeImage),
  Snowman: new ImageSource(snowmanImage),
  Straight: new ImageSource(straightImage),
  Fontmap: new ImageSource(fontMap),
  Retry: new ImageSource(retryImage),
  Start: new ImageSource(startImage),
  Title: new ImageSource(titleTextImage),
  Resume: new ImageSource(resumeImage),
  Pause: new ImageSource(pauseImage),
  Penguin: new ImageSource(penguinImage),
  Left: new ImageSource(leftArrowImage),
  Right: new ImageSource(rightArrowImage)

};
const ResourceLoader = new Loader([
  Resources.Fish,
  Resources.Ski,
  Resources.Snow,
  Resources.Tree,
  Resources.Snowman,
  Resources.Straight,
  Resources.Fontmap,
  Resources.Retry,
  Resources.Start,
  Resources.Title,
  Resources.Resume,
  Resources.Pause,
  Resources.Penguin,
  Resources.Left,
  Resources.Right
]);
ResourceLoader.logo = titleImage
ResourceLoader.logoWidth = 256
ResourceLoader.logoHeight = 256
ResourceLoader.backgroundColor = Color.fromHex('#eef8fe')
ResourceLoader.loadingBarColor = Color.Black
ResourceLoader.suppressPlayButton = true

export { Resources, ResourceLoader };
