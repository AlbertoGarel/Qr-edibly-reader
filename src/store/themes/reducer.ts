import {AddThemeAction, ThemesInUseState, ThemeListActions} from "../types";
import {THEMES_LIST_ACTION_TYPES} from "./actions";

import {
    DefaultTheme
} from '@react-navigation/native';
import {COLORS} from "../../constants/styles_sheet";

export const initialState: ThemesInUseState = [
    {
        dark: false,
        index: 3,
        name: 'sky_theme',
        colors: {
            primary: COLORS.WHITE,
            background: COLORS.SKY,
            card: COLORS.SKY_CARD,
            text: COLORS.BLACK,
            border: COLORS.BLACK,
            notification: COLORS.SKY_NOTFICATION
        }
    },
];

export const usedTheme = (
    state: ThemesInUseState = initialState,
    action: ThemeListActions
) => {
    switch (action.type) {
        case THEMES_LIST_ACTION_TYPES.ADD_THEME:
            // pay attention to type-casting on action
            const payload = <AddThemeAction>action;
            const selectedTheme = payload.themeData;
            return [{...selectedTheme}];

        // define rest of actions here
        default:
            return state;
    }
}