import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ImageURISource,
  ImageRequireSource, TouchableHighlight, GestureResponderEvent
} from "react-native";
import { rounded, styles_sheet } from "../constants/styles_sheet";
import { WINDOW_WIDTH } from "../constants/expoConstants";
import { connect } from "react-redux";
import { AppState, SettingsInUseState, ThemesInUseState } from "../store/types";
import { Dispatch } from "redux";
import { addTheme } from "../store/themes/actions";
import { custom_themes } from "../themes/themes";
import Settings from "../screens/Settings";
import { useTheme } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { handlerActionAndEffects } from "../utils/utils";

type Props = {
  boxWidth: number
  boxHeight: number
  check_item: ImageURISource | ImageURISource[] | ImageRequireSource
  background: string
  name_theme: string
  image_bg: ImageURISource | ImageURISource[] | ImageRequireSource
  theme: ThemesInUseState
  onAddTheme: (name: object) => void
  _onPress: () => void | null
  params: string | boolean
  usedSettings: SettingsInUseState
}

const border_width = 2;

const BoxSchemaColors = ({
                           params,
                           _onPress,
                           background,
                           name_theme,
                           image_bg,
                           onAddTheme,
                           theme,
                           check_item,
                           boxWidth,
                           boxHeight,
                           usedSettings
                         }: Props) => {

  const { dark, colors } = useTheme();
  const { buttonSound, buttonVibration } = usedSettings[0];

  const is_equal = theme[0].name === name_theme;
  const selected = custom_themes.filter(i => i.name === name_theme)[0];
  const widthBorder = boxWidth + (border_width * 2);
  const numElements = Math.floor(WINDOW_WIDTH / widthBorder);
  const margin = ((WINDOW_WIDTH - (widthBorder * numElements)) / numElements + (widthBorder / numElements));

  return (
    <TouchableHighlight
      onPress={!_onPress ? () => handlerActionAndEffects(() => onAddTheme({ ...selected }), buttonVibration, buttonSound) : _onPress}
      activeOpacity={0.6}
      underlayColor="transparent"
      style={{
        marginVertical: 5,
        marginLeft: margin
      }}
    >
      <View style={[styles.contBox, {
        backgroundColor: background,
        borderColor: colors.border,
        width: boxWidth,
        height: boxHeight
      }]}>
        <ImageBackground source={image_bg} resizeMode="cover"
                         style={{ width: "100%", height: "100%" }}
        >
          {/*IF THEME SELECTION USE*/}
          {!_onPress && is_equal && <Image source={check_item}
                                           style={[styles.imageCheck, { resizeMode: "cover" }]}
          />}
          {/*FOR OTHERS USES*/}
          {_onPress && params === name_theme && <Image source={check_item}
                                                       style={[styles.imageCheck, { resizeMode: "cover" }]}
          />}
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );
};


const mapStateToProps = (state: AppState) => ({
  theme: state.usedTheme,
  usedSettings: state.usedSettings
});

const mapDipatchToProps = (dispatch: Dispatch) => ({
  onAddTheme: (theme: object) => {
    dispatch(addTheme(theme));
  }
  // other callbacks go here...
});
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(BoxSchemaColors);

BoxSchemaColors.defaultProps = {
  flexgrow: true,
  check_item: require("../assets/images/check_opac_white.png")
};

const styles = StyleSheet.create({
  contBox: {
    borderRadius: rounded,
    borderWidth: border_width
  },
  imageCheck: {
    width: "100%",
    height: "100%",
    borderRadius: rounded - 3 // less 3 to perfectly cover square.
  }
});
