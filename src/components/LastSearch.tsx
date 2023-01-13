import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {HEIGHT_BREACKPOINT_DEVICES, WINDOW_HEIGHT, WINDOW_WIDTH} from "../constants/expoConstants";
import {useTheme} from "@react-navigation/native";
import {medium_fontSize, padding, rounded_less, styles_sheet} from "../constants/styles_sheet";

const LastSearch = () => {
    const {dark, colors} = useTheme();
    return (
        <TouchableHighlight onPress={() => alert('pressed')} underlayColor={'transparent'}>
            <View style={{minWidth: '50%', maxWidth: '90%'}}>
                <View
                    style={{...styles_sheet.rowBetween, paddingHorizontal: padding - 8, paddingVertical: padding - 5}}>
                    <Text style={{color: colors.text, fontFamily: 'Sniglet', fontSize: 16}}>Última búsqueda:</Text>
                    <Image source={dark ?
                        require('../assets/images/go_square_light.png')
                        :
                        require('../assets/images/go_square.png')
                    } style={{width: 20, height: 20}}/>
                </View>
                <View style={{...styles.card, backgroundColor: colors.card + 99, borderColor: colors.border}}>
                    {
                        !!true ?
                            <View style={{...styles_sheet.flexColumn, width: '100%'}}>
                                <Image source={dark ?
                                    require('../assets/images/no_last_search_ligth.png')
                                    :
                                    require('../assets/images/no_last_search_dark.png')
                                }
                                       style={{
                                           width: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES  ? 200 : 100,
                                           height: WINDOW_HEIGHT >= HEIGHT_BREACKPOINT_DEVICES  ? 100 : 50,
                                           resizeMode: 'contain'}}/>
                                <Text style={{...styles.secondaryText, fontSize: 18, color: colors.text}}>Realiza tu
                                    primera búsqueda</Text>
                            </View>
                            :
                            <>
                                <Text style={{
                                    color: colors.primary, ...styles.primarytext, marginBottom: padding
                                }}>
                                    Tipo: <Text style={{...styles.secondaryText, color: colors.text}}>URL</Text>
                                </Text>
                                <View style={{
                                    ...styles_sheet.rowBetween,
                                    alignItems: 'flex-start',
                                    marginBottom: padding,
                                    minWidth: '100%'
                                }}>
                                    <Text style={{...styles.primarytext, color: colors.primary}}>
                                        Fecha: <Text
                                        style={{...styles.secondaryText, color: colors.text}}>2023-01-23</Text>
                                    </Text>
                                    <Text style={{marginLeft: 'auto', color: colors.primary}}>
                                        fecha: <Text
                                        style={{...styles.secondaryText, color: colors.text}}>2023-01-23444</Text>
                                    </Text>
                                </View>
                                <Text style={{...styles.contentText, color: colors.text}}
                                      numberOfLines={1}
                                >estoseráelcontenido</Text>
                            </>
                    }
                </View>
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
        card:
            {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                borderRadius: rounded_less,
                padding: padding / 2,
                borderWidth: 1,
            },
        primarytext: {
            flexShrink: 1,
            fontFamily: 'Ubuntu',
            fontSize: 16
        },
        secondaryText: {
            flexShrink: 1,
            fontFamily: 'Sniglet',
            fontSize: 14
        },
        contentText: {
            padding: padding,
            // flexShrink: 1,
            fontSize: 18
        }
    })
;
export default LastSearch;