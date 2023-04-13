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

const VIBRATION_PATTERN = [
  ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
];

const PICKER_ITEMS = [
  { ALL: 0 },
  { CONTACT_INFO: 1 },
  { EMAIL: 2 },
  { ISBN: 3 },
  { PHONE: 4 },
  { PRODUCT: 5 },
  { SMS: 6 },
  { TEXT: 7 },
  { URL: 8 },
  { WIFI: 9 },
  { GEO: 10 },
  { CALENDAR_EVENT: 11 },
  { DRIVER_LICENSE: 12 }
];

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
  QR_LAYOUT,
  VIBRATION_PATTERN,
  PICKER_ITEMS
};