import { Pressable, Image, ImageURISource } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";
import { handlerActionAndEffects } from "../../utils/utils";
import { AppState, SettingsInUseState } from "@App/store/types";
import { connect } from "react-redux";
import { useSound } from "../../hooks/useSound";

interface RNpickerProp {
  dataPickers: any
  icon: ImageURISource | ImageURISource[]
  data: string | number
  handler: (itemValue: string) => void
  selectedSettings: SettingsInUseState
}

const RNpicker = ({ selectedSettings, dataPickers, icon, data, handler }: RNpickerProp) => {
  const { dark, colors } = useTheme();
  const { buttonVibration, buttonSound } = selectedSettings[0];
  const playSound = useSound();

  async function HandlerSoundButton() {
    return buttonSound ? await playSound() : () => null;
  }

  async function handlerPress() {
    await handlerActionAndEffects(() => null, buttonVibration, HandlerSoundButton);
  }

  return (
    <Pressable onPress={handlerPress}>
      <Image source={icon} style={{
        resizeMode: "contain",
        width: 30,
        height: 30
      }} />
      <Picker
        dropdownIconColor={colors.card}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        mode={"dialog"}
        onValueChange={(itemValue, itemIndex) =>
          handler(`${itemValue}${data}`)
        }>
        <Picker.Item label={i18n.t("contextual.engines_dialog")} value={null} enabled={false}
                     color={colors.background} />
        {
          dataPickers.map((item, idx) => {
            return <Picker.Item key={idx} label={item.name} value={item.url} />;
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
)(RNpicker);