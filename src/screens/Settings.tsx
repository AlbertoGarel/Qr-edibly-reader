import {StyleSheet, Text, TouchableHighlight, View, FlatList} from "react-native";
import BoxSchemaColors from "../components/BoxSchemaColors";
import {medium_fontSize, padding, rounded_less, styles_sheet} from '../constants/styles_sheet';
import {custom_themes} from '../themes/themes'
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {AppState, SettingsInUseState} from "../store/types";
import {Dispatch} from "redux";
import {addTheme} from "../store/themes/actions";
import {addSettings} from "../store/settings/action";
import i18n from "../translate";

type Props = {
    selectedSettings: SettingsInUseState,
    onAddSettings: (name: object) => void
}

const Settings = ({onAddSettings, selectedSettings}: Props) => {
        const {colors} = useTheme();
        const settings = selectedSettings;

        const DATA = [
            {
                id: 'themes',
                itemData: [
                    {
                        items: custom_themes,
                        title: 'Temas',
                    }
                ]
            },
            {
                id: 'options-buttonVibration',
                itemData: [
                    {
                        title: "contextual.vibration_button",// i18n key
                        value: settings[0].buttonVibration,
                        action: {buttonVibration: !settings[0].buttonVibration},
                        predefValue: true
                    }
                ]
            },
            {
                id: 'options-buttonSound',
                itemData: [
                    {
                        title: 'contextual.sound_button',
                        value: settings[0].buttonSound,
                        action: {buttonSound: !settings[0].buttonSound},
                        predefValue: false
                    }
                ]
            },
            {
                id: 'options-scanVibration',
                itemData: [
                    {
                        title: 'contextual.scan_vibration',
                        value: settings[0].scannerVibration,
                        action: {scannerVibration: !settings[0].scannerVibration},
                        predefValue: false
                    }
                ]
            },
            {
                id: 'options-scanSound',
                itemData: [
                    {
                        title: 'contextual.scan_sound',
                        value: settings[0].scannerSound,
                        action: {scannerSound: !settings[0].scannerSound},
                        predefValue: false
                    }
                ]
            },
            {
                id: 'options-frontCamera',
                itemData: [
                    {
                        title: 'contextual.front_camera',
                        value: settings[0].camera,
                        action: {camera: 1},
                        predefValue: 1
                    }
                ]
            },
            {
                id: 'options-rearCamera',
                itemData: [
                    {
                        title: 'contextual.rear_camera',
                        value: settings[0].camera,
                        action: {camera: 0},
                        predefValue: 0
                    }
                ]
            },
            {
                id: 'options-history',
                itemData: [
                    {

                        title: 'contextual.add_history',
                        action: {history: !settings[0].history},
                        value: settings[0].history,
                        predefValue: true
                    }
                ]
            }
        ];

        function SchemeColors(item) {
            const this_item = item.itemData[0].items || item.itemData;
            let keys = Object.keys(Object.values(this_item)[0]);
            return (
                <>
                    {
                        this_item.map((i, index) => {
                            let is_schemaColors = keys.includes('colors');
                            return (
                                <>
                                    <BoxSchemaColors
                                        key={index}
                                        background={is_schemaColors ? i.colors.background : colors.background}
                                        name_theme={is_schemaColors ? i.name : i.value}
                                        image_bg={is_schemaColors ? i.image : null}
                                        boxWidth={is_schemaColors ? 50 : 30}
                                        boxHeight={is_schemaColors ? 50 : 30}
                                        _onPress={is_schemaColors ? null : () => onAddSettings(i.action)}
                                        params={is_schemaColors ? null : i.predefValue}
                                    />
                                </>
                            )
                        })
                    }
                </>
            )
        };

        function renderItems({item}) {
            const searched = item.id.split('-')[0] || item.id;
            switch (searched) {
                case 'themes':
                    return (
                        <View style={[styles.fullwidth, {padding: padding}]}>
                            <Text style={{...styles.blockSchemaColors, color: colors.text}}>{i18n.t("generic.themes")}:</Text>
                            <View style={[styles_sheet.rowWrap, styles.fullwidth]}>
                                {SchemeColors(item)}
                            </View>
                        </View>
                    );
                    break;
                case 'options':
                    return (
                        <TouchableHighlight underlayColor={colors.background}
                                            onPress={() => onAddSettings(item.itemData[0].action)}>
                            <View
                                style={{...styles_sheet.rowBetween, ...styles.listableItems, backgroundColor: colors.card}}>
                                <Text style={{
                                    ...styles.listableItemsText,
                                    color: colors.text
                                }}>{i18n.t(item.itemData[0].title)}</Text>
                                {SchemeColors(item)}
                            </View>
                        </TouchableHighlight>
                    );
                    break;
                default:
                    return <Text>No existen datos</Text>
            }
        };


        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={DATA}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={renderItems}
                />
            </View>
        )
    }
;

const mapStateToProps = (state: AppState) => ({
    theme: state.usedTheme,
    selectedSettings: state.usedSettings
});

const mapDipatchToProps = (dispatch: Dispatch) => ({
    onAddTheme: (theme: object) => {
        dispatch(addTheme(theme));
    },
    onAddSettings: (param: object) => {
        dispatch(addSettings(param));
    }
    // other callbacks go here...
});

export default connect(
    mapStateToProps,
    mapDipatchToProps
)(Settings);

const styles = StyleSheet.create({
    fullwidth: {
        width: '100%',
    },
    blockSchemaColors: {
        fontFamily: 'Sniglet',
        fontSize: medium_fontSize,
        marginBottom: padding * 2
    },
    listableItems: {
        paddingHorizontal: padding,
        margin: padding,
        borderRadius: rounded_less
    },
    listableItemsText: {
        fontFamily: 'Sniglet',
        fontSize: medium_fontSize,
    }
});