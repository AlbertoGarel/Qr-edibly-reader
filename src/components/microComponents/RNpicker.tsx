import { View, Text, Image, ImageURISource } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";

interface RNpickerProp {
  dataPickers: any
  icon: ImageURISource | ImageURISource[]
  data: string | number
  handler: (itemValue: string) => void
}

const RNpicker = ({ dataPickers, icon, data, handler }: RNpickerProp) => {
  const { dark, colors } = useTheme();
  return (
    <View>
      <Image source={icon} style={{
        resizeMode: "contain",
        width: 30,
        height: 30
      }} />
      <Picker
        dropdownIconColor={colors.card}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        mode={"dialog"}
        onValueChange={(itemValue, itemIndex) =>
          handler(`${itemValue}${data}`)
        }>
        <Picker.Item label={i18n.t("contextual.engines_dialog")} value={null} enabled={false}
                     color={colors.background} />
        {
          dataPickers.map((item, idx) => {
            return <Picker.Item key={idx} label={item.name} value={item.url} />;
          })
        }
      </Picker>
    </View>
  );
};
export default RNpicker;