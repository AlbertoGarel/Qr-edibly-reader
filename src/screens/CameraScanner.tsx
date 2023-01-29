// import 'react-native-reanimated';
import { useIsFocused, useTheme } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraDevices, useFrameProcessor } from "react-native-vision-camera";
import { Polygon, Svg } from "react-native-svg";
import BarcodeMask, { LayoutChangeEvent } from "react-native-barcode-mask";
import {
  Barcode,
  BarcodeFormat,
  Point,
  scanBarcodes,
  CodeScannerOptions,
  BarcodeValueType
} from "vision-camera-code-scanner";
import { DEVICE_PIXEL_RATIO, WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/expoConstants";
import { custom_useScanBarcodes } from "../frameprocessor/frameprocessor";
import { padding, styles_sheet } from "../constants/styles_sheet";
import TouchableOpacityicon from "../components/TouchableOpacityIcon";
import Slider from "@react-native-community/slider";
import { connect } from "react-redux";
import { AppState } from "../store/types";
import PermissionView from "../components/PermissionView";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner, BarCodeScannerResult, Constants } from "expo-barcode-scanner";
import { ImagePickerResult } from "expo-image-picker";
import { getBarcodeValuesTypes_qr, response_object } from "../utils/utils";
import { BarcodeValueTypes } from "../constants/barcodes_values";


const CameraScanner = ({ navigation, camera_position }) => {
  // @ts-ignore
  const { name, dark, colors } = useTheme();
  let slider = React.useRef(null);
  let isFocused = useIsFocused();
  const [cameraPosition, setCameraPosition] = React.useState<"front" | "back">(camera_position);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  const [hasPermission, setHasPermission] = React.useState<string>("not-determined");
  const camera = React.useRef<Camera>(null);
  let [my_frameProcessor, barcodes, _frameWidth, _frameHeight] = custom_useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    { checkInverted: true }
  );

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setHasPermission);
  }, []);

  const width: number = WINDOW_WIDTH;
  const height: number = WINDOW_HEIGHT;
  const finderWidth: number = width - (width / 6);
  const finderHeight: number = height / 2;
  const viewMinX: number = (width - finderWidth) / 2;
  const viewMinY: number = (height - finderHeight) / 2;
  const [changeColor, getColor] = React.useState<string>(colors.text);
  const [mask, getMask] = React.useState<object>({});
  const [torch_enable, setTorchEnable] = React.useState<"off" | "on">("off");
  const [sliderValue, setSlidervalue] = React.useState<number>(1);

  const [barcode_result, setBarcode] = React.useState<Barcode[]>([]);
  React.useEffect((): () => void => {
    let is_Mounted = true;

    if (isFocused && is_Mounted) setBarcode([]);
    if (isFocused) getColor(colors.text);

    return () => is_Mounted = false;
  }, [isFocused]);

  React.useEffect((): () => void => {
    let is_Mounted = true;

    if (is_Mounted) setBarcode(barcodes);

    return () => is_Mounted = false;
  }, [barcodes]);

  React.useEffect(() => {
    const fisic_resolution = {
      fisic_resolution_width: width * DEVICE_PIXEL_RATIO,
      fisic_resolution_height: height * DEVICE_PIXEL_RATIO,
      fisic_resolution_finderWidth: finderWidth * DEVICE_PIXEL_RATIO,
      fisic_resolution_finderHeight: finderHeight * DEVICE_PIXEL_RATIO
    };
    if (barcode_result.length && isFocused) {
      const cornerPoints: Point[] = barcode_result[0].cornerPoints;
      let lx_min: number = (fisic_resolution.fisic_resolution_width - fisic_resolution.fisic_resolution_finderWidth) / 2;
      let lx_max: number = (fisic_resolution.fisic_resolution_width - (fisic_resolution.fisic_resolution_finderWidth / 2));
      let lty_min: number = ((fisic_resolution.fisic_resolution_height - (fisic_resolution.fisic_resolution_finderHeight)) / 4) + 30;
      let lty_max: number = ((fisic_resolution.fisic_resolution_height - lty_min) / 2) + 30;

      if (
        (cornerPoints[0].x >= lx_min) && (cornerPoints[1].x <= lx_max)
        &&
        (cornerPoints[1].y >= lty_min) && (cornerPoints[2].y <= lty_max)
      ) {
        getColor("#7CFC00");
        onQRCodeDetected(barcode_result)
          .then(response => {
            navigation.navigate("prueba", {
              code: barcode_result,
              imageData: response
            });
          })
          .catch(err => console.log(err));

      } else {
        getColor(colors.text);
        //change color stroke
      }
    }

  }, [barcodes]);

  const onQRCodeDetected = useCallback(async (code: {}) => {
    try {
      // return await camera.current.takePhoto({
      //   flash: "off",
      //   enableAutoStabilization: true,
      //   qualityPrioritization: 'speed',
      //   skipMetadata: true
      // })
      return await camera.current.takeSnapshot({
        quality: 100,
        skipMetadata: true
      });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getPointsData = (lr): string => {
    let get_PointsData = lr.cornerPoints;
    let pointsData = get_PointsData[0].x + "," + get_PointsData[0].y + " ";
    pointsData = pointsData + get_PointsData[1].x + "," + get_PointsData[1].y + " ";
    pointsData = pointsData + get_PointsData[2].x + "," + get_PointsData[2].y + " ";
    pointsData = pointsData + get_PointsData[3].x + "," + get_PointsData[3].y + " ";

    return pointsData;
  };

  const getViewBox = (): string => {
    const frameSize = getFrameSize();
    return "0 0 " + frameSize[0] + " " + frameSize[1];
  };

  const getFrameSize = (): any => {
    let width, height;
    if (Platform.OS === "android") {
      if (_frameWidth > _frameHeight && Dimensions.get("window").width > Dimensions.get("window").height) {
        width = _frameWidth;
        height = _frameHeight;
      } else {
        // console.log("Has rotation");
        width = _frameHeight;
        height = _frameWidth;
      }
    } else {
      width = _frameWidth;
      height = _frameHeight;
    }
    return [width, height];
  };

  function handler_onLayoutMeasured(e: LayoutChangeEvent) {
    const { width, height, x, y } = e.nativeEvent.layout;
    getMask({ width, height, x, y });
  }

  const onFlipCameraPressed = useCallback((): void => {
    setCameraPosition((p) => (p === "back" ? "front" : "back"));
  }, []);

  const onTorchPressed = useCallback((): void => {
    setTorchEnable((f) => (f === "off" ? "on" : "off"));
  }, []);

  function torch_maxim_gradual() {
    let sum_to_max = sliderValue + .2;
    if (sum_to_max >= 2) {
      setSlidervalue(1);
    } else {
      setSlidervalue(sum_to_max);
    }
  }

  // IMAGE PICKER
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    try {
      /*                BarcodeReader expo          */
      console.log("hsh map", BarCodeScanner.Constants.BarCodeType);

      let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
      });
      const data_image: BarCodeScannerResult[] = await BarCodeScanner.scanFromURLAsync(result["uri"],
        [
          BarCodeScanner.Constants.BarCodeType.qr,
          BarCodeScanner.Constants.BarCodeType.aztec,
          BarCodeScanner.Constants.BarCodeType.codabar,
          BarCodeScanner.Constants.BarCodeType.code39,
          BarCodeScanner.Constants.BarCodeType.code93,
          BarCodeScanner.Constants.BarCodeType.code128,
          // BarCodeScanner.Constants.BarCodeType.code39mod43, // no compatible?
          BarCodeScanner.Constants.BarCodeType.datamatrix,
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
          // BarCodeScanner.Constants.BarCodeType.interleaved2of5, // no compatible?
          BarCodeScanner.Constants.BarCodeType.itf14,
          // BarCodeScanner.Constants.BarCodeType.maxicode, // no compatible?
          BarCodeScanner.Constants.BarCodeType.pdf417,
          // BarCodeScanner.Constants.BarCodeType.rss14, // no compatible?
          // BarCodeScanner.Constants.BarCodeType.rssexpanded, // no compatible?
          BarCodeScanner.Constants.BarCodeType.upc_a,
          BarCodeScanner.Constants.BarCodeType.upc_e
          // BarCodeScanner.Constants.BarCodeType.upc_ean // no compatible?
        ]
      );
      console.log("read qr code", data_image);
      // RESPONSE IS [] (no recognize) notify success and exit.
      if (!data_image.length) {
        // add pill notify.
        console.log("NO SE RECONOCE BARCODE");
        return;
      }
      // BARCODE 'EVENT' CONTAIN SAMES TWO JAVASCRIPT OBJECTS. GET ONE OF THESE..
      const data_barcode: BarCodeScannerResult | BarCodeScannerResult[] = data_image.length >= 2 ? data_image[0] : data_image;
      const container_data_for_send = { ...response_object };
      container_data_for_send.format = data_barcode[0].type;
      if (data_barcode[0].type === 256) {
        // is QR code
        const substract_type_qr: string = getBarcodeValuesTypes_qr(data_barcode[0].data);
        const type_qr = BarcodeValueTypes.filter(item => Object.keys(item)[0] === substract_type_qr.toUpperCase());
        container_data_for_send.content = { type: Object.values(type_qr).length ? Object.values(type_qr[0])[0] : 7 };
      }
      //when type... switch() and select decode data;
      //code here.

      //
      container_data_for_send.displayValue = data_barcode[0].data;
      container_data_for_send.rawValue = data_barcode[0].data;

      console.log("container_data_for_send[0].format", container_data_for_send);
    } catch (err) {
      console.log("error reading image code", err);
    }
  };


  if (hasPermission !== "authorized") {
    return <PermissionView requestPermission={setHasPermission} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {device != null &&
      hasPermission && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isFocused}
            frameProcessor={my_frameProcessor}
            frameProcessorFps={5}
            zoom={sliderValue}
            photo={true}
            orientation="portrait"
            torch={torch_enable}
          />
          {barcode_result.map((barcode, idx) => (
            <Text key={idx} style={styles.barcodeText}>
              {"type: " + barcode.content.type + " data: " + barcode.content.data}
            </Text>
          ))}
          <BarcodeMask
            backgroundColor={colors.background}
            width={finderWidth}
            height={finderHeight}
            edgeColor={changeColor}
            showAnimatedLine
            useNativeDriver={true}
            onLayoutMeasured={handler_onLayoutMeasured}
            animatedLineColor={colors.card}
          />
          <View style={[styles_sheet.flexColumn, {
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            paddingVertical: padding * 2
          }]}>
            <View style={[styles_sheet.centerCenter, {
              width: "100%",
              height: 50,
              zIndex: 1,
              flexDirection: "row"
            }]}>
              <TouchableOpacityicon image_height={40}
                                    image_width={40}
                                    margin={padding}
                // _onPress={() => alert("gallery")}
                                    _onPress={pickImage}
                                    src_image={dark || name !== "light_theme" ?
                                      require("../assets/images/gallery_light.png")
                                      :
                                      require("../assets/images/gallery_dark.png")
                                    }
              />
              <TouchableOpacityicon image_width={40}
                                    margin={padding}
                                    _onPress={onTorchPressed}
                                    src_image={torch_enable === "off" ?
                                      dark || name !== "light_theme" ? require("../assets/images/no_flash_light.png") : require("../assets/images/no_flash_dark.png")
                                      :
                                      dark || name !== "light_theme" ? require("../assets/images/flash_light.png") : require("../assets/images/flash_dark.png")
                                    }
                                    image_height={40}
              />
              <TouchableOpacityicon image_height={40}
                                    image_width={40}
                                    margin={padding}
                                    _onPress={onFlipCameraPressed}
                                    src_image={dark || name !== "light_theme" ?
                                      require("../assets/images/flip_light.png")
                                      :
                                      require("../assets/images/flip_dark.png")
                                    }
              />
            </View>
            <View style={[styles_sheet.centerCenter, {
              width: "100%",
              height: 50,
              flexDirection: "row",
              zIndex: 1,
              paddingHorizontal: padding
              // backgroundColor: "blue"
            }]}>
              <TouchableOpacityicon image_height={40}
                                    image_width={40}
                                    margin={padding}
                                    _onPress={torch_maxim_gradual}
                                    src_image={dark || name !== "light_theme" ?
                                      require("../assets/images/lupa_plus_light.png")
                                      :
                                      require("../assets/images/lupa_plus_dark.png")
                                    }
              />
              <Slider
                ref={slider}
                style={{ flex: 4, height: 40 }}
                minimumValue={1}
                maximumValue={2}
                thumbTintColor={dark || name !== "light_theme" ? colors.card : "#5e5e5e"}
                minimumTrackTintColor={colors.border}
                maximumTrackTintColor={colors.text}
                onValueChange={value => setSlidervalue(value)}
                value={sliderValue}
                tapToSeek={false}
              />
            </View>
          </View>
        </>)}
      <Svg style={[StyleSheet.absoluteFill]}
           viewBox={getViewBox()}
           preserveAspectRatio="xMidYMid slice">
        {/*<Polygon*/}
        {/*  points={`89.99999999999994,303 630,303 630,973 89.99999999999994,973`}*/}
        {/*  fill="lime"*/}
        {/*  stroke="green"*/}
        {/*  opacity="0.5"*/}
        {/*  strokeWidth="1"*/}
        {/*/>*/}
        {device != null && barcode_result.map((barcode, idx) => (
          <Polygon key={idx}
                   points={getPointsData(barcode)}
                   fill="lime"
                   stroke="green"
                   opacity="0.5"
                   strokeWidth="1"
          />
        ))}
      </Svg>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  camera_position: state.usedSettings[0].camera
});

export default connect(
  mapStateToProps
)(CameraScanner);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  barcodeText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  }
});
