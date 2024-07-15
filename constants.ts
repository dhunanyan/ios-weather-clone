import left from "./assets/images/left.png";
import profile from "./assets/images/profile.png";
import image1 from "./assets/images/image1.png";
import image2 from "./assets/images/image2.png";
import image3 from "./assets/images/image3.png";
import { ImageSourcePropType } from "react-native";

export const COLORS = {
  light: {
    text: "#282a36",
    background: "#bdbdec",
    tint: "#585cde",
    icon: "#585cde",
    tabIconDefault: "#282a36",
    tabIconSelected: "#585cde",
  },
  dark: {
    text: "#ecedee",
    background: "#282a36",
    tint: "#747aeb",
    icon: "#747aeb",
    tabIconDefault: "#bdbdec",
    tabIconSelected: "#747aeb",
  },
};

type ImagesType = { [key: string]: ImageSourcePropType };

export const IMAGES = {
  left,
  profile,
  image1,
  image2,
  image3,
} as ImagesType;
