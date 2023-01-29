import { StyleSheet, View, Text, Image, Button } from "react-native";
import React from "react";
import { medium_fontSize, padding, styles_sheet } from "../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import i18n from "../translate";
import Albertogarellogo from "./albertogarelLogo";
import { Camera } from "react-native-vision-camera";

type Props = {
  requestPermission: any
};

const PermissionView = ({ requestPermission }: Props) => {
  const { dark, colors } = useTheme();

  async function request_permission() {
    try {
      const has_permission = await Camera.requestCameraPermission();
      alert(has_permission);
      requestPermission(has_permission);
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  return (
    <View style={{ ...styles_sheet.centerCenter, padding: padding, flex: 1, backgroundColor: colors.background }}>
      <View style={{ position: "absolute", top: 10, right: 10 }}>
        <Image source={
          dark ?
            require("../assets/images/socialPymes_Imagotipo_blanco.png")
            :
            require("../assets/images/logo_social_colores.png")
        }
               resizeMode={"contain"}
               style={styles.logoimage}
        />
      </View>
      <Image source={require("../assets/images/bell.png")}
             style={{ ...styles.image }}
             resizeMode={"contain"} />
      <Text style={{ ...styles.text, color: colors.text }}>{i18n.t("contextual.text_permission_camera")}</Text>
      <Button onPress={request_permission} title={i18n.t("contextual.grant_permission")}
              color={colors.primary} />
      <View style={{ position: "absolute", bottom: 10, left: 10 }}>
        <Albertogarellogo textColor={colors.text} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: padding * 3
  },
  text: {
    fontFamily: "Sniglet",
    fontSize: medium_fontSize + 5,
    marginBottom: padding * 3,
    textAlign: "center"
  },
  logoimage: {
    width: 150,
    height: 50
  }
});
export default PermissionView;