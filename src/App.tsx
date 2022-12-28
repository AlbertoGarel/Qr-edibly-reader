import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {APP_NAME} from '@env'
import {Provider} from "react-redux";
import store from "./store/store";
import Prueba from "./components/Prueba";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

export default function App() {
    let persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={styles.container}>
                    <Text>Open up App.js to start working on your app!{APP_NAME}</Text>
                    <Prueba/>
                    <StatusBar/>
                </View>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
