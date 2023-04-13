import { StyleSheet, Text, TouchableHighlight, View, FlatList } from "react-native";
import BoxSchemaColors from "../components/BoxSchemaColors";
import { medium_fontSize, padding, rounded_less, styles_sheet } from "../constants/styles_sheet";
import { custom_themes } from "../themes/themes";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import { AppState, SettingsInUseState } from "../store/types";
import { Dispatch } from "redux";
import { addTheme } from "../store/themes/actions";
import { addSettings } from "../store/settings/action";
import i18n from "../translate";
import uuid from "react-native-uuid";
import { handlerActionAndEffects } from "../utils/utils";
import React from "react";

type Props = {
  selectedSettings: SettingsInUseState,
  onAddSettings: (name: object) => void
}

const Settings = ({ onAddSettings, selectedSettings }: Props) => {
    const { colors } = useTheme();
    const {
      buttonSound,
      buttonVibration,
      camera,
      copyClipboard,
      history,
      openAutoURL,
      scannerSound,
      scannerVibration
    } = selectedSettings[0];

    const DATA = [
      {
        id: "themes",
        itemData: [
          {
            items: custom_themes,
            title: "Temas"
          }
        ]
      },
      {
        id: "options-buttonVibration",
        itemData: [
          {
            title: "contextual.vibration_button",// i18n key
            value: buttonVibration,
            action: { buttonVibration: !buttonVibration },
            predefValue: true
          }
        ]
      },
      {
        id: "options-buttonSound",
        itemData: [
          {
            title: "contextual.sound_button",
            value: buttonSound,
            action: { buttonSound: !buttonSound },
            predefValue: false
          }
        ]
      },
      {
        id: "options-scanVibration",
        itemData: [
          {
            title: "contextual.scan_vibration",
            value: scannerVibration,
            action: { scannerVibration: !scannerVibration },
            predefValue: false
          }
        ]
      },
      {
        id: "options-scanSound",
        itemData: [
          {
            title: "contextual.scan_sound",
            value: scannerSound,
            action: { scannerSound: !scannerSound },
            predefValue: false
          }
        ]
      },
      {
        id: "options-frontCamera",
        itemData: [
          {
            title: "contextual.front_camera",
            value: camera,
            action: { camera: "front" },
            predefValue: "front"
          }
        ]
      },
      {
        id: "options-rearCamera",
        itemData: [
          {
            title: "contextual.rear_camera",
            value: camera,
            action: { camera: "back" },
            predefValue: "back"
          }
        ]
      },
      {
        id: "options-history",
        itemData: [
          {

            title: "contextual.add_history",
            action: { history: !history },
            value: history,
            predefValue: true
          }
        ]
      }
    ];

    function SchemeColors(item) {
      const this_item = item.itemData[0].items || item.itemData;
      let keys = Object.keys(Object.values(this_item)[0]);
      return (
        this_item.map((i, index) => {
          let is_schemaColors = keys.includes("colors");
          return (
            <BoxSchemaColors
              key={i.name + uuid.v4()}
              background={is_schemaColors ? i.colors.background : colors.background}
              name_theme={is_schemaColors ? i.name : i.value}
              image_bg={is_schemaColors ? i.image : null}
              boxWidth={is_schemaColors ? 50 : 30}
              boxHeight={is_schemaColors ? 50 : 30}
              _onPress={is_schemaColors ? null : () => handlerActionAndEffects(() => onAddSettings(i.action), buttonVibration, buttonSound)}
              params={is_schemaColors ? null : i.predefValue}
            />
          );
        })
      );
    };

    function renderItems({ item }) {
      const searched = item.id.split("-")[0] || item.id;
      switch (searched) {
        case "themes":
          return (
            <View style={[styles.fullwidth, { padding: padding }]}>
              <Text style={{ ...styles.blockSchemaColors, color: colors.text }}>{i18n.t("generic.themes")}:</Text>
              <View style={[styles_sheet.rowWrap, styles.fullwidth]}>
                {SchemeColors(item)}
              </View>
            </View>
          );
        case "options":
          return (
            <TouchableHighlight underlayColor={colors.background}
                                onPress={() => handlerActionAndEffects(() => onAddSettings(item.itemData[0].action), buttonVibration, buttonSound)}>
              <View
                style={{
                  ...styles_sheet.rowBetween, ...styles.listableItems,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border
                }}>
                <Text style={{
                  ...styles.listableItemsText,
                  color: colors.text
                }}>{i18n.t(item.itemData[0].title)}</Text>
                {SchemeColors(item)}
              </View>
            </TouchableHighlight>
          );
        default:
          return <Text>No existen datos</Text>;
      }
    };


    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => item.id + index}
          renderItem={renderItems}
        />
      </View>
    );
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
    width: "100%"
  },
  blockSchemaColors: {
    fontFamily: "Sniglet",
    fontSize: medium_fontSize,
    marginBottom: padding * 2
  },
  listableItems: {
    paddingHorizontal: padding,
    margin: padding,
    borderRadius: rounded_less
  },
  listableItemsText: {
    fontFamily: "Sniglet",
    fontSize: medium_fontSize
  }
});