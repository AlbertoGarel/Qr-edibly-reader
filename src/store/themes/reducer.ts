import { AddThemeAction, ThemeListActions } from "../types";
import { THEMES_LIST_ACTION_TYPES } from "./actions";
import { custom_themes, Themes } from "../../themes/themes";

const initialTheme = custom_themes.filter(i => i.name === "sky_theme");

export const initialState: Themes[] = initialTheme;

export const usedTheme = (
  state: Themes[] = initialState,
  action: ThemeListActions
) => {
  switch (action.type) {
    case THEMES_LIST_ACTION_TYPES.ADD_THEME:
      // pay attention to type-casting on action
      const payload = <AddThemeAction>action;
      const selectedTheme = payload.themeData;
      return [{ ...selectedTheme }];

    // define rest of actions here
    default:
      return state;
  }
};