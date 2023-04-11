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
import { simpleVibrated } from "../../utils/utils";

type Props = {
  readonly image_src: ImageURISource | ImageURISource[] | ImageRequireSource,
  func_press: (id: string, bol: boolean) => void,
  identifier: string,
  press_state: boolean
}

const SquareButton = ({ image_src, func_press, identifier, press_state }: Props) => {

  return (
    <TouchableHighlight
      onPressIn={() => {
        func_press(identifier, true);
        simpleVibrated(.05);
      }}
      onPressOut={() => func_press(identifier, false)}
      style={[styles.squarebutton, styles_sheet.centerCenter, {
        borderColor: "#DDD",
        borderWidth: 4
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
export default SquareButton;
const styles = StyleSheet.create({
  squarebutton: {
    width: WINDOW_WIDTH < BREACKPOINT_DEVICES ? (WINDOW_WIDTH / 6) : 60,
    height: WINDOW_WIDTH < BREACKPOINT_DEVICES ? (WINDOW_WIDTH / 6) : 60,
    backgroundColor: "white"
  }
});