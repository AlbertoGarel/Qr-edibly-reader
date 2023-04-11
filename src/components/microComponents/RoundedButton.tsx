import {View, Vibration, ImageBackground, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {styles_sheet} from "../../constants/styles_sheet";
import {BREACKPOINT_DEVICES, WINDOW_WIDTH} from "../../constants/expoConstants";
import {simpleVibrated} from "../../utils/utils";

type Props = {
    pressed: boolean,
    press_func: (value: boolean) => void,
}

const RoundedButton = ({pressed, press_func}: Props) => {

    return (
        <ImageBackground
          source={require('../../assets/images/anillo_exterior_button.png')} resizeMode="contain"
          style={[styles.background, styles_sheet.flexColumn]}>
            <TouchableHighlight
                onPressIn={() => {
                    press_func(true);
                    simpleVibrated(.05)
                }}
                onPressOut={() => {
                    press_func(false)
                    simpleVibrated(.05)
                }}
                underlayColor="#DDDDDD"
                style={[
                    styles_sheet.flexColumn,
                    styles.touchable,
                    {
                        elevation: pressed ? 0 : 10,
                        borderWidth: pressed ? 4 : 1,
                    }
                ]}>
                <ImageBackground
                  source={require('../../assets/images/boton_textura.png')} resizeMode="contain"
                  style={[styles.background, styles_sheet.flexColumn]}>
                    <Image
                        source={require('../../assets/images/barcode_stick_opac.png')}
                        style={{width: '50%', height: '50%', resizeMode: 'cover'}}
                    />
                </ImageBackground>
            </TouchableHighlight>
        </ImageBackground>
    )
};
export default RoundedButton;
const styles = StyleSheet.create({
    background: {
        width: WINDOW_WIDTH < BREACKPOINT_DEVICES ? WINDOW_WIDTH / 3 : 150,
        height: WINDOW_WIDTH < BREACKPOINT_DEVICES ? WINDOW_WIDTH / 3 : 150
    },
    touchable: {
        borderRadius: WINDOW_WIDTH / 3,
        width: '80%',
        height: '80%',
        backgroundColor: '#FFFFFF',
        borderColor: '#9A9A9A'
    }
})