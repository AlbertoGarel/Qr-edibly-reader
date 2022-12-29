import {Image, Text, View} from 'react-native';

const LogoTitle = () => {
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Text style={{fontSize: 20 }}>BARCODEREADER</Text>
        <Image
            style={{ width: 50, height: 50 }}
            source={require('../assets/icon.png')}
        />
        </View>
    );
}
export default LogoTitle;
