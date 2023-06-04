import { ImageBackground, TouchableHighlight, Image, StyleSheet } from "react-native";
import { styles_sheet } from "../../constants/styles_sheet";
import { BREACKPOINT_DEVICES, WINDOW_WIDTH } from "../../constants/expoConstants";
import { handlerActionAndEffects, simpleVibrated } from "../../utils/utils";
import { AppState, SettingsInUseState } from "@App/store/types";
import { connect } from "react-redux";
import { useSound } from "../../hooks/useSound";
import { Sound } from "expo-av/build/Audio/Sound";

type Props = {
  pressed: boolean,
  press_func: (value: boolean) => void,
  selectedSettings: SettingsInUseState
}

const RoundedButton = ({ selectedSettings, pressed, press_func }: Props) => {
  const { buttonVibration, buttonSound } = selectedSettings[0];
  const playSound: () => Promise<void> = useSound();

  async function HandlerSoundButton(): Promise<Function | void> {
    return buttonSound ? await playSound() : () => null;
  }

  async function handlerPressOn(): Promise<void> {
    await handlerActionAndEffects(() => press_func(true), buttonVibration, HandlerSoundButton);
  }

  async function handlerPressOut(): Promise<void> {
    await handlerActionAndEffects(() => press_func(false), buttonVibration, () => null);
  }

  return (
    <ImageBackground
      source={require("../../assets/images/anillo_exterior_button.png")} resizeMode="contain"
      style={[styles.background, styles_sheet.flexColumn]}>
      <TouchableHighlight
        onPressIn={handlerPressOn}
        onPressOut={handlerPressOut}
        underlayColor="#DDDDDD"
        style={[
          styles_sheet.flexColumn,
          styles.touchable,
          {
            elevation: pressed ? 0 : 10,
            borderWidth: pressed ? 4 : 1
          }
        ]}>
        <ImageBackground
          source={require("../../assets/images/boton_textura.png")} resizeMode="contain"
          style={[styles.background, styles_sheet.flexColumn]}>
          <Image
            source={require("../../assets/images/barcode_stick_opac.png")}
            style={{ width: "50%", height: "50%", resizeMode: "cover" }}
          />
        </ImageBackground>
      </TouchableHighlight>
    </ImageBackground>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedSettings: state.usedSettings
});

export default connect(
  mapStateToProps,
  null
)(RoundedButton);
const styles = StyleSheet.create({
  background: {
    width: WINDOW_WIDTH < BREACKPOINT_DEVICES ? WINDOW_WIDTH / 3 : 150,
    height: WINDOW_WIDTH < BREACKPOINT_DEVICES ? WINDOW_WIDTH / 3 : 150
  },
  touchable: {
    borderRadius: WINDOW_WIDTH / 3,
    width: "80%",
    height: "80%",
    backgroundColor: "#FFFFFF",
    borderColor: "#9A9A9A"
  }
});