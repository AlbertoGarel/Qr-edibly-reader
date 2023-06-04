import { Image, StyleSheet, Text, View } from "react-native";
import { styles_sheet } from "../constants/styles_sheet";
import * as React from "react";
import { useTheme } from "@react-navigation/native";
import i18n from "../translate";
import "moment/min/locales";
import MomentDate from "../components/microComponents/MomentDate";

const TitleItem = ({ data, image }) => {
  const { colors } = useTheme();

  return (
    <View style={{
      ...styles.container, ...styles_sheet.rowBetween,
      backgroundColor: colors.background,
      borderBottomRightRadius: 70
    }}>
      <View style={{ flex: 3 }}>
        <View style={styles.barcodeTypeData}>
          <MomentDate image={image} _date={data.code[0].date} _hour={data.code[0].hour} />
          <Text style={[styles.title, { color: colors.primary }]}>
            {i18n.t("contextual.barcode_title")}:
            <Text style={{ color: colors.text }}> {data.type}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.containerIcon}>
        <Image source={data.icon} style={styles.icon} />
        <Text style={{ display: "flex", color: colors.text }} adjustsFontSizeToFit>
          {data.text}
        </Text>
      </View>
    </View>
  );
};
export default TitleItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30
  },
  barcodeTypeData: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
    paddingRight: 10
  },
  title: {
    width: "100%",
    fontSize: 19,
    paddingBottom: 20,
    fontFamily: "Ubuntu"
  },
  textIcon: {
    // paddingHorizontal: 10,
    color: "#fff",
    paddingTop: 20,
    fontFamily: "Ubuntu"
  },
  containerIcon: {
    flex: .8,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  }
});