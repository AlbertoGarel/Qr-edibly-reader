import { Text, StyleSheet, View } from "react-native";
import { padding, rounded_less } from "../../constants/styles_sheet";
import React from "react";
import i18n from "../../translate";
import { isCheckedUrl } from "../../utils/utils";

type Props = {
  isListed: number
};

const listedPill = ({ isListed }: Props) => {

  const pillStyle = stylesPill(isListed);
  return (
    <Text style={[styles.primary, pillStyle.primaryText]}>
      {i18n.t("generic.state")}: <Text
      style={{
        ...styles.secondary,
        ...pillStyle.secondaryText
      }}>{isCheckedUrl(isListed)}</Text>
    </Text>
  );
};
export default listedPill;
const styles = StyleSheet.create({
  primary: {
    marginLeft: "auto",
    padding: padding / 2,
    borderRadius: rounded_less
  },
  secondary: {
    flexShrink: 1,
    fontFamily: "Sniglet",
    fontSize: 14
  }
});

function stylesPill(checkURLstate: number) {
  switch (checkURLstate) {
    case 1:
      // Not Checked
      return {
        primaryText: {
          color: "#000000",
          backgroundColor: "#ff7c00"
        },
        secondaryText: {
          color: "#f7ff00"
        }
      };
    case 2:
      // Bad. Listed
      return {
        primaryText: {
          color: "#d2d2d2",
          backgroundColor: "#FF0000"
        },
        secondaryText: {
          color: "#f7ff00"
        }
      };
    case 3:
      // Good. Not listed
      return {
        primaryText: {
          color: "#000000",
          backgroundColor: "#52ff00"
        },
        secondaryText: {
          color: "#ff00ff"
        }
      };
    default:
      // No URL
      return {
        primaryText: {
          color: "#000000",
          backgroundColor: "#a6a6a6"
        },
        secondaryText: {
          color: "#fff"
        }
      };
  }
}