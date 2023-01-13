import {StyleSheet} from "react-native";

export const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: "#000000",
    SKY: '#32A6F1',
    SKY_CARD: '#2C91D3',
    SKY_NOTFICATION: '#195378',
    MARINE: '#3ce7c6',
    MARINE_CARD: '#35CAAD',
    MARINE_NOTFICATION: '#1E7363',
    ORANGE: '#f44611',
    ORANGE_CARD: '#D63D0F',
    ORANGE_NOTFICATION: '#7A2309',
    PURPLE: '#da70d6',
    PURPLE_CARD: '#BF62BB',
    PURPLE_NOTFICATION: '#6D386B',
    PINK: '#e4007c',
    PINK_CARD: '#C8006D',
    PINK_NOTFICATION: '#72003E',
    ALERT: '#dc143c',
    ALERT_CARD: '#C11235',
    ALERT_NOTFICATION: '#6E0A1E',
    OLOMBINE: '#606e8c',
    OLOMBINE_CARD: '#54607B',
    OLOMBINE_NOTFICATION: '#303746',
};
export const rounded = 10;
export const rounded_less = 7;
export const padding = 10;
export const medium_fontSize = 16;

export const styles_sheet = StyleSheet.create({
    text_shadow: {
        textShadowColor: '#000000',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    centerCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowBetween:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

