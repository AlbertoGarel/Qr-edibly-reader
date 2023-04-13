import { styles_sheet } from "../../constants/styles_sheet";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
  ImageURISource,
  ImageRequireSource
} from "react-native";
import { BREACKPOINT_DEVICES, WINDOW_WIDTH } from "../../constants/expoConstants";
import { handlerActionAndEffects } from "../../utils/utils";
import { AppState, SettingsInUseState } from "../../store/types";
import { connect } from "react-redux";

type Props = {
  readonly image_src: ImageURISource | ImageURISource[] | ImageRequireSource,
  func_press: (id: string, bol: boolean) => void,
  identifier: string,
  press_state: boolean
  selectedSettings: SettingsInUseState
}

const SquareButton = ({ selectedSettings, image_src, func_press, identifier, press_state }: Props) => {
  const { buttonVibration, buttonSound } = selectedSettings[0];

  function handlerPressOn() {
    handlerActionAndEffects(() => func_press(identifier, true), buttonVibration, buttonSound);
  }

  function handlerPressOut() {
    handlerActionAndEffects(() => func_press(identifier, false), buttonVibration, buttonSound);
  }

  return (
    <TouchableHighlight
      onPressIn={handlerPressOn}
      onPressOut={handlerPressOut}
      style={[styles.squarebutton, styles_sheet.centerCenter, {
        borderColor: "#DDD",
        elevation: press_state ? 0 : 10,
        borderWidth: press_state ? 4 : 1
      }]}
      underlayColor="#DDDDDD"
    >
      <ImageBackground
        source={require("../../assets/images/square-button.png")}
        resizeMode="contain"
        style={[{
          width: "100%",
          height: "100%",
          borderColor: "#9A9A9A",
          elevation: press_state ? 0 : 5,
          borderWidth: press_state ? 1 : .5
        }, styles_sheet.centerCenter]}>
        <Image
          source={image_src}
          style={{ width: "50%", height: "50%", resizeMode: "cover" }}
        />

      </ImageBackground>
    </TouchableHighlight>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedSettings: state.usedSettings
});

export default connect(
  mapStateToProps,
  null
)(SquareButton);
const styles = StyleSheet.create({
  squarebutton: {
    width: WINDOW_WIDTH < BREACKPOINT_DEVICES ? (WINDOW_WIDTH / 6) : 60,
    height: WINDOW_WIDTH < BREACKPOINT_DEVICES ? (WINDOW_WIDTH / 6) : 60,
    backgroundColor: "white"
  }
});