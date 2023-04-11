import { StyleSheet, View, Text } from "react-native";
import { styles_sheet } from "../../../constants/styles_sheet";
import React from "react";
import i18n from "../../../translate";
import { useTheme } from "@react-navigation/native";

type Props = {
  codetype, time: string,
}

const TitleCard = ({ codetype, time }: Props) => {
  const { dark, colors } = useTheme();
  return (
    <View style={styles_sheet.rowBetween}>
      <Text style={{
        ...styles_sheet.firstText,
        color: colors.primary
      }}>{i18n.t("generic.type")}:<Text style={{
        ...styles_sheet.secondText,
        color: colors.text
      }}> {codetype}</Text>
      </Text>
      <Text style={{
        ...styles_sheet.firstText,
        color: colors.primary
      }}>{i18n.t("generic.hour")}:<Text style={{
        ...styles_sheet.secondText,
        color: colors.text
      }}> {time}</Text>
      </Text>
    </View>
  );
};
export default TitleCard;
const styles = StyleSheet.create({});