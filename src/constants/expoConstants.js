import Constants from 'expo-constants';
import {Dimensions} from "react-native";

const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export {
    STATUSBAR_HEIGHT,
    WINDOW_WIDTH,
    WINDOW_HEIGHT
}