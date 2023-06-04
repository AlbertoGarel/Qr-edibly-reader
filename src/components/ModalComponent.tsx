import { StyleSheet, View, Text, Image, TouchableHighlight, ImageURISource } from "react-native";
import { styles_sheet } from "../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import { WINDOW_WIDTH } from "../constants/expoConstants";

interface Props {
  handlePress: () => void
  title: string
  text: string
  image: ImageURISource | ImageURISource[] | null
}

const ModalComponent = ({ handlePress, title, text, image }: Props) => {
  const { colors } = useTheme();
  const image_dimensions = WINDOW_WIDTH / 2;

  return (
    <TouchableHighlight onPress={handlePress}
                        style={{ ...styles.parentModal, ...styles_sheet.centerCenter }}>
      <View style={{
        ...styles.contentView,
        ...styles_sheet.centerCenter,
        backgroundColor: colors.background,
        borderColor: colors.border
      }}>
        <Text style={{
          ...styles.text,
          ...styles_sheet.firstText,
          color: colors.text
        }}>
          {title}
        </Text>
        {image && <Image source={image} style={{
          ...styles.image,
          width: image_dimensions,
          height: image_dimensions
        }} />}
        <Text style={{
          ...styles.text,
          color: colors.text
        }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
export default ModalComponent;
const styles = StyleSheet.create({
  parentModal: {
    zIndex: 99999,
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#00000090"
  },
  contentView: {
    width: "90%",
    height: "90%",
    borderWidth: 2
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20
  },
  image: {
    resizeMode: "cover"
  }
});