import { StyleSheet, View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { padding, styles_sheet } from "../constants/styles_sheet";
import i18n from "../translate";

type Props = {
  content: string
}

const ContentItem = ({ content }: Props) => {
  const { dark, colors } = useTheme();

  return (
    <View style={styles.card}>
      <View style={[{ backgroundColor: colors.card, borderColor: colors.background },
        styles.circleIcon, styles_sheet.centerCenter]}
      >
        <Image source={dark
          ? require("../assets/images/barcode_light.png")
          : require("../assets/images/barcode_dark.png")
        }
               style={styles.imageIcon} />
      </View>
      <View style={[styles.containerContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.data, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <Text style={{
            color: colors.primary,
            position: "absolute",
            top: -20,
            left: 10
          }}>{i18n.t("contextual.drawer_text")}:</Text>
          <Text
            style={[styles.text, { color: colors.text }]}>
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ContentItem;
const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center"
  },
  circleIcon: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 8,
    alignSelf: "center",
    marginBottom: -40,
    zIndex: 2
  },
  imageIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain"
  },
  containerContent: {
    height: "auto",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: padding
  },
  data: {
    width: "auto",
    height: "auto",
    marginTop: padding,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: padding,
    alignSelf: "center",
    borderWidth: 1
  },
  text: {
    fontSize: 18,
    fontFamily: "Ubuntu",
    letterSpacing: 2
  }
});