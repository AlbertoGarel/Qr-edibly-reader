import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
// @ts-ignore
import {APP_NAME} from '@env'
import {Provider} from "react-redux";
import store from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import Prueba from "./components/Prueba";
import LogoTitle from "./components/LogoTitle";
import CustomStatusBar from './components/CustomStatusBar';

export default function App() {
    let persistor = persistStore(store);
    const Stack = createNativeStackNavigator();
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaView style={{flex: 1}}>
                    <CustomStatusBar/>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="inicio"
                                         screenOptions={{
                                             headerShown: false
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
                            <Stack.Screen name="prueba" component={Prueba}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </PersistGate>
        </Provider>
    );
};
