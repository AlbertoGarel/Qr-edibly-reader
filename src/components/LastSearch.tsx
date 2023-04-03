import { View, Text, StyleSheet, TouchableHighlight, Image } from "react-native";
import { HEIGHT_BREACKPOINT_DEVICES, WINDOW_HEIGHT } from "../constants/expoConstants";
import { useTheme } from "@react-navigation/native";
import { medium_fontSize, padding, rounded_less, styles_sheet } from "../constants/styles_sheet";
import i18n from "../translate";
import React, { useEffect } from "react";
import ListedPill from "../components/microComponents/ListedPill";
import { History } from "../store/types";

type Props = {
  last: any,
  handlerRoute: (param: History) => void
}
const LastSearch = ({ handlerRoute, last }: Props) => {
  const { dark, colors } = useTheme();

  return (
    <TouchableHighlight onPress={() => handlerRoute(last)} underlayColor={"transparent"}>
      <View style={{ minWidth: "50%", maxWidth: "90%" }}>
        <View
          style={{ ...styles_sheet.rowBetween, paddingHorizontal: padding - 8, paddingVertical: padding - 5 }}>
          <Text style={{
            color: colors.text,
            fontFamily: "Sniglet",
            fontSize: 16
          }}>{i18n.t("contextual.last_search")}:</Text>
          <Image source={dark ?
            require("../assets/images/go_square_light.png")
            :
            require("../assets/images/go_square.png")
          } style={{ width: 20, height: 20 }} />
        </View>
        <View style={{ ...styles.card, backgroundColor: colors.card + 99, borderColor: colors.border }}>
          {
            !Object.keys(last).length ?
              <View style={{ ...styles_sheet.flexColumn, width: "100%" }}>
                <Image source={dark ?
                  require("../assets/images/no_last_search_ligth.png")
                  :
                  require("../assets/images/no_last_search_dark.png")
                }
                       style={{
                         width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 200 : 100,
                         height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 100 : 50,
                         resizeMode: "contain"
                       }} />
                <Text style={{ ...styles.secondaryText, fontSize: 18, color: colors.text }}>
                  {i18n.t("contextual.first_search")}
                </Text>
              </View>
              :
              <>
                <Text numberOfLines={1} ellipsizeMode={"tail"}
                      style={{ color: colors.primary, ...styles.primarytext }}>{i18n.t("generic.name")}:
                  <Text style={{ color: colors.text, ...styles.secondaryText }}> {last.name}</Text>
                </Text>
                <Text style={{ ...styles.primarytext, color: colors.primary }}>
                  {i18n.t("generic.date")}: <Text
                  style={{
                    ...styles.secondaryText,
                    color: colors.text
                  }}>{i18n.strftime(new Date(last.date), "%d/%m/%Y")}</Text>
                </Text>
                <View style={{
                  ...styles_sheet.rowBetween,
                  alignItems: "flex-start",
                  minWidth: "100%"
                }}>
                  <Text style={{
                    color: colors.primary, ...styles.primarytext, marginBottom: padding
                  }}>
                    {i18n.t("generic.type")}: <Text
                    style={{ ...styles.secondaryText, color: colors.text }}> {last.codetype}</Text>
                  </Text>
                  <ListedPill isListed={last.listed} />
                </View>
                <Text style={{ ...styles.primarytext, color: colors.primary }}>{i18n.t("contextual.content")}:</Text>
                <Text style={{ ...styles.contentText, ...styles.secondaryText, color: colors.text }}
                      numberOfLines={1}
                >{last.rawValue}</Text>
              </>
          }
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
    card:
      {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderRadius: rounded_less,
        padding: padding / 2,
        borderWidth: 1
      },
    primarytext: {
      flexShrink: 1,
      fontFamily: "Ubuntu",
      fontSize: 16
    },
    secondaryText: {
      flexShrink: 1,
      fontFamily: "Sniglet",
      fontSize: 14
    },
    contentText: {
      paddingVertical: padding / 2,
      paddingHorizontal: padding,
      // flexShrink: 1,
      fontSize: 18
    }
  })
;

export default LastSearch;