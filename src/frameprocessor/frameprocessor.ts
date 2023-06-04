
import * as REA from "react-native-reanimated";
import { Frame, useFrameProcessor } from "react-native-vision-camera";
import { useState } from "react";
import { Barcode, BarcodeFormat, CodeScannerOptions, scanBarcodes, BarcodeValueType } from "vision-camera-code-scanner";
import * as React from "react";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/expoConstants";

export function custom_useScanBarcodes(
  types: BarcodeFormat[],
  options?: CodeScannerOptions
): [(frame: Frame) => void, Barcode[], number, number] {
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const [_frameWidth, setFrameWidth] = React.useState<number>(WINDOW_WIDTH);
  const [_frameHeight, setFrameHeight] = React.useState<number>(WINDOW_HEIGHT);

  const my_frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const detectedBarcodes = scanBarcodes(frame, types, options);
    if (detectedBarcodes.length) {
      REA.runOnJS(setBarcodes)(detectedBarcodes);
      REA.runOnJS(setFrameWidth)(frame.width);
      REA.runOnJS(setFrameHeight)(frame.height);
    }
  }, []);
  return [my_frameProcessor, barcodes, _frameWidth, _frameHeight];
}