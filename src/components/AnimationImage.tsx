import { StyleSheet, View, Image, Animated, LayoutRectangle } from "react-native";
import { padding, styles_sheet } from "../constants/styles_sheet";
import * as React from "react";
import { QR_LAYOUT, WINDOW_WIDTH } from "../constants/expoConstants";
import { useTheme } from "@react-navigation/native";
import TouchableOpacityicon from "../components/microComponents/TouchableOpacityIcon";
import { handleSave_image_to_gallery, sharing_content, showToastWithGravity } from "../utils/utils";
import ModalViewImage from "../components/microComponents/ModalViewImage";
// import BarcodeCreatorViewManager, { BarcodeFormat } from "react-native-barcode-creator";
import ViewShot from "react-native-view-shot";
import i18n from "../translate";
import { connect } from "react-redux";
import { AppState } from "@App/store/types";
import BarcodeBuilder from "../components/BarcodeBuilder";
import { History } from "../store/types";

const square_face_big = WINDOW_WIDTH * .50;
const square_face_small = WINDOW_WIDTH * .20;

interface ImageProps {
  height: number,
  isRawPhoto: boolean,
  metadata: null,
  path: string,
  width: number,

}

type Props = {
  image: any,
  element_id: string | number[],
  favourite: object[],
  bookmark: boolean,
  setBookmark: (state: boolean) => void
  redux_bookmark_update: (state: boolean, id: string | number[]) => void,
  format_code: number,
  raw_value: string
}

const AnimationImage = ({
                          favourite,
                          image,
                          element_id,
                          bookmark,
                          setBookmark,
                          redux_bookmark_update,
                          format_code,
                          raw_value
                        }: Props) => {
  const { dark, colors } = useTheme();
  const viewShootRef: React.MutableRefObject<any> = React.useRef(null);

  const [flipRotation, setFlipRotation] = React.useState<number>(0);
  const [flipImage, setFlipImage] = React.useState<boolean>(false);
  const [layoutData, setLayoutData] = React.useState<LayoutRectangle | null>(null);
  const [modalState, setModalState] = React.useState<boolean>(false);
  const [viewShootCaptured, getViewShootCaptured] = React.useState<string>("");
  const [viewImage, setViewImage] = React.useState<string | null>(image);

  React.useEffect(() => {
    console.log("image", image);
    try {
      const exist_Favourite: History | object[] = favourite.filter((element: History) => element.id === element_id);
      setBookmark(!!exist_Favourite.length);
    } catch (e) {
      if (__DEV__) console.log("error", e);
    }
  }, []);

  const flipAnimation = React.useRef(new Animated.Value(flipRotation)).current;
  flipAnimation.addListener(({ value }) => setFlipRotation(value));

  function handler_close_modal() {
    setModalState(false);
  }

  function handler_favorite() {
    let txt = "";
    if (!bookmark) {
      txt = "contextual.add_favorites";
    } else {
      txt = "contextual.remove_favorites";
    }
    showToastWithGravity(i18n.t(txt));
    redux_bookmark_update(!bookmark, element_id);
  }

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"]
          // extrapolate: "clamp"
        })
      }
    ]
  };

  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"]
          // extrapolate: "clamp"
        })
      }
    ]
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleFlipRotation = () => {
    setFlipImage(!flipImage);
    !!flipRotation ? flipToBack() : flipToFront();
  };

  React.useEffect(() => {
    if (image) {
      if (!flipImage) {
        setViewImage("file://" + image.path);
      } else {
        setViewImage(viewShootCaptured);
      }
    }
  }, [flipImage]);

  const onCapture = React.useCallback(uri => {
    if (!image) {
      setViewImage(uri);
      handleFlipRotation();
    } else {
      getViewShootCaptured(uri);
    }
  }, []);


  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View style={styles.leftRadius}>
          <View style={styles.content}>
            {image && <View>
              <TouchableOpacityicon
                image_width={square_face_big / 7}
                image_height={square_face_big / 7}
                src_image={!flipImage
                  ? dark ? require("../assets/images/barcode_light.png") : require("../assets/images/barcode_dark.png")
                  : dark ? require("../assets/images/gallery_light.png") : require("../assets/images/gallery_dark.png")}
                _onPress={handleFlipRotation} margin={0} />
            </View>}
            <TouchableOpacityicon
              image_width={square_face_big / 7}
              image_height={square_face_big / 7}
              src_image={dark
                ? require("../assets/images/folder_light.png")
                : require("../assets/images/folder_dark.png")
              }
              _onPress={() => handleSave_image_to_gallery(viewImage)} margin={0} />
            <TouchableOpacityicon
              image_width={square_face_big / 7}
              image_height={square_face_big / 7}
              src_image={dark
                ? require("../assets/images/share_light.png")
                : require("../assets/images/share_dark.png")
              }
              _onPress={() => sharing_content(viewImage)} margin={0} />
            <TouchableOpacityicon
              image_width={square_face_big / 6}
              image_height={square_face_big / 6}
              src_image={dark
                ? bookmark ? require("../assets/images/bookmark_full_light.png") : require("../assets/images/bookmark_light.png")
                : bookmark ? require("../assets/images/bookmark_full_dark.png") : require("../assets/images/bookmark_dark.png")
              }
              _onPress={handler_favorite} margin={0} />
          </View>
          <View style={[styles.imageContainer, styles_sheet.rowBetween]}
                onTouchEnd={() => setModalState(true)}
                onLayout={(e) => {
                  setLayoutData(e.nativeEvent.layout);
                }}
          >
            {image && <Animated.View style={[styles.animatedImageContainer, flipToFrontStyle]}>
              <Image source={{ uri: "file://" + image.path }} style={styles.image} />
            </Animated.View>}
            <Animated.View style={[styles_sheet.centerCenter, styles.barcodeImage, flipToBackStyle]}
                           onLayout={(e) => e.nativeEvent}
            >
              <ViewShot ref={viewShootRef} captureMode="mount"
                        options={{ format: "jpg", quality: 0.9 }}
                        onCapture={onCapture}
              >
                <BarcodeBuilder value={raw_value} format={format_code} layoutData={layoutData} />
              </ViewShot>
            </Animated.View>
            <Image source={require("../assets/images/lupa_plus_light.png")} style={styles.iconResize} />
          </View>
        </View>
        <Image source={dark
          ? require("../assets/images/socialPymes_Imagotipo_180deg_light.png")
          : require("../assets/images/socialPymes_Imagotipo_180deg_dark.png")}
               style={styles.socialpymesLogo} />
      </View>
      {layoutData !== null && modalState && (
        <ModalViewImage layoutData={flipImage ? layoutData : QR_LAYOUT} close={handler_close_modal}
                        uriImage={{ uri: viewImage }} />
      )}
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  favourite: state.usedFauvorites
});

export default connect(
  mapStateToProps
)(AnimationImage);

const styles = StyleSheet.create({
  container: {
    width: "100%",//IMPORTANT:  calculate width for tablet or mobile
    borderBottomLeftRadius: 70,
    borderTopLeftRadius: 70,
    flexDirection: "row",
    alignSelf: "flex-end",
    flex: 4
  },
  leftRadius: {
    width: "100%",
    height: square_face_big,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
    flex: 1
  },
  content: {
    width: square_face_small,
    height: square_face_big,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: padding
  },
  imageContainer: {
    overflow: "hidden",
    width: square_face_big,
    height: square_face_big
  },
  animatedImageContainer: {
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    position: "absolute"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: padding
  },
  barcodeImage: {
    width: "100%",
    height: "100%",
    padding: padding,
    backgroundColor: "white",
    backfaceVisibility: "hidden"
  },
  box: {
    // width: 150,
    // height: 150,
    // marginVertical: 20
  },
  barcode: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  iconResize: {
    width: square_face_big / 8,
    height: square_face_big / 8,
    position: "absolute",
    backgroundColor: "#00000030",
    bottom: 10,
    left: 10,
    resizeMode: "contain"
  },
  socialpymesLogo: {
    // flex: .4,
    marginRight: 0,
    width: 30,
    height: square_face_big,
    resizeMode: "contain",
    alignSelf: "center",
    marginLeft: 10
  }
});