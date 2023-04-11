import { View, Text, Image, ImageURISource, ImageStyle } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import i18n from "../../translate";

const PICKER_ITEMS = [
  { ALL: 0 },
  { CONTACT_INFO: 1 }, // [] ** no recognize from image  **
  { EMAIL: 2 },//mailto: ?subjet= &body= +=> whitespace
  { ISBN: 3 },  // if data.length is 13 and type 32
  { PHONE: 4 }, //  "tel:66666666"
  { PRODUCT: 5 }, // no qr code
  { SMS: 6 }, //  "sms:666666666?body=mensaje de texto sms"
  { TEXT: 7 }, // "esto es un texto"
  { URL: 8 }, //  "http://albertogarel.com"
  { WIFI: 9 }, // "WIFI:T:WPA;P:Y8Z6JKTKKMHRWS;S:Lowi0927;H:false;"
  { GEO: 10 }, //  "geo:653897.0,6549494.0?q=consulta" latitud=>longitud=>texto
  { CALENDAR_EVENT: 11 }, // [] ** no recognize from image  ** . barcode scanner response is Array 2 length. get first.
  { DRIVER_LICENSE: 12 }  // unknow
];

interface RNpickerProp {
  icon: ImageURISource | ImageURISource[]
  styleIcon: ImageStyle
  handlerFilter: (itemValue: number) => void
}

const RNpickerCodeTypes = ({ icon, styleIcon, handlerFilter }: RNpickerProp) => {
  const { dark, colors } = useTheme();

  return (
    <View>
      <Image source={icon} style={{
        resizeMode: "contain",
        ...styleIcon
      }} />
      <Picker
        dropdownIconColor={colors.card}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        mode={"dialog"}
        onValueChange={(itemValue: number) =>
          handlerFilter(itemValue)
        }>
        <Picker.Item label={i18n.t("contextual.engines_dialog")} value={null} enabled={false}
                     color={colors.background} />
        {
          PICKER_ITEMS.map((item, idx) => {
            return <Picker.Item key={idx} label={i18n.t(`generic.${Object.keys(item)[0]}`)}
                                value={Object.values(item)[0]} />;
          })
        }
      </Picker>
    </View>
  );
};
export default RNpickerCodeTypes;