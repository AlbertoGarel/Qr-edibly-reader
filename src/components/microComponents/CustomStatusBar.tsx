import { View } from "react-native";
import { STATUSBAR_HEIGHT } from "../../constants/expoConstants";
import { StatusBar } from "expo-status-bar";


const CustomStatusBar = () => {
  return (
    <View style={{ height: STATUSBAR_HEIGHT }}>
      <StatusBar />
    </View>
  );
};
export default CustomStatusBar;