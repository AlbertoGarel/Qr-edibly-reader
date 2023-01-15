import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const RNpicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
      <Text>esto es picker</Text>
      <Picker
        mode={"dialog"}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};
export default RNpicker;