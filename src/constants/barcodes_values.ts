export enum BarcodeValueTypes {
  UNKNOWN = 0,
  CONTACT_INFO = 1, // [] ** no recognize from image  **
  EMAIL = 2,//mailto: ?subjet= &body= +=> whitespace
  ISBN = 3,  // if data.length is 13 and type 32
  PHONE = 4, //  "tel:66666666"
  PRODUCT = 5, // no qr code
  SMS = 6, //  "sms:666666666?body=mensaje de texto sms"
  TEXT = 7, // "esto es un texto"
  URL = 8, //  "http://albertogarel.com"
  WIFI = 9, // "WIFI:T:WPA;P:Y8Z6JKTKKMHRWS;S:Lowi0927;H:false;"
  GEO = 10, //  "geo:653897.0,6549494.0?q=consulta" latitud=>longitud=>texto
  CALENDAR_EVENT = 11, // [] ** no recognize from image  ** . barcode scanner response is Array 2 length. get first.
  DRIVER_LICENSE = 12  // unknow
}

export enum barcodeFormat {
  UNKNOWN = -1,
  ALL_FORMATS = 0,
  CODE_128 = 1,
  CODE_39 = 2,
  CODE_93 = 4,
  CODABAR = 8,
  DATA_MATRIX = 16,
  EAN_13 = 32,
  EAN_8 = 64,
  ITF = 128,
  QR_CODE = 256,
  UPC_A = 512,
  UPC_E = 1024,
  PDF417 = 2048,
  AZTEC = 4096,
}

export enum BarcodeAddressType {
  UNKNOW = 0, WORK = 1, HOME = 2, FAX = 3, MOBILE = 4
}