import Constants from 'expo-constants';
import {Dimensions} from "react-native";

const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BREACKPOINT_DEVICES = 576;
const HEIGHT_BREACKPOINT_DEVICES = 700;
const ONE_SECOND_IN_MS = 1000;

export {
    STATUSBAR_HEIGHT,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BREACKPOINT_DEVICES,
    ONE_SECOND_IN_MS,
    HEIGHT_BREACKPOINT_DEVICES
}