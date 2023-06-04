import { StyleSheet, View } from "react-native";
import TouchableOpacityicon from "../../microComponents/TouchableOpacityIcon";
import React from "react";
import { styles_sheet } from "../../../constants/styles_sheet";
import ListedPill from "../ListedPill";
import { History } from "../../../store/types";
import { createTwoButtonAlert, showToastWithGravity } from "../../../utils/utils";
import i18n from "../../../translate";

interface Props {
  navigation: any
  isFavourite: boolean
  dark: boolean
  item: History
  addFavouriteFunction: React.Dispatch<History>
  deleteFavouriteFunction: React.Dispatch<string>
  onDeleteItemById: React.Dispatch<string> | null
}

const BoxActionsCard = ({
                          navigation,
                          isFavourite,
                          dark,
                          item,
                          addFavouriteFunction,
                          deleteFavouriteFunction,
                          onDeleteItemById
                        }: Props) => {

  const icon_measure: number = 25;
  const icon_margin: number = 10;

  function handlerChangeScreen(): void {
    navigation.navigate("codescreen", {
      code: [item],
      imageData: null
    });
  }

  function handler_favorite(): void {
    let txt: string = "";
    if (!isFavourite) {
      txt = "contextual.add_favorites";
      addFavouriteFunction(item);
    } else {
      txt = "contextual.remove_favorites";
      deleteFavouriteFunction(item.id);
    }
    showToastWithGravity(i18n.t(txt));
  }

  return (
    <View style={styles_sheet.rowBetween}>
      {/*CONTAINER FOR LISTED STATE*/}
      <View>
        <ListedPill isListed={0} />
      </View>
      {/*CONTAINER FOR ACTIONS*/}
      <View style={{ ...styles.ContActions, ...styles_sheet.rowBetween }}>
        <TouchableOpacityicon
          image_width={icon_measure}
          image_height={icon_measure}
          src_image={dark
            ? isFavourite ? require("../../../assets/images/bookmark_full_light.png") : require("../../../assets/images/bookmark_light.png")
            : isFavourite ? require("../../../assets/images/bookmark_full_dark.png") : require("../../../assets/images/bookmark_dark.png")
          }
          _onPress={handler_favorite} margin={icon_margin} />
        {
          onDeleteItemById !== null
            ? <TouchableOpacityicon
              image_width={icon_measure}
              image_height={icon_measure}
              src_image={dark
                ? require("../../../assets/images/delete_light.png")
                : require("../../../assets/images/delete_dark.png")
              }
              _onPress={() => createTwoButtonAlert(i18n.t("generic.delete"), i18n.t("contextual.item_delete"), () => onDeleteItemById(item.id))}
              margin={icon_margin} />
            :
            null
        }
        <TouchableOpacityicon
          image_width={icon_measure}
          image_height={icon_measure}
          src_image={dark
            ? require("../../../assets/images/eye_light.png")
            : require("../../../assets/images/eye_dark.png")
          }
          _onPress={handlerChangeScreen} margin={icon_margin} />
      </View>
    </View>
  );
};

export default BoxActionsCard;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Sniglet"
  },
  ContActions: {
    // backgroundColor: 'darkblue'
  }
});