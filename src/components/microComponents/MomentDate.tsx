import { StyleSheet, Text } from "react-native";
import * as React from "react";
import moment from "moment";
import * as Localization from "expo-localization";
import { useTheme } from "@react-navigation/native";

type Props = {
  image, _date, _hour: string
}

const MomentDate = ({ image, _date, _hour }: Props) => {
  const { colors } = useTheme();
  const today = new Date();
  moment.locale(Localization.locale);
  const day = moment(today).format("dddd");
  const date = moment(today).format("MMMM D, YYYY");
  const hour = moment(today, ["DDMMMMY HH:mm:ss", "MMMMDDY HH:mm:ss"]).add(24, "hours").format("HH:mm");
  const day_stored = moment(new Date(_date)).format("dddd");

  return (
    <>
      <Text style={[styles.day, { color: colors.text }]}>
        {image ? day : day_stored}
      </Text>
      <Text style={{ color: colors.text, textTransform: "capitalize" }}>
        {image ? date : _date}: {image ? hour : _hour}
      </Text>
    </>
  );
};
export default MomentDate;
const styles = StyleSheet.create({
  day: {
    color: "#fff",
    paddingTop: 20,
    fontFamily: "Ubuntu",
    textTransform: "capitalize"
  }
});