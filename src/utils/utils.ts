import Clipboard from '@react-native-clipboard/clipboard';
import {Vibration} from 'react-native';
import {ONE_SECOND_IN_MS} from "../constants/expoConstants";
import {Audio} from 'expo-av';

/**
 *  Set audio next or back
 *
 *  @param isBack: <boolean>
 *
 **/
// async function playSound(isBack: boolean) {
//     const slelected_audio = await isBack ? require('../assets/tones/navigate_back.mp3') : require('../assets/tones/navigate_next.mp3')
//     const {sound} = await Audio.Sound.createAsync(slelected_audio);
//     await sound.playAsync();
// }

/**
 *  Set vibration time.
 *
 *  @param time: <number>
 *
 **/
function simpleVibrated(time: number) {
    Vibration.vibrate(time * ONE_SECOND_IN_MS);
}

/**
 *  Set content of string type.
 *
 *  @return <string>
 *
 *  @param copyStr: <string>
 *
 **/
async function copyToClipboard(copyStr: string) {
    Clipboard.setString(copyStr);
};

/**
 *  Get content of string type.
 *
 *  @return <string>
 *
 **/
async function fetchCopiedText() {
    return await Clipboard.getString();
};

/**
 *
 *  Get content of image in base64 string type
 *
 **/
async function _getContent() {
    return await Clipboard.getImage();
}
/**
 *
 *  Get content of image in base64 string type
 *
 **/

export {
    // playSound,
    simpleVibrated,
    copyToClipboard,
    fetchCopiedText,
    _getContent
}