import { Image, StyleSheet, Text } from "react-native";
import { HEIGHT_BREACKPOINT_DEVICES, WINDOW_HEIGHT } from "../../constants/expoConstants";
import { styles_sheet } from "../../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";

const Title = () => {
  const { dark, colors } = useTheme();

  return (
    <>
      <Text style={{ color: colors.text, fontFamily: "Sniglet" }}>{i18n.t("generic.poweredBy")}</Text>
      <Image source={
        dark ?
          require("../../assets/images/socialPymes_Imagotipo_light.png")
          :
          require("../../assets/images/socialPymes_Imagotipo_dark.png")
      }
             style={styles.image}
      />
      <Image source={require("../../assets/images/qredibly_reader_logo_300.png")}
             style={{
               resizeMode: "contain",
               width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 300 : 300 / 2,
               height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 67 : 67 / 2,
               backgroundColor: "transparent"
             }} />
    </>
  );
};
export default Title;
const styles = StyleSheet.create({
  title: {
    fontSize: WINDOW_HEIGHT / 20,
    ...styles_sheet.text_shadow
  },
  image: {
    width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 140 : 140 / 1.3,
    height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 30 : 30 / 1.3,
    resizeMode: "contain"
  }
});