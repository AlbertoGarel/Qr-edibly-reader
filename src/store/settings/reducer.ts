import { AddSettingsAction, SettingsInUseState, SettingsListActions } from "../types";
import { SETTINGS_LIST_ACTION_TYPES } from "./action";


export const initialState: SettingsInUseState = [{
  copyClipboard: true,// ¿?
  buttonVibration: true,
  buttonSound: false,
  scannerVibration: true,
  scannerSound: false,
  camera: "back",
  history: true,
  openAutoURL: false// ¿?
}];

export const usedSettings = (
  state: SettingsInUseState = initialState,
  action: SettingsListActions
) => {
  const newState: SettingsInUseState = [...state]; // deep-cloning
  switch (action.type) {
    case SETTINGS_LIST_ACTION_TYPES.ADD_SETTINGS:
      // pay attention to type-casting on action
      const payload = <AddSettingsAction>action;
      const selectedSetting = payload.settingsData;
      return newState.map((user) => ({
        ...user,
        ...selectedSetting
      }));

    // define rest of actions here
    default:
      return state;
  }
};