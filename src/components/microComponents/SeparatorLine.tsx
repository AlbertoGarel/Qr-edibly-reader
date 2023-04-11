import { View, ViewStyle } from "react-native";

interface SeparatorlineProp {
  styles: ViewStyle
}

export const Separatorline = ({ styles }: SeparatorlineProp) => <View style={styles} />;