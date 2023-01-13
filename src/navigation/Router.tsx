import {SafeAreaView} from "react-native";
import AdMobBanner from "../components/AdModBanner";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Home from "../screens/Home";
import LogoTitle from "../components/LogoTitle";
import Settings from "../screens/Settings";
import Prueba from "../screens/Prueba";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {connect} from "react-redux";
import {AppState} from "../store/types";

const Router = ({theme}) => {
    const Stack = createNativeStackNavigator();

    const MyTheme = {
        ...DefaultTheme,
        ...theme
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer theme={MyTheme}>
                <AdMobBanner background={MyTheme.colors.background}/>
                <Stack.Navigator initialRouteName="inicio"
                                 screenOptions={{
                                     animation: 'slide_from_left',
                                     headerShown: false,
                                     statusBarColor: MyTheme.colors.background
                                     // headerStyle: {
                                     //     backgroundColor: '#f4511e',
                                     // },
                                     // headerTintColor: '#fff',
                                     // headerTitleStyle: {
                                     //     fontWeight: 'bold',
                                     // }
                                 }}
                >
                    <Stack.Screen name="Home" component={Home}
                                  options={{headerTitle: (props: any) => <LogoTitle {...props} />}}
                    />
                    <Stack.Screen name="settings" component={Settings}
                                  options={{
                                      headerShown: true,
                                      title: 'Ajustes',
                                      headerTitleStyle: {
                                          fontWeight: 'bold',
                                      },
                                      headerTitleAlign: 'center',
                                  }}
                    />
                    <Stack.Screen name="prueba" component={Prueba}
                                  options={
                                      {animation: 'slide_from_bottom'}
                                  }

                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
};

const mapStateToProps = (state: AppState) => ({
    theme: state.usedTheme[0]
});

export default connect(
    mapStateToProps
)(Router);