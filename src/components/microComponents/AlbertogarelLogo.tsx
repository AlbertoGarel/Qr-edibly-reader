import { View, Text, Image } from "react-native";

type Props = {
  textColor: string
}

const AlbertogarelLogo = ({ textColor }: Props) => {

  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
    }}>
      <Text style={{ color: textColor, fontFamily: "Sniglet" }}>#Albertogarel</Text>
      <Image source={require("../../assets/images/Logo_AlbertoGarel.png")} style={{ width: 30, height: 30 }} />
    </View>
  );
};
export default AlbertogarelLogo;