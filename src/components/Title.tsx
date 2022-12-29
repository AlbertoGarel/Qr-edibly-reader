import {StyleSheet, Text} from 'react-native';
import {WINDOW_WIDTH} from '../constants/expoConstants';
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import * as Font from "expo-font";
import {text_shadow} from "../constants/styles_sheet";

type Props = {
    title: string,
};

const Title = ({title}: Props) => {

    const [fontLoad, getFontLoad] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            "Kanit": require("../assets/fonts/kanit/Kanit-Black.ttf"),
        })
            .then(() => getFontLoad(true))
            .catch(() => {
                if (__DEV__) {
                    console.log('error font loaded');
                }
            })
    }, []);

    return (
        <Text style={[styles.title, {fontFamily: fontLoad ? 'Kanit' : null}]}>{title}</Text>
    );
};
export default Title;
const styles = StyleSheet.create({
    title: {
        fontSize: WINDOW_WIDTH / 10,
        color: 'white',
        ...text_shadow
    }
});