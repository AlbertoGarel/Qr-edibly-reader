import {Image, StyleSheet, Text, View} from 'react-native';
import {HEIGHT_BREACKPOINT_DEVICES, WINDOW_HEIGHT, WINDOW_WIDTH} from '../constants/expoConstants';
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import * as Font from "expo-font";
import {styles_sheet} from "../constants/styles_sheet";
import {useTheme} from '@react-navigation/native';

type Props = {
    title: string,
    isDark: boolean
};

const Title = ({title, isDark}: Props) => {
    const {dark, colors} = useTheme();

    return (
        <>
            <Text style={{color: colors.text, fontFamily: 'Sniglet'}}>{title}</Text>
            <Image source={
                dark ?
                    require('../assets/images/socialPymes_Imagotipo_blanco.png')
                    :
                    require('../assets/images/logo_social_colores.png')
            }
                   style={styles.image}
            />
            <Image source={require('../assets/images/qredibly_reader_logo_300.png')}
                   style={{
                       resizeMode: "contain",
                       width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES  ?  300 : 300 / 2,
                       height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES  ? 67 : 67 / 2,
                       backgroundColor: 'transparent'
                   }}/>
        </>
    );
};
export default Title;
const styles = StyleSheet.create({
    title: {
        fontSize: WINDOW_HEIGHT / 20,
        ...styles_sheet.text_shadow
    },
    image: {
        width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES  ? 140 : 140 / 1.3,
        height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES  ? 30 : 30 / 1.3,
        resizeMode: "contain",
    }
});