import Constants from "expo-constants";
import { Dimensions } from "react-native";

const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const DEVICE_PIXEL_RATIO = Dimensions.get("window").scale;
const BREACKPOINT_DEVICES = 576;
const HEIGHT_BREACKPOINT_DEVICES = 700;
const ONE_SECOND_IN_MS = 1000;
const ADMOB_BANNER_HEIGHT = 60.7;
const LINEAl_LAYOUT = {
  width: WINDOW_WIDTH, height: WINDOW_WIDTH * .75, x: 0, y: 0
};
const QR_LAYOUT = {
  width: WINDOW_WIDTH, height: WINDOW_WIDTH, x: 0, y: 0
};

export {
  STATUSBAR_HEIGHT,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  BREACKPOINT_DEVICES,
  ONE_SECOND_IN_MS,
  HEIGHT_BREACKPOINT_DEVICES,
  DEVICE_PIXEL_RATIO,
  ADMOB_BANNER_HEIGHT,
  LINEAl_LAYOUT,
  QR_LAYOUT
};