import { Pressable, Image, ImageURISource, ImageStyle } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";
import { AppState, SettingsInUseState } from "../../store/types";
import { connect } from "react-redux";
import { handlerActionAndEffects } from "../../utils/utils";
import { PICKER_ITEMS } from "../../constants/expoConstants";
import { useSound } from "../../hooks/useSound";

interface RNpickerProp {
  icon: ImageURISource | ImageURISource[]
  styleIcon: ImageStyle
  handlerFilter: (itemValue: number) => void
  selectedSettings: SettingsInUseState
}

const RNpickerCodeTypes = ({ selectedSettings, icon, styleIcon, handlerFilter }: RNpickerProp) => {
  const { dark, colors } = useTheme();
  const { buttonVibration, buttonSound } = selectedSettings[0];
  const playSound: () => void = useSound();

  async function HandlerSoundButton(): Promise<Function | void> {
    return buttonSound ? await playSound() : () => null;
  }

  async function handlerPress(): Promise<void> {
    await handlerActionAndEffects(() => null, buttonVibration, HandlerSoundButton);
  }

  return (
    <Pressable onPress={handlerPress}>
      <Image source={icon} style={{
        resizeMode: "contain",
        ...styleIcon
      }} />
      <Picker
        dropdownIconColor={colors.card}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        mode={"dialog"}
        onValueChange={(itemValue: number) =>
          handlerFilter(itemValue)
        }>
        <Picker.Item label={i18n.t("contextual.engines_dialog")} value={null} enabled={false}
                     color={colors.background} />
        {
          PICKER_ITEMS.map((item, idx) => {
            return <Picker.Item key={idx} label={i18n.t(`generic.${Object.keys(item)[0]}`)}
                                value={Object.values(item)[0]} />;
          })
        }
      </Picker>
    </Pressable>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedSettings: state.usedSettings
});

export default connect(
  mapStateToProps,
  null
)(RNpickerCodeTypes);