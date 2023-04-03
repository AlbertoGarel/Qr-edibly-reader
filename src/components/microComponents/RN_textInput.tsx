import { StyleSheet, View, TextInput } from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";

const RN_textInput = () => {
  const { dark, colors } = useTheme();

  const [value, onChangeText] = React.useState(i18n.t("contextual.input_name_placeholder"));
  return (
    <View
      style={[styles.container, { backgroundColor: value, borderBottomColor: colors.border }]}>
      <TextInput
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
export default RN_textInput;
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