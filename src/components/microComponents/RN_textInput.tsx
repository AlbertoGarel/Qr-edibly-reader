import { StyleSheet, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import { AppState, SettingsInUseState } from "../../store/types";
import { handlerActionAndEffects } from "../../utils/utils";
import { useSound } from "../../hooks/useSound";
import i18n from "../../translate";

interface RN_textInputProps {
  selectedSettings: SettingsInUseState
  customTitle: string
  getCustomTitle: any
}

const RN_textInput = ({ selectedSettings, customTitle, getCustomTitle }: RN_textInputProps) => {
  const inputRef = React.useRef(null);
  const { dark, colors } = useTheme();
  const { buttonVibration, buttonSound } = selectedSettings[0];
  const playSound: () => Promise<void> = useSound();
  const [inputValue, getInputValue] = React.useState<string>();

  async function HandlerSoundButton(): Promise<Function | void> {
    return buttonSound ? await playSound() : () => null;
  }

  async function handlerPress(): Promise<void> {
    await handlerActionAndEffects(() => null, buttonVibration, HandlerSoundButton);
  }

  const getOnBlurValueInput = e => {
    if (inputValue === " " || inputValue === "") {
      inputRef.current.focus();
      Alert.alert(i18n.t("contextual.input_name_placeholder"), i18n.t("contextual.empty_input"));
    } else {
      getCustomTitle(inputValue);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: "transparent", borderBottomColor: colors.border }]}>
      <TextInput
        ref={inputRef}
        onFocus={handlerPress}
        onBlur={getOnBlurValueInput}
        editable
        numberOfLines={1}
        maxLength={50}
        onChangeText={text => getInputValue(text)}
        defaultValue={customTitle}
        value={inputValue}
        style={[styles.textinput, { color: colors.text }]}
      />
    </KeyboardAvoidingView>
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