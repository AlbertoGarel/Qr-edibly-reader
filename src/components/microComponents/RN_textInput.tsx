import { StyleSheet, View, TextInput } from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";
import { connect } from "react-redux";
import { AppState, SettingsInUseState } from "../../store/types";
import { handlerActionAndEffects } from "../../utils/utils";
import { useSound } from "../../hooks/useSound";

interface RN_textInputProps {
  selectedSettings: SettingsInUseState
}

const RN_textInput = ({ selectedSettings }: RN_textInputProps) => {
  const { dark, colors } = useTheme();
  const { buttonVibration, buttonSound } = selectedSettings[0];
  const playSound: () => Promise<void> = useSound();

  async function HandlerSoundButton(): Promise<Function | void> {
    return buttonSound ? await playSound() : () => null;
  }

  async function handlerPress(): Promise<void> {
    await handlerActionAndEffects(() => null, buttonVibration, HandlerSoundButton);
  }

  const [value, onChangeText] = React.useState<string>(i18n.t("contextual.input_name_placeholder"));
  return (
    <View
      style={[styles.container, { backgroundColor: value, borderBottomColor: colors.border }]}>
      <TextInput
        onFocus={handlerPress}
        editable
        numberOfLines={1}
        maxLength={50}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={[styles.textinput, { color: colors.text }]}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedSettings: state.usedSettings
});

export default connect(
  mapStateToProps,
  null
)(RN_textInput);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 20
  },
  textinput: {
    padding: 10
  }
});