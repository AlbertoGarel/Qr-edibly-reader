import {AddThemeAction} from "../types";

export enum SETTINGS_LIST_ACTION_TYPES {
    ADD_SETTINGS = "SETTINGS/ADD_SETTINGS",
}

export const addSettings = (settings: object): { type: SETTINGS_LIST_ACTION_TYPES.ADD_SETTINGS; settingsData: {} } => ({
    type: SETTINGS_LIST_ACTION_TYPES.ADD_SETTINGS,
    settingsData: {...settings}
});