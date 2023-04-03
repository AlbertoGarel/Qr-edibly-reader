import { View, Text } from "react-native";
import LinealbarcodeBuilder from "../components/microComponents/linealBarcodeBuilder";
import React from "react";
import { barcodeFormat } from "../constants/barcodes_values";

const BarcodeBuilder = ({ value, format, layoutData }) => {

  function lessDown(param) {
    if (param.includes("_")) {
      const divide = param.split("_");
      return divide[0] + divide[1];
    } else {
      return param;
    }
  }

  return (
    <View style={{backgroundColor: 'white', paddingHorizontal: 10}}>
      <LinealbarcodeBuilder value={value} format={lessDown(barcodeFormat[format])} layoutData={layoutData}/>
    </View>
  );
};
export default BarcodeBuilder;