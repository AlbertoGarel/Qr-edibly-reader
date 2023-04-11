import { SafeAreaView, StyleSheet } from "react-native";
import AdMobBanner from "../components/AdModBanner";
import { DefaultTheme, NavigationContainer, useTheme } from "@react-navigation/native";
import Home from "../screens/Home";
import LogoTitle from "../components/microComponents/LogoTitle";
import Settings from "../screens/Settings";
import CodeScreen from "../screens/CodeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { AppState } from "../store/types";
import CameraScanner from "../screens/CameraScanner";
import Favourites from "../screens/FavouriteScreen";
import History from "../screens/HistoryScreen";
import { HeaderRightNavScreen } from "../components/microComponents/HeaderRightNavScreen";
import i18n from "../translate";
import { Dispatch } from "redux";
import { allDeleteHistory } from "../store/history/actions";
import React, { createContext, useState } from "react";
import HistoryScreen from "../screens/HistoryScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import { allDeleteFavourites } from "../store/favourites/actions";

const INITIAL_STATE: number = 0;

const Router = ({ navigation, onAllDeleteHistory, theme, onAllDeleteFavourite }) => {
  const Stack = createNativeStackNavigator();
  const { dark, colors } = useTheme();

  const [filterValue, setFilterValue] = React.useState<number>(INITIAL_STATE);


  const MyTheme = {
    ...DefaultTheme,
    ...theme
  };

  const handlerFilter = (val) => {
    setFilterValue(val);
  };

  const interpolate_plural_title = (translation: string): string => {
    return i18n.t(translation, { key: "s" });
  };

  const history_tittle = i18n.t("generic.history");
  const settings_tittle = i18n.t("generic.settings");
  const favourite_tittle = interpolate_plural_title("generic.favourite");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer theme={MyTheme}>
        <AdMobBanner background={MyTheme.colors.background} />
        <Stack.Navigator initialRouteName="inicio"
                         screenOptions={{
                           animation: "slide_from_left",
                           headerShown: false,
                           statusBarColor: MyTheme.colors.background
                         }}
                         screenListeners={({ navigation }) => ({
                           state: () => {
                             // Update to InitialState filter value to search
                             if (!navigation.canGoBack()) {
                               setFilterValue(INITIAL_STATE);
                             }
                           }
                         })}
        >
          <Stack.Screen name="Home" component={Home}
                        options={{ headerTitle: (props: any) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen name="settings" component={Settings}
                        options={{
                          headerShown: true,
                          title: settings_tittle,
                          headerTitleStyle: styles.customTitleHeaderStyle,
                          headerTitleAlign: "center"
                        }}
          />
          <Stack.Screen name="camera" component={CameraScanner}
                        options={
                          { animation: "slide_from_bottom" }
                        }

          />
          <Stack.Screen name="codescreen" component={CodeScreen}
                        options={{
                          headerShown: true,
                          title: "Code",
                          headerTitleStyle: styles.customTitleHeaderStyle,
                          headerTitleAlign: "center"
                        }}

          />
          <Stack.Screen name="favourites"
            // component={Favourites}
                        children={(props) => <FavouriteScreen {...props} filterValue={filterValue} />}
                        options={{
                          animation: "slide_from_right",
                          headerShown: true,
                          title: favourite_tittle,
                          headerTitleStyle: styles.customTitleHeaderStyle,
                          headerTitleAlign: "center",
                          headerRight: () => <HeaderRightNavScreen
                            handlerReduxAllDeleteAction={onAllDeleteFavourite}
                            title={favourite_tittle}
                            handlerFilter={handlerFilter} />
                        }}
          />
          <Stack.Screen name="history"
                        children={(props) => <HistoryScreen {...props} filterValue={filterValue} />}
                        options={{
                          animation: "slide_from_right",
                          headerShown: true,
                          title: history_tittle,
                          headerTitleStyle: styles.customTitleHeaderStyle,
                          headerTitleAlign: "center",
                          headerRight: () => <HeaderRightNavScreen
                            handlerReduxAllDeleteAction={onAllDeleteHistory}
                            title={history_tittle}
                            handlerFilter={handlerFilter}
                          />
                        }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  theme: state.usedTheme[0],
  history: state.usedHistory
});

const mapDipatchToProps = (dispatch: Dispatch) => ({
  onAllDeleteHistory: () => {
    dispatch(allDeleteHistory());
  },
  onAllDeleteFavourite: () => {
    dispatch(allDeleteFavourites())
  }
  // other callbacks go here...
});

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(Router);

const styles = StyleSheet.create({
  customTitleHeaderStyle: {
    fontFamily: "Ubuntu"
  }
});