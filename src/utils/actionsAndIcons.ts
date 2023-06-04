import { check_type_linealbarcode_content, getType_EAN_13 } from "./utils";
import { ImageSourcePropType } from "react-native";

const drawerActions = {
  lineal_barcodes: {
    product: ['search', 'share', 'copy', 'buy'],
    book: ['book', 'share', 'copy', 'buy'],
    text:  ['search', 'share', 'copy'],
  },
  barcodes_2d: {}
}

const  search_engines: {name: string, url: string}[] = [
  {name: 'Bing', url: 'https://www.bing.com/search?q='},
  {name: 'Google', url: 'https://www.google.com/search?q='},
  {name: 'Qwant', url: 'https://www.qwant.com/?q='},
  {name: 'Yahoo', url: 'https://search.yahoo.com/search?p='},
  {name: 'Baidu', url: 'https://www.baidu.com/s?wd='},
  {name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q='},
  {name: 'Ask', url: 'https://www.ask.com/web?q=gol'},
  {name: 'Yandex', url: 'https://yandex.com/search/?text='},
  {name: 'Ecosia', url: 'https://www.ecosia.org/search?q='},
  {name: 'Aol', url: 'https://search.aol.com/aol/search?q='}
]

function barcodelineal_icon_text_Header(dark: boolean, param: string, data_type: string): {ico: ImageSourcePropType, text: string, type: string, contentType: number} {
  let {typestring, typenumber} = check_type_linealbarcode_content(param);

  let type_lineal_barcode = data_type;
  if (parseInt(data_type) === 32) {
    type_lineal_barcode = getType_EAN_13(data_type);
  }
  switch (typestring) {
    case "text":
      return {
        ico: dark
          ? require("../assets/images/texto_icon_light.png")
          : require("../assets/images/texto_icon_dark.png"),
        text: typestring,
        type: type_lineal_barcode,
        contentType: typenumber
      };
    case "product":
      return {
        ico: dark
          ? require("../assets/images/producto_light.png")
          : require("../assets/images/producto_dark.png"),
        text: typestring,
        type: type_lineal_barcode,
        contentType: typenumber
      };
    case "book":
      return {
        ico: dark
          ? require("../assets/images/book_shop_light.png")
          : require("../assets/images/book_shop_dark.png"),
        text: typestring,
        type: "ISBN",
        contentType: typenumber
      };
    default:
      return {
        ico: dark
          ? require("../assets/images/unknow_icon_light.png")
          : require("../assets/images/unknow_icon_dark.png"),
        text: typestring,
        type: "Unknow",
        contentType: -1
      };
  }
}

export {
  drawerActions,
  barcodelineal_icon_text_Header,
  search_engines
}