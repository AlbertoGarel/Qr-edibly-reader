import {AddThemeAction} from "../types";

export enum THEMES_LIST_ACTION_TYPES {
    ADD_THEME = "THEMES/ADD_THEME",
}

export const addTheme = (nameTheme: object): { themeData: {}; type: THEMES_LIST_ACTION_TYPES.ADD_THEME } => ({
    type: THEMES_LIST_ACTION_TYPES.ADD_THEME,
    themeData: {...nameTheme}
});