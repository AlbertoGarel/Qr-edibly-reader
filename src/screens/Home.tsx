import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, ImageBackground, SafeAreaView } from "react-native";
import LogoTitle from "../components/microComponents/LogoTitle";
import Title from "../components/microComponents/Title";
import { WINDOW_WIDTH, BREACKPOINT_DEVICES } from "../constants/expoConstants";
import {
  padding,
  styles_sheet
} from "../constants/styles_sheet";
import SquareButton from "../components/microComponents/SquareButton";
import AlbertogarelLogo from "../components/microComponents/AlbertogarelLogo";
import RoundedButton from "../components/microComponents/RoundedButton";
import { useTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import LastSearch from "../components/LastSearch";
import RNpicker from "../components/microComponents/RNpicker";
import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@App/store/types";
import { useFocusEffect } from "@react-navigation/native";


type State = {
  lupa: boolean, bookmark: boolean, bug: boolean, settings: boolean
}

const Home = ({ navigation, last }) => {
  const { dark, colors } = useTheme();
  const tabletPadding = WINDOW_WIDTH >= BREACKPOINT_DEVICES ? { paddingHorizontal: WINDOW_WIDTH * .10 } : null;

  const [pressed, setPressed] = useState<boolean>(false);
  const [squarepressed, setSquarePressed] = useState<State>({
    lupa: false,
    bookmark: false,
    bug: false,
    settings: false
  });

  const [fontLoad, getFontLoad] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<History | {}>({});

  useFocusEffect(
    React.useCallback(() => {
      let unMount = true;

      const latest = [...last].sort((a, b) => new Date(b.date + " " + b.hour).getTime() - new Date(a.date + " " + a.hour).getTime());
      setLastSearch(latest[0] || {});
      return () => unMount = false;
    }, [last])
  );

  useEffect(() => {
    Font.loadAsync({
      "Kanit": require("../assets/fonts/kanit/Kanit-Black.ttf"),
      "Sniglet": require("../assets/fonts/Sniglet/Sniglet-Regular.ttf"),
      "Ubuntu": require("../assets/fonts/Ubuntu/Ubuntu-Medium.ttf")
    })
      .then(() => getFontLoad(true))
      .catch(() => {
        if (__DEV__) console.log("error font loaded");
      });
  }, []);

  function rounded_pressable(value) {
    setPressed(value);
    if (value === false) navigation.navigate("camera");
  };

  function handlerRoute(lastSearch) {
    if (Object.keys(lastSearch).length) {
      navigation.navigate("codescreen", {
        code: [lastSearch],
        imageData: null
      });
    }
  }

  function squares_pressable(identifier, value) {
    setSquarePressed((prevState) => {
      return {
        ...prevState,
        [identifier]: value
      };
    });
    navigation.navigate(identifier);
  };

  const renderSquaresPressables = [
    {
      image_src: require("../assets/images/history.png"),
      func_press: squares_pressable,
      identifier: "history",
      press_state: squarepressed.lupa
    },
    {
      image_src: require("../assets/images/bookmark_full_dark.png"),
      func_press: squares_pressable,
      identifier: "favourites",
      press_state: squarepressed.bookmark
    },
    {
      image_src: require("../assets/images/bug.png"),
      func_press: squares_pressable,
      identifier: "bug",
      press_state: squarepressed.bug
    },
    {
      image_src: require("../assets/images/engrana.webp"),
      func_press: squares_pressable,
      identifier: "settings",
      press_state: squarepressed.settings
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/bg_rotate_logo_socialp_medium_light.png")}
        resizeMode="cover"
        style={[styles.parent, styles_sheet.flexColumn]}
      >
        <View
          style={[styles_sheet.centerCenter]}>
          <Title
            title={"powered by:"} isDark={dark}
          />
        </View>
        <View
          style={[styles_sheet.centerCenter, {
            flex: 2,
            justifyContent: "space-evenly"
          }]}>
          <LastSearch handlerRoute={handlerRoute} last={lastSearch} />
          <RoundedButton
            press_func={rounded_pressable} pressed={pressed} />
        </View>
        <View
          style={{
            ...styles_sheet.centerCenter, ...styles.contbuttons,
            paddingVertical: padding, ...tabletPadding
          }}>
          {
            renderSquaresPressables.map((i, index) => {
              return (
                <SquareButton
                  key={index}
                  image_src={i.image_src}
                  func_press={i.func_press}
                  identifier={i.identifier}
                  press_state={i.press_state}
                />
              );
            })
          }
        </View>
        <View
          style={[styles_sheet.centerCenter, { alignSelf: "flex-end" }]}>
          <AlbertogarelLogo
            textColor={colors.text}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const mapStateToProps = (state: AppState) => ({
  last: state.usedHistory
});

export default connect(
  mapStateToProps
)(Home);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor: '#32A6F1',
    paddingTop: padding * 2,
    paddingBottom: 0,
    paddingHorizontal: padding * 2
  },
  contbuttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "auto"
  }
});