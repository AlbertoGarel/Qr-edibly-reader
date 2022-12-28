import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => {

    return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
            <Text>this is Home</Text>
            <Button
                title="Prueba"
                onPress={() => navigation.navigate('prueba')}
            />
        </View>
    )
}
export default Home;