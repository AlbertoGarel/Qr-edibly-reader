import * as React from "react";
import { useEffect } from "react";
import { Animated, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AppState, History } from "../store/types";
import { addUser } from "../store/user-list/actions";
import { Dispatch } from "redux";
import { ADMOB_BANNER_HEIGHT, WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/expoConstants";
import { useTheme } from "@react-navigation/native";
import { barcodeFormat, BarcodeValueTypes } from "../constants/barcodes_values";
import LinealBarcodesElement from "../components/LinealBarcodesElement";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  copyToClipboard,
  handler_linking_url, isURL, pullApartDateString,
  shareMessage
} from "../utils/utils";
import { barcodelineal_icon_text_Header, drawerActions } from "../utils/actionsAndIcons";
import uuid from "react-native-uuid";
import { addHistory } from "../store/history/actions";
import { amazon_locale_URL } from "../utils/amazonURL";
import i18n from "../translate";
import * as Localization from "expo-localization";

const CodeScreen = ({ route }) => {
  const headerHeight = useHeaderHeight();
  const { dark, colors } = useTheme();
  const finderWidth: number = WINDOW_WIDTH - (WINDOW_WIDTH / 6);
  const finderHeight: number = WINDOW_HEIGHT / 2;
  const zoomAnim = React.useRef(new Animated.Value(0)).current;
  const create_id = uuid.v4();
  const date = pullApartDateString(new Date().toString());

  const barcode_actions_icons: Barcode_action_icons = {
    web: {
      dark_icon: require("../assets/images/search-globe-internet_dark.png"),
      light_icon: require("../assets/images/search-globe-internet_light.png")
      // func: () => handler_linking_url("https://www.qwant.com/?q=" + route.params.code[0].rawValue)
    },
    search: {
      dark_icon: require("../assets/images/busqueda_web_dark.png"),
      light_icon: require("../assets/images/busqueda_web_light.png")
    },
    share: {
      dark_icon: require("../assets/images/share_dark.png"),
      light_icon: require("../assets/images/share_light.png"),
      func: () => shareMessage(route.params.code[0].rawValue)
    },
    copy: {
      dark_icon: require("../assets/images/copy_dark.png"),
      light_icon: require("../assets/images/copy_light.png"),
      func: () => copyToClipboard(route.params.code[0].rawValue)
    },
    buy: {
      dark_icon: require("../assets/images/buy_dark.png"),
      light_icon: require("../assets/images/buy_light.png"),
      func: () => handler_linking_url(`https://${amazon_locale_URL[Localization.region]}/s?k=` + route.params.code[0].rawValue)
    },
    book: {
      dark_icon: require("../assets/images/search_book_dark.png"),
      light_icon: require("../assets/images/search_book_light.png"),
      func: () => handler_linking_url("https://www.google.es/search?q=" + route.params.code[0].rawValue)
    },
    email: {
      dark_icon: require("../assets/images/email_dark.png"),
      light_icon: require("../assets/images/email_light.png"),
      func: () => console.log("icon_darwer email")
    },
    phone: {
      dark_icon: require("../assets/images/phone_dark.png"),
      light_icon: require("../assets/images/phone_light.png"),
      func: () => handler_linking_url("tel:" + route.params.code[0].rawValue)
    },
    map: {
      dark_icon: require("../assets/images/map_dark.png"),
      light_icon: require("../assets/images/map_dark.png"),
      func: () => console.log("icon_darwer map")
    },
    add_contact: {
      dark_icon: require("../assets/images/contact_dark.png"),
      light_icon: require("../assets/images/contact_light.png"),
      func: () => console.log("icon_darwer contact")
    }
  };

  function identify_code(data) {
    const data_type: string = barcodeFormat[data.format];
    const data_value_type: string = BarcodeValueTypes[data.content.type].toLowerCase();

    let drawer_ico: Barcode_action_icons = barcode_actions_icons;

    const redux_element: History = {
      id: data.rawValue,
      content: {
        type: data.content.type
      },
      rawValue: data.rawValue,
      format: data.format,
      favourite: false,
      listed: +isURL(data.rawValue),
      name: barcodeFormat[data.format],
      codetype: barcodeFormat[data.format],
      date: date.date,
      hour: date.hour
    };

    // TO OPTIMIZE AND COMPLETE
    switch (data_type) {
      case "UNKNOWN" || -1:
        console.log("UNKNOWN");
        break;
      case "ALL_FORMATS" || 0:
        console.log("ALL_FORMATS");
        alert("código de barras");
        break;
      // Bidimensional barcodes
      case "QR_CODE" || 256:
        console.log("QR_CODE");
        break;
      case "DATA_MATRIX" || 16:
        return <LinealBarcodesElement image={route.params.imageData}
                                      data={{
                                        type: data_type,
                                        text: data_value_type,
                                        icon: barcodelineal_icon_text_Header(dark, route.params.code[0].rawValue, data_type).ico,
                                        code: route.params.code,
                                        drawicons: [drawer_ico.web, drawer_ico.share, drawer_ico.copy]
                                      }}
                                      redux_element={redux_element}
        />;
      case "PDF417" || 2048:
        console.log("PDF417");
        break;
      case "AZTEC" || 4096:
        console.log("AZTEC");
        alert("AZTEC");
        break;
      // lineal barcodes
      case "EAN_13" || 32:
      case "CODE_128" || 1:
      case "CODE_39" || 2:
      case "CODE_93" || 4:
      case "CODABAR" || 8:
      case "EAN_8" || 64:
      case "ITF" || 128:
      case "UPC_A" || 512:
      case "UPC_E" || 1024:
        const text_ico = barcodelineal_icon_text_Header(dark, route.params.code[0].rawValue, data_type);
        const action_icons = drawerActions.lineal_barcodes[text_ico.text];
        return <LinealBarcodesElement image={route.params.imageData}
                                      data={{
                                        type: text_ico.type,
                                        text: text_ico.text,
                                        icon: text_ico.ico,
                                        code: route.params.code,
                                        drawicons: action_icons.map(i => drawer_ico[i])
                                      }}
                                      redux_element={{
                                        ...redux_element,
                                        content: {...redux_element.content , type: text_ico.contentType},
                                      }}
        />;
      default:
        //CREATE USER INFO COMPONENT
        alert("OOOOOPPPS....!!!, algo ha ido mal");
    }

    const code_data = {};
    const code_format = (typeof data.format) === "string" ? data.format : barcodeFormat[data.format];

    // Add property to object
    code_data["format"] = code_format;
    code_data["content"] = data.content;

    if (code_format === "QR_CODE") {
      const type_qr = data.content.type;
      // Add property to object
      code_data["type_qr"] = typeof type_qr === "string" ? type_qr : BarcodeValueTypes[type_qr];
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.border }}>
      <ScrollView style={{ backgroundColor: colors.card }}>
        {identify_code(route.params.code[0])}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: state.userList
});
const mapDipatchToProps = (dispatch: Dispatch) => ({
  onAddHistory: (history: History) => {
    dispatch(addHistory(history));
  }
  // other callbacks go here...
});

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(CodeScreen);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#1B97F3"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white"
  }
});

// TO DELETE WHEN END JOB:

// const response_object = [
//   {
//     "boundingBox": {
//       "bottom": 851,
//       "left": 194,
//       "right": 614,
//       "top": 469
//     },
//     "content": {
//       "data": {
//         "title": "",
//         "url": "https://socialpymesvlc.es/"
//       },
//       "type": 8
//     },
//     "cornerPoints": [
//       {
//         "x": 194,
//         "y": 469
//       },
//       {
//         "x": 614,
//         "y": 479
//       },
//       {
//         "x": 576,
//         "y": 851
//       },
//       {
//         "x": 207,
//         "y": 837
//       }
//     ],
//     "displayValue": "https://socialpymesvlc.es/",
//     "format": 256,
//     "rawValue": "https://socialpymesvlc.es/"
//   }
// ];


{/*<Pressable style={styles.button} onPress={() => onAddUser('Antonio', 'Gutierrez', 50)}>*/
}
{/*    <Text style={styles.text}>Press to add</Text>*/
}
{/*</Pressable >*/
}
{/*    {*/
}
{/*        users ?*/
}
{/*            users.map((i, index) => {*/
}
{/*                return <Text key={index}>{i.name}</Text>*/
}
{/*            })*/
}
{/*            :*/
}
{/*            <Text>no hay personas</Text>*/
}