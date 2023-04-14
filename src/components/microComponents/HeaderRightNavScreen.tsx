import { StyleSheet, View, Text, ImageURISource } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import TouchableOpacityicon from "../microComponents/TouchableOpacityIcon";
import { styles_sheet } from "../../constants/styles_sheet";
import { createTwoButtonAlert } from "../../utils/utils";
import i18n from "../../translate";
import React, { Dispatch } from "react";
import RNpickerCodeTypes from "../microComponents/RNpickerCodeTypes";

interface Props {
  handlerReduxAllDeleteAction: Dispatch<void>
  title: string
  handlerFilter: (val: number) => void
}

export const HeaderRightNavScreen = ({ handlerReduxAllDeleteAction, title, handlerFilter }: Props) => {
  const { dark, colors } = useTheme();
  const icon_filter: ImageURISource | ImageURISource[] = dark ? require("../../assets/images/filtro_light.png") : require("../../assets/images/filtro_dark.png");
  const icon_delete: ImageURISource | ImageURISource[] = dark ? require("../../assets/images/delete_light.png") : require("../../assets/images/delete_dark.png");
  const headerHeight: number = useHeaderHeight();
  const icon_height: number = headerHeight - 30;
  const icon_margin: number = 10;
  const _delete: string = "delete";

  const interpolate_title = (title) => {
    return i18n.t(`contextual.all_delete`, { key: title });
  };

  return (
    <View style={{
      ...styles_sheet.rowBetween,
      justifyContent: "flex-end",
      height: headerHeight - 10, ...styles.parentContainer
    }}>
      <TouchableOpacityicon src_image={icon_delete}
                            image_height={icon_height}
                            image_width={icon_height}
                            margin={icon_margin}
                            _onPress={() => createTwoButtonAlert(
                              i18n.t(`generic.${_delete}`),
                              interpolate_title(title),
                              () => handlerReduxAllDeleteAction()
                            )}
      />
      <RNpickerCodeTypes styleIcon={{ width: icon_height, height: icon_height }} handlerFilter={handlerFilter}
                         icon={icon_filter} />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "Sniglet",
    textTransform: "uppercase"
  },
  parentContainer: {
    backgroundColor: "transparent"
  }
});