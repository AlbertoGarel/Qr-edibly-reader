import { TouchableOpacity, View, Text, Image, ImageURISource, ImageRequireSource } from "react-native";
import { padding, styles_sheet } from "../../constants/styles_sheet";
import { connect } from "react-redux";
import { AppState, SettingsInUseState } from "@App/store/types";
import { handlerActionAndEffects } from "../../utils/utils";

type Props = {
  src_image: ImageURISource | ImageURISource[] | ImageRequireSource,
  image_height: number,
  image_width: number,
  margin: number,
  _onPress: () => void
  selectedSettings: SettingsInUseState
}

const TouchableOpacityicon = ({ selectedSettings, src_image, image_height, image_width, margin, _onPress }: Props) => {
  const { buttonSound, buttonVibration } = selectedSettings[0];

  function handlerPress() {
    handlerActionAndEffects(_onPress, buttonVibration, buttonSound);
  }

  return (
    <TouchableOpacity onPress={handlerPress} style={{ margin: margin }}>
      <View style={{ width: image_width, height: image_height, ...styles_sheet.centerCenter }}>
        <Image source={src_image} resizeMode="contain" style={{ width: image_width, height: image_height }} />
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedSettings: state.usedSettings
});

export default connect(
  mapStateToProps,
  null
)(TouchableOpacityicon);