import {
  StyleSheet,
  View,
  Text,
  Image,
  PanResponder,
  Animated
} from "react-native";
import { padding, styles_sheet } from "../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import TouchableOpacityicon from "../components/microComponents/TouchableOpacityIcon";
import * as React from "react";
import { WINDOW_WIDTH } from "../constants/expoConstants";
import RN_textInput from "../components/microComponents/RN_textInput";
import i18n from "../translate";
import RNpicker from "../components/microComponents/RNpicker";
import { search_engines } from "../utils/actionsAndIcons";

const square_face_big = WINDOW_WIDTH * .60;
const iconMargin = 10;
const square_face_small = WINDOW_WIDTH * .20;

type Props = {
  handler: (url: string) => void,
  data: string,
  drawicons: Content_elements_actions[]
  customTitle: string
  getCustomTitle: any
}

const DrawerIconsItem = ({ handler, data, drawicons, customTitle, getCustomTitle }: Props) => {
  const { dark, colors } = useTheme();
  const numItemsRow = WINDOW_WIDTH / (((square_face_big / 7) + (iconMargin * 2)) * drawicons.length);
  const numicons = WINDOW_WIDTH > numItemsRow;

  const [containerHeigt, setConainerHeight] = React.useState<number>(0);

  const ANIMATED = {
    HIDDEN: ((WINDOW_WIDTH * 99.5) / 100) * -1,
    FULL_OPEN: -70,
    VISIBLE: ((WINDOW_WIDTH * 99.5) / 100) * -1
  };

  const STARTING_POSITION = ANIMATED.HIDDEN - ANIMATED.FULL_OPEN;

  const animatedPosition = new Animated.Value(STARTING_POSITION);

  function animateMove(toValue) {
    Animated.spring(animatedPosition, {
      toValue,
      tension: 30,
      useNativeDriver: true
    }).start();
  }

  function movementValue(gestureState) {
    return gestureState.moveX + ANIMATED.VISIBLE;
  }

  function onMoveShouldSetPanResponder(_, gestureState) {
    return gestureState.dx >= 10 || gestureState.dx <= -10;
  }

  function onPanResponderMove(_, gestureState) {
    const toValue = Math.min(0, movementValue(gestureState));

    animateMove(toValue);
  }

  function onPanResponderRelease(_, gestureState) {
    const isMovedMoreThenThird = movementValue(gestureState) < ANIMATED.HIDDEN / 3;
    const toValue = isMovedMoreThenThird ? STARTING_POSITION : 0;

    animateMove(toValue);
  }

  const panGesture = PanResponder.create({
    onPanResponderMove,
    onPanResponderRelease,
    onMoveShouldSetPanResponder,
    onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder
  });

  return (
    <View style={{ ...styles.drawercontainer, height: containerHeigt }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <RN_textInput
            customTitle={customTitle}
            getCustomTitle={getCustomTitle}
          />
          <Image source={dark
            ? require("../assets/images/pencil_light.png")
            : require("../assets/images/pencil_dark.png")
          } style={styles.icon} />
        </View>
      </View>
      <Animated.View style={[styles.animatedView,
        {
          transform: [{ translateX: animatedPosition }]
        }]}
                     onLayout={(e) => setConainerHeight(e.nativeEvent.layout.height)}
      >
        <View style={[{
          width: ANIMATED.FULL_OPEN,
          backgroundColor: colors.card
        }, styles.containerIcons, styles_sheet.rowBetween]}
        >
          <View style={[styles_sheet.rowBetween, {
            flex: 1,
            justifyContent: numicons ? "space-around" : "flex-start",
            flexWrap: "wrap"
          }]}>
            {/*<RNpicker dataPickers={search_engines} icon={require("../assets/images/unknow_icon_light.png")}/>*/}
            {drawicons.map((i, index) => {
              if (index === 0) {
                return (
                  <RNpicker key={index} dataPickers={search_engines} icon={dark
                    ? i.light_icon
                    : i.dark_icon}
                            data={data}
                            handler={handler}
                  />
                );
              } else {
                return (
                  <TouchableOpacityicon key={index}
                                        image_width={square_face_big / 7}
                                        image_height={square_face_big / 7}
                                        src_image={dark
                                          ? i.light_icon
                                          : i.dark_icon
                                        }
                                        _onPress={i.func}
                                        margin={numicons ? iconMargin : 0} />
                );
              }
            })}
          </View>
          <View style={styles.iconDrawer}
                {...panGesture.panHandlers}
          >
            <Image source={dark
              ? require("../assets/images/arrow_light.png")
              : require("../assets/images/arrow_dark.png")
            } style={{
              width: square_face_big / 7,
              height: square_face_big / 7
            }} />
          </View>
        </View>
        <Text style={[styles.textContainericons, { color: colors.text, backgroundColor: colors.card }]}>
          {i18n.t("contextual.drawer_text")}
        </Text>
      </Animated.View>
    </View>
  );
};
export default DrawerIconsItem;
const styles = StyleSheet.create({
  drawercontainer: {
    position: "relative",
    marginBottom: padding
  },
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: WINDOW_WIDTH - 80 - 20, //CALCULATE RATIO
    marginLeft: 80,
    marginRight: 30,
    height: "auto"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 10
  },
  animatedView: {
    marginTop: 3,
    height: 80,
    backgroundColor: "transparent",
    borderTopRightRadius: 60
  },
  containerIcons: {
    top: 3,
    minHeight: 70,
    borderTopRightRadius: 70
  },
  textContainericons: {
    alignSelf: "center",
    borderBottomRightRadius: padding,
    borderBottomLeftRadius: padding,
    paddingHorizontal: padding,
    paddingBottom: 2
  },
  iconDrawer: {
    marginLeft: "auto",
    height: "100%",
    width: 60,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});