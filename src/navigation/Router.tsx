import { SafeAreaView } from "react-native";
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
import Favourites from "../screens/Favourites";
import History from "../screens/History";

const Router = ({ theme, props }) => {
  const Stack = createNativeStackNavigator();
  const { dark, colors } = useTheme();

  const MyTheme = {
    ...DefaultTheme,
    ...theme
  };

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
        >
          <Stack.Screen name="Home" component={Home}
                        options={{ headerTitle: (props: any) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen name="settings" component={Settings}
                        options={{
                          headerShown: true,
                          title: "Ajustes",
                          headerTitleStyle: {
                            fontWeight: "bold"
                          },
                          headerTitleAlign: "center"
                        }}
          />
          <Stack.Screen name="camera" component={CameraScanner}
                        options={
                          { animation: "slide_from_bottom" }
                        }

          />
          <Stack.Screen name="codescreen" component={CodeScreen}
            // initialParams={{ user: props.name }}
                        options={{
                          headerShown: true,
                          title: "Ajustes",
                          headerTitleStyle: {
                            fontWeight: "bold"
                          },
                          headerTitleAlign: "center"
                        }}

          />
          <Stack.Screen name="favourites" component={Favourites}
                        options={{
                          animation: "slide_from_bottom",
                          headerShown: true,
                          title: "Favourites",
                          headerTitleStyle: {
                            fontWeight: "bold"
                          },
                          headerTitleAlign: "center"
                        }}
          />
          <Stack.Screen name="history" component={History}
                        options={{
                          animation: "slide_from_bottom",
                          headerShown: true,
                          title: "Favourites",
                          headerTitleStyle: {
                            fontWeight: "bold"
                          },
                          headerTitleAlign: "center"
                        }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  theme: state.usedTheme[0]
});

export default connect(
  mapStateToProps
)(Router);