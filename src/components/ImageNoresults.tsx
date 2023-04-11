import { View, Image, StyleSheet, Text, ImageURISource } from "react-native";
import { WINDOW_WIDTH } from "../constants/expoConstants";
import React from "react";
import { useTheme } from "@react-navigation/native";

interface ImageNoResultsProps {
  text: string
  image: ImageURISource | ImageURISource[]
}

const ImageNoResults = ({ text, image }: ImageNoResultsProps) => {
  const { colors } = useTheme();
  return (
    <View style={{ justifyContent: "center", alignSelf: "center", flex: 1 }}>
      <Text style={{ ...styles.text, color: colors.text }}>
        {text}
      </Text>
      <Image source={image}
             style={styles.image}
      />
    </View>
  );
};
export default ImageNoResults;
const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
    fontFamily: "Sniglet",
    textAlign: "center"
  },
  image: {
    width: WINDOW_WIDTH / 2,
    height: WINDOW_WIDTH / 2,
    resizeMode: "contain",
    alignSelf: "center"
  }
});