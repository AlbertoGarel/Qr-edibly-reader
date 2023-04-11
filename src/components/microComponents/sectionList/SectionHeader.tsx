import { StyleSheet, View, Text } from "react-native";
import i18n from "../../../translate";
import { padding, styles_sheet } from "../../../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import { createTwoButtonAlert } from "../../../utils/utils";
import TouchableOpacityicon from "../../../components/microComponents/TouchableOpacityIcon";
import { allDeleteHistory, deleteByDate } from "../../../store/history/actions";

const SectionHeader = ({ title, onDeleteHistoryByDate }) => {
const {dark, colors } = useTheme();
  const icon_delete: any = dark ? require("../../../assets/images/delete_light.png") : require("../../../assets/images/delete_dark.png");
  const icon_height: number = 25;
  const icon_margin: number = 0;
  const _delete = "delete";

  const interpolate_title = (title) => {
    return i18n.t(`contextual.all_delete`, {key: title})
  }
  return (
    <View style={{ ...styles.containerTitle, ...styles_sheet.rowBetween }}>
      <TouchableOpacityicon src_image={icon_delete}
                            image_height={icon_height}
                            image_width={icon_height}
                            margin={icon_margin}
                            _onPress={() => createTwoButtonAlert(
                              i18n.t(`generic.${_delete}`),
                              interpolate_title(title),
                              () => onDeleteHistoryByDate(title)
                            )}
      />
      <Text style={{ ...styles.title, color: colors.primary }}>{i18n.strftime(new Date(title), "%d/%m/%Y")}</Text>
    </View>
  );
};
export default SectionHeader;
const styles = StyleSheet.create({
  title: {
    fontFamily: "Sniglet",
    textAlign: "right",
    marginRight: padding,
    fontSize: 16
  },
  containerTitle:{
    padding: padding * .5
  }
});