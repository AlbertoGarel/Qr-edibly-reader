import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {APP_NAME} from '@env'

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!{APP_NAME}</Text>
            <StatusBar/>
        </View>
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
