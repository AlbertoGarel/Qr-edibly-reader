import Clipboard from "@react-native-clipboard/clipboard";
import { Vibration } from "react-native";
import { ONE_SECOND_IN_MS } from "../constants/expoConstants";

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
function simpleVibrated(time: number) {
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
async function copyToClipboard(copyStr: string) {
  Clipboard.setString(copyStr);
};

/**
 *  Get content of string type.
 *
 *  @return <string>
 *
 **/
async function fetchCopiedText() {
  return await Clipboard.getString();
};

/**
 *
 *  Get content of image in base64 string type
 *
 **/
async function _getContent() {
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
function barcodeType(value) {
  let name_code = "";
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
function getBarcodeValuesTypes_qr(objectkey_data) {
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
 * */
export const response_object: { content: {}, displayValue: string, format: number, rawValue: string } = {
  "content": {},
  "displayValue": "",
  "format": 0,
  "rawValue": ""
};


export {
  // playSound,
  simpleVibrated,
  copyToClipboard,
  fetchCopiedText,
  _getContent,
  barcodeType,
  getBarcodeValuesTypes_qr
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
