import { StyleSheet, View, Text, StyleProp, ViewStyle, Image } from "react-native";
import { padding, rounded_less, styles_sheet } from "../../../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import { AppState, History } from "../../../store/types";
import React from "react";
import i18n from "../../../translate";
import TitleCard from "./TitleCard";
import { connect } from "react-redux";
import BoxActionsCard from "./BoxActionsCard";
import { Separatorline } from "../SeparatorLine";
import { barcodelineal_icon_text_Header } from "../../../utils/actionsAndIcons";
import { BarcodeValueTypes } from "../../../constants/barcodes_values";

type Props = {
  item: History
  favourite: History[]
  navigation: any
  addFavouriteFunction: React.Dispatch<History>
  deleteFavouriteFunction: React.Dispatch<string>
  onDeleteItemById: React.Dispatch<string> | null
}

const SectionCardItem = ({
                           navigation,
                           item,
                           favourite,
                           addFavouriteFunction,
                           deleteFavouriteFunction,
                           onDeleteItemById
}: Props) => {
  const { dark, colors } = useTheme();
  const [isFavourite, setIsFavourite] = React.useState<boolean>(false);

  // SET ICON TYPE
  const { ico } = barcodelineal_icon_text_Header(dark, item.rawValue, BarcodeValueTypes[item.content.type]);
  // PROPS FOR SEPARATOR
  const separator_style: ViewStyle = {
    width: "100%",
    borderWidth: .5,
    borderColor: colors.border,
    marginVertical: padding,
    alignSelf: "center"
  };

  React.useEffect(() => {
    const is_favourite: History[] = favourite.filter(i => i.id === item.id);
    setIsFavourite(!!is_favourite.length);
  }, [favourite]);

  return (
    <View style={{
      ...styles.contentItem,
      backgroundColor: colors.card,
      borderColor: colors.border
    }}>
      <TitleCard codetype={item.codetype} time={item.hour} />
      <Separatorline styles={separator_style} />
      {/*START CONTENT DATA AND ACTION OPTIONS*/}
      <View style={{
        ...styles.dataContent
      }}>
        {/*Left CONTENT*/}
        <Image source={ico}
               style={{ width: 50, height: 50, resizeMode: "contain", marginRight: padding }}
        />
        {/*right CONTENT*/}
        <View style={{
          ...styles.actionContent
        }}>
          <>
            <Text style={{
              ...styles.name,
              ...styles_sheet.firstText,
              color: colors.primary
            }}
                  numberOfLines={1}
            >{i18n.t("generic.name")}: <Text style={{ ...styles_sheet.secondText, color: colors.text }}>
              {item.name}
            </Text>
            </Text>
          </>
          <>
            <Text style={{
              ...styles.name,
              ...styles_sheet.firstText,
              color: colors.primary
            }}
                  numberOfLines={1}
            >{i18n.t("generic.value")}: <Text style={{ ...styles_sheet.secondText, color: colors.text }}>
              {item.rawValue}
            </Text>
            </Text>
          </>
        </View>
      </View>
      <Separatorline styles={separator_style} />
      <BoxActionsCard isFavourite={isFavourite}
                      dark={dark}
                      item={item}
                      navigation={navigation}
                      addFavouriteFunction={addFavouriteFunction}
                      deleteFavouriteFunction={deleteFavouriteFunction}
                      onDeleteItemById={onDeleteItemById}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  favourite: state.usedFauvorites
});

export default connect(
  mapStateToProps
)(SectionCardItem);

const styles = StyleSheet.create({
  contentItem: {
    padding: padding,
    marginVertical: padding,
    borderRadius: rounded_less,
    borderWidth: 1
  },
  name: {
    marginVertical: padding * .5
  },
  dataContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
    // backgroundColor: 'red'
  },
  actionContent: {},
  actionBox: {
    padding: padding
  }
});