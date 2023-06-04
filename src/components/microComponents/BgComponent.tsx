import React from "react";
import { View, StyleSheet, ImageURISource, ViewStyle } from "react-native";
import SvgComponent from "./SvgComponent";

interface BgComponentProps {
  svgOptions: { svgData: ImageURISource | ImageURISource[]; svgWidth: number; svgHeight: number; color?: string; }
  styleOptions: ViewStyle
}

const BgComponent = ({ svgOptions, styleOptions }: BgComponentProps) => {

  return (
    <View style={[styles.absolut, { ...styleOptions }]}>
      <SvgComponent
        {...svgOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  absolut: {
    // position: "absolute"
  }
});

export default BgComponent;