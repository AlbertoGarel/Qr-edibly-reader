import Clipboard from "@react-native-clipboard/clipboard";
import { Alert, ImageURISource, Linking, Share, ShareAction, ToastAndroid, Vibration } from "react-native";
import { ONE_SECOND_IN_MS, VIBRATION_PATTERN } from "../constants/expoConstants";
import i18n from "../translate";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { History } from "../store/types";
import { PermissionResponse } from "expo-media-library";
// import * as MediaLibrary from 'expo-media-library';
/**
 *  Set audio next or back
 *
 *  @param isBack: <boolean>
 *
 **/
// async function playSound(isBack: boolean) {
//     const slelected_audio = await isBack ? require('../assets/tones/navigate_back.mp3') : require('../assets/tones/navigate_next.mp3')
//     const {sound} = await Audio.Sound.createAsync(slelected_audio);
//     await sound.playAsync();
// }

/**
 *  Set vibration time.
 *
 *  @param time: <number>
 *
 **/
function simpleVibrated(time: number): void {
  Vibration.vibrate(time * ONE_SECOND_IN_MS);
}

/**
 *  Set content of string type.
 *
 *  @return <string>
 *
 *  @param copyStr: <string>
 *
 **/
async function copyToClipboard(copyStr: string | any): Promise<void> {
  await Clipboard.setString(copyStr);
  showToastWithGravity(i18n.t("contextual.copied_clipboard"));
};

/**
 *  Get content of string type.
 *
 *  @return <string>
 *
 **/
async function fetchCopiedText(): Promise<string> {
  return await Clipboard.getString();
};

/**
 *
 *  Get content of image in base64 string type
 *
 **/
async function _getContent(): Promise<string> {
  return await Clipboard.getImage();
}

/**
 *
 * Return Barcode types names by id
 *
 * @param value: <number> "format code of codebar".
 *
 * @return <string> "name of codebar".
 *
 * */
function barcodeType(value: number | string): string {
  let name_code: string = "";
  switch (value) {
    case 4096:
      name_code = "aztec";
      break;
    case 8:
      name_code = "codabar";
      break;
    case 1:
      name_code = "code128";
      break;
    case 2:
      name_code = "code39";
      break;
    case 4:
      name_code = "code93";
      break;
    case 16:
      name_code = "datamatrix";
      break;
    case 32:
      name_code = "ean13";
      break;
    case 64:
      name_code = "ean8";
      break;
    case 128:
      name_code = "itf14";
      break;
    case 2048:
      name_code = "pdf417";
      break;
    case 256:
      name_code = "qr";
      break;
    case 512:
      name_code = "upc_a";
      break;
    case 1024:
      name_code = "upc_e";
      break;
    default:
      name_code = null;
  }
  return name_code;
}

/**
 *
 * get QR BarcodeValueTypes
 *
 *
 * */
function getBarcodeValuesTypes_qr(objectkey_data: string): string {
  // "data": "WIFI:T:WPA;P:Y8Z6JKTKKMHRWS;S:Lowi0927;H:false;",
  const data: string[] = objectkey_data.split(";");
  let is_type: string = "TEXT";
  if (data.length) {
    const split_text = data[0].split(":")[0];
    is_type = split_text.toLowerCase() === "tel" ? "PHONE" : split_text;
  }
  return is_type;
}

/**
 *
 * Create object data for content view code.
 *
 *
 *
 * */
export const response_object: { content: {}, displayValue: string, format: number, rawValue: string } = {
  "content": {},
  "displayValue": "",
  "format": 0,
  "rawValue": ""
};
/**
 *
 * Error message to send.
 *
 * @return void.
 *
 * */
const error_message = (item: string): void => {
  return Alert.alert(`${i18n.t("contextual.ErrorSendMessage")} ${item}`);
};

/**
 *
 * Link to web, mail, phone. sms
 *
 * @param url: <string> "http(s) URL scheme, mailto, sms, tel".
 *
 * @return void.
 *
 * */
const handler_linking_url = async (url: string): Promise<void> => {
  try {
    const supported: boolean = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      error_message(url);
    }
  } catch (err) {
    if (__DEV__) console.log(err);
  }
};

/**
 *
 * Share text content.
 *
 * @param text: <string> "text data".
 *
 * @return void.
 *
 * */
const shareMessage = async (text: string): Promise<ShareAction> => {
  try {
    return await Share.share({
      message: text
    });
  } catch (err) {
    if (__DEV__) console.log(err);
  }
};

/**
 *
 * Search item in Amazon.
 *
 * @param item: <string> "text data".
 *
 * @return void.
 *
 * */
const sharing_content = async (item: string): Promise<void> => {
  try {
    let extension: string[] = item.split(".");
    const sharing: boolean = await Sharing.isAvailableAsync();
    if (sharing) {
      await Sharing.shareAsync(item, {
        dialogTitle: "image",
        mimeType: `image/${extension[extension.length - 1]}`
      });
    }
  } catch (err) {
    if (__DEV__) console.log("sharing error", err);
  }
};
/**
 *  Show Android toast
 *
 *  @return void
 *
 *  @param message: <string>
 *
 * */
const showToastWithGravity = (message: string): void => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
/**
 *
 *
 *
 * */
const handleSave_image_to_gallery = async (image: string): Promise<void> => {
  let permission_media: PermissionResponse = await MediaLibrary.getPermissionsAsync();
  if (!permission_media.granted) {
    await MediaLibrary.requestPermissionsAsync();
  }

  if (permission_media.granted) {
    await MediaLibrary.saveToLibraryAsync(image);
    showToastWithGravity(i18n.t("contextual.image_saved"));
  }
};

/**
 *  Detect if content is a valid URL.
 *
 *  @return boolean
 *
 *  @param content: <string>
 *
 * */
function isURL(content: string): boolean {
  if (!content) return false;
  let pattern: RegExp | string = new RegExp("^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))|" + // OR ip (v4) address
    "localhost" + // OR localhost
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
  return pattern.test(content);
}

/**
 * Check is number
 *
 * @return boolean
 *
 * @params string
 *
 * */
function isNumber(param: string): boolean {
  let isNum = parseInt(param);
  return !!isNum;
}

/**
 *
 * Check ISBN content, text content, number content and url content.
 *
 * @return JavaScript Object : { typestring: string, typenumber: number }
 *
 * @params content: <string> text | product | book | url
 *
 * */
const check_type_linealbarcode_content = (content: string): { typestring: string, typenumber: number } => {
  let checked: { typestring: string, typenumber: number };
  let isNumber: boolean = !isNaN(+content);

  if (isURL(content)) return { typestring: "url", typenumber: 8 };

  let isbn_prefix = parseInt(content.substring(0, 3));
  if (isbn_prefix < 978 || isbn_prefix > 979 && isNumber) {
    checked = { typestring: "product", typenumber: 5 };
  } else if (isbn_prefix === 978 || isbn_prefix === 979 && isNumber) {
    checked = { typestring: "book", typenumber: 3 };
  } else if (isNumber) {
    checked = { typestring: "product", typenumber: 5 };
  } else {
    checked = { typestring: "text", typenumber: 7 };
  }

  return checked;
};
/**
 *
 * Set if barcode is EAN-8, UPC or EAN-13
 *
 * @return string
 *
 * @params data_type: <string>
 *
 * */
const getType_EAN_13 = (data_type: string): string => {
  const data_type_length: number = data_type.length;
  switch (data_type_length) {
    case 8:
      return "EAN-8";
    case 12:
      return "UPC";
    case 13:
      return "EAN_13";
    default:
      return data_type;
  }
};

/**
 *
 * Change name of file image.
 *
 * @return string
 *
 * @params data_type: <string>
 *
 * */

function changeNameImageFile(imageFilePath: string, toSearch: string): string {
  const pathImage = imageFilePath.split(toSearch);
  return pathImage[0] + "Qr-edibly" + pathImage[1];
}

/**
 *
 * Return string Date and  string hour by separate.
 *
 * @return Object { date: string, hour: string }
 *
 * @params stringdate: new Date()
 *
 * */
function pullApartDateString(stringdate: string): { date: string, hour: string } {
  const pullApart: string[] = stringdate.split(" ");
  return {
    date: `${pullApart[0]} ${pullApart[1]} ${pullApart[2]} ${pullApart[3]}`,
    hour: `${pullApart[4]}`
  };
}

/**
 *
 * Return URL listed state.
 *
 * @return string
 *
 * @params data: number
 *
 * */
function isCheckedUrl(data: number): string {
  switch (data) {
    case 1:
      return i18n.t("generic.notChecked");
    case 2:
      return i18n.t("generic.listed");
    case 3:
      return i18n.t("generic.notListed");
    default:
      return i18n.t("generic.noURL");
  }
}

/**
 *
 * Check content type of codebar
 *
 * @return type of content <number>
 *
 * @params typeCode: string
 *
 * */
function checkTypeContentCodebar(typeCode: string | number): number {
  switch (typeCode) {
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
      // TEXT
      return 7;
    default:
      // UNKNOW
      return 0;
  }

}

/**
 * Group items by selected key and ordered them by selected key for SectionList Data.{title:'', data: ''}
 * items ordered by most recently hour.
 *
 * @return object collection {data, title}
 *
 * @params data: object[], groupedKey: string, orderedKey: string
 *
 * */

function orderedDataSectionList(data: History[], groupedKey: string, orderedKey: string): History[] {
  const grouped: {} = data.reduce((acc, item) => {
    const _date: string = item[groupedKey];
    acc[_date]
      ? acc[_date].data.push(item)
      : acc[_date] = { title: _date, data: [item] };
    // change 'a' and 'b' order for reverse order.
    acc[_date].data.sort((a, b) => b[orderedKey].localeCompare(a[orderedKey]));
    return acc;
  }, {});
  return Object.values(grouped);
};

/**
 *  Alert for user action.
 *
 *  @return void
 *
 *  @params title: string, mssg: string, func: function
 *
 * */
function createTwoButtonAlert(title: string, mssg: string, func: any): void {
  Alert.alert(title, mssg, [
    {
      text: i18n.t("generic.cancel"),
      onPress: () => null,
      style: "cancel"
    },
    { text: "OK", onPress: () => func() }
  ]);
}

/**
 *  return SectionList data filtered by type of content (url, text, product...)
 *
 * @return array collection [{title: string, data: History[]}]
 *
 * @params dataHistory: History[], filterValue: number
 *
 * */
function filterTypeContent(dataHistory: History[], filterValue: number): History[] {
  const filtered_items: History[] = dataHistory.filter(item => item.content.type === filterValue);
  return orderedDataSectionList(filtered_items, "date", "hour");
}

/**
 * Unify sound and vibration effects with action function in one function.
 *
 * @return void
 *
 * @params actionFunction: Function, vibration: boolean, sound: boolean
 *
 * */

function handlerActionAndEffects(actionFunction: Function, vibration: boolean, sound: boolean): void {
  if (vibration) simpleVibrated(.2);
  if (sound) console.log("sound");
  actionFunction();
}


export {
  // playSound,
  simpleVibrated,
  copyToClipboard,
  fetchCopiedText,
  _getContent,
  barcodeType,
  getBarcodeValuesTypes_qr,
  handler_linking_url,
  shareMessage,
  error_message,
  sharing_content,
  showToastWithGravity,
  check_type_linealbarcode_content,
  getType_EAN_13,
  handleSave_image_to_gallery,
  changeNameImageFile,
  pullApartDateString,
  isCheckedUrl,
  isURL,
  isNumber,
  checkTypeContentCodebar,
  orderedDataSectionList,
  createTwoButtonAlert,
  filterTypeContent,
  handlerActionAndEffects
};

const no_qr = [
  {
    "bounds": {
      "origin": {
        "x": 290,
        "y": 1722
      },
      "size": {
        "height": 384,
        "width": 1266
      }
    },
    "cornerPoints": [
      {
        "x": 318,
        "y": 1722
      },
      {
        "x": 1554,
        "y": 1735
      },
      {
        "x": 1556,
        "y": 2106
      },
      {
        "x": 290,
        "y": 2093
      }
    ],
    "data": "7340298805511523",
    "type": 128
  }
];

const qr = [
  {
    "bounds": {
      "origin": {
        "x": 278,
        "y": 1165
      },
      "size": {
        "height": 523,
        "width": 523
      }
    },
    "cornerPoints": [
      {
        "x": 278,
        "y": 1165
      },
      {
        "x": 801,
        "y": 1165
      },
      {
        "x": 800,
        "y": 1687
      },
      {
        "x": 279,
        "y": 1688
      }
    ],
    "data": "WIFI:T:WPA;P:Y8Z6JKTKKMHRWS;S:Lowi0927;H:false;",
    "type": 256
  }
];

const event_qr = [
  {
    "boundingBox": {
      "bottom": 821,
      "left": 134,
      "right": 270,
      "top": 700
    },
    "content": {
      "data": {
        "description": "url contact",
        "end": {
          "day": 27,
          "hours": -1,
          "isUtc": false,
          "minutes": -1,
          "month": 1,
          "rawValue": "20230127",
          "seconds": -1,
          "year": 2023
        },
        "location": "my house",
        "organizer": "",
        "start": {
          "day": 27,
          "hours": -1,
          "isUtc": false,
          "minutes": -1,
          "month": 1,
          "rawValue": "20230127",
          "seconds": -1,
          "year": 2023
        },
        "status": "",
        "summary": "event"
      },
      "type": 11
    },
    "cornerPoints": [
      {
        "x": 134,
        "y": 706
      },
      {
        "x": 262,
        "y": 700
      },
      {
        "x": 270,
        "y": 817
      },
      {
        "x": 148,
        "y": 821
      }
    ],
    "displayValue": "event",
    "format": 256,
    "rawValue": "BEGIN:VEVENT SUMMARY:event LOCATION:my house DTSTART:20230127 DTEND:20230127 DESCRIPTION:url contact END:VEVENT"
  },
  {
    "boundingBox": {
      "bottom": 821,
      "left": 135,
      "right": 271,
      "top": 700
    },
    "content": {
      "data": {
        "description": "url contact",
        "end": {
          "day": 27,
          "hours": -1,
          "isUtc": false,
          "minutes": -1,
          "month": 1,
          "rawValue": "20230127",
          "seconds": -1,
          "year": 2023
        },
        "location": "my house",
        "organizer": "",
        "start": {
          "day": 27,
          "hours": -1,
          "isUtc": false,
          "minutes": -1,
          "month": 1,
          "rawValue": "20230127",
          "seconds": -1,
          "year": 2023
        },
        "status": "",
        "summary": "event"
      },
      "type": 11
    },
    "cornerPoints": [
      {
        "x": 135,
        "y": 706
      },
      {
        "x": 263,
        "y": 700
      },
      {
        "x": 271,
        "y": 816
      },
      {
        "x": 148,
        "y": 821
      }
    ],
    "displayValue": "event",
    "format": 256,
    "rawValue": "BEGIN:VEVENT SUMMARY:evento LOCATION:my house DTSTART:20230127 DTEND:20230127 DESCRIPTION:url contact END:VEVENT"
  }
];
