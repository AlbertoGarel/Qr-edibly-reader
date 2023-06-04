import { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Modal,
  PanResponder,
  View,
  StyleSheet,
  Image, ImageURISource
} from "react-native";
import { WINDOW_HEIGHT } from "../../constants/expoConstants";
import { styles_sheet } from "../../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";

interface LayoutData {
  x
  y
  width
  height: number
}

interface Props {
  layoutData: LayoutData
  close: () => void
  uriImage: ImageURISource | ImageURISource[]
}

const ModalViewImage = ({ layoutData, close, uriImage }: Props) => {
  const { dark, colors } = useTheme();
  const { x, y, width, height } = layoutData;
  const animtion = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setExpanded(true);
    }, 100);
  }, []);
  const onRequestClose = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      ),
      () => {
        close();
      }
    );
    setExpanded(false);
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
      },
      onPanResponderMove: Animated.event([null, { dy: animtion.y }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: (e, g) => {
        if (Math.abs(g.vy) > 2) {
          reset(true, g.vy > 0);
          return;
        }
        reset(true, 0);
      },
      onPanResponderTerminate: () => {
        reset(true, 0);
      }
    })
  ).current;
  const reset = (closeModal, down) => {
    Animated.spring(animtion, {
      toValue: { x: 0, y: closeModal ? (WINDOW_HEIGHT * (down ? 1 : -1)) : 0 },
      bounciness: 0, useNativeDriver: true
    }).start();
    if (closeModal) {
      setTimeout(() => {
        close();
      }, 300);
    }
  };
  return (
    <Modal visible onRequestClose={onRequestClose} transparent>
      <View style={[styles.center]} {...panResponder.panHandlers}>
        {expanded && (
          <Animated.View
            style={[StyleSheet.absoluteFill, { backgroundColor: "#000000aa" }]}
          />
        )}
        <Animated.View
          style={[
            expanded
              ? {
                height: "100%",
                width: "100%",
                alignItems: "center"
              }
              : {
                height: 0,
                width: 0,
                left: x,
                top: y,
                position: "absolute"
              },
            {
              backgroundColor: colors.background,
              overflow: "hidden",
              transform: animtion.getTranslateTransform()
            },
            styles_sheet.centerCenter
          ]}>
          <Image
            source={uriImage}
            resizeMode="cover"
            style={[styles.fill, { height: height, width: width, padding: 10 }]}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};
export default ModalViewImage;

const styles = StyleSheet.create({
  close: {
    position: "absolute",
    right: 10,
    top: 10
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fill: {
    // height: "100%",
    // width: "100%",
    position: "absolute"
  }
  // label: {
  //   color: "#fff",
  //   fontSize: 20,
  //   marginTop: 100
  // }
});