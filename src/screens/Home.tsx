import {StyleSheet, View, Text, Button} from 'react-native';
import LogoTitle from "../components/LogoTitle";
import Title from "../components/Title";

const Home = ({navigation}) => {

    return (
        <View style={[styles.parent, styles.flexColumn]}>
            <Title title={"BarcodeReader"} />
            <LogoTitle/>
            <Button
                title="Prueba"
                onPress={() => navigation.navigate('prueba')}
            />
        </View>
    )
}
export default Home;
const styles = StyleSheet.create({
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: "center"
    },
    parent:{
        flex: 1,
        backgroundColor: '#32A6F1',
        padding: 20
    }

})