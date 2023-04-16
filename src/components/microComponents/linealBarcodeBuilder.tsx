import { View, Text, StyleSheet, Image } from "react-native";
import Barcode, { BarcodeProps } from "react-native-barcode-builder";
import { HEIGHT_BREACKPOINT_DEVICES, WINDOW_HEIGHT } from "../../constants/expoConstants";
import BarcodeCreatorViewManager, { BarcodeFormat } from "react-native-barcode-creator";

interface LayoutData {
  height: number,
  width: number,
  x: number,
  y: number
}

interface Props {
  value: string,
  format: any,
  layoutData: LayoutData
}

const LinealbarcodeBuilder = ({ value, format, layoutData }: Props) => {

  return (
    <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
      <BarcodeView value={value} format={format} layoutData={layoutData} />
      <View style={{ backgroundColor: "white" }}>
        <Image source={require("../../assets/images/qredibly_reader_logo_300.png")}
               style={{
                 ...styles.text,
                 resizeMode: "contain",
                 width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 100 : 100 / 2,
                 height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES ? 30 : 30 / 2
               }} />
      </View>
    </View>
  );
};
export default LinealbarcodeBuilder;
const styles = StyleSheet.create({
  text: {
    alignSelf: "center"
  }
});

const BarcodeView = ({ value, format, layoutData }: Props) => {
  switch (true) {
    // for React Native Barcode Creator <BarcodeCreatorViewManager/>
    case format.includes("CODE128"):
    case format.includes("ISBN"):
    case format.includes("EAN13"):
    case format.includes("UPC"):
    case format.includes("ITF14"):
      return (
        <>
          <BarcodeCreatorViewManager
            value={value}
            background={"#FFFFFF"}
            foregroundColor={"#000000"}
            format={BarcodeFormat["CODE128"]}
            style={{
              backgroundColor: "white",
              // marginTop: 20,
              width: layoutData ? layoutData.width : 0,
              height: layoutData ? layoutData.height - 90 : 0
            }}
          />
          <Text style={{ alignSelf: "center" }}>{value}</Text>
        </>
      );
    case format.includes("EAN"):
    case format.includes("CODE39"):
    case format.includes("ITF"):
      return (
        //@ts-ignore flat Property
        <Barcode flat value={value} format={format} text={value}
                 onError={(err) => console.log("error en dibujo code", err)} />
      );
    default:
      // Check QR, CODABAR, pdf417 and others 2d codebars.
      return <Text>NO SE ENCUENTRA</Text>;
  }
};

// NOTES:
// React Native Barcode Creator <BarcodeCreatorViewManager/>
// Component to generate QRCode, Code128, PDF417, AZTEC, EAN13 or UPCA natively for react native
// definitive list : {
//    CODE 128 auto,
//    CODE 128 A,
//    CODE 128 B,
//    CODE 128 C,
//    ISBN,
//    EAN_13,
//    UPC -> all UPC transform to UPCA (create function)
//
// }

// react-native-barcode-builder <Barcode/>
// definitive list : {
//    ITF_14,
//    ITF,
//    EAN_8,
//    CODE_39,
//
// }

// for assign 2d codes {
//    AZTEC,
//    QR,
//    DATAMATRIX,
//    PDF417,
// }

// NO RECOGNIZED LIST {
// all MSI,
// PHARMACODE
// }