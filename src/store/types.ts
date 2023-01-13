// SETUP TYPES
export type SettingsInUseState = Settings[];
export type Settings = {
    copyClipboard: boolean,
    buttonVibration: boolean,
    buttonSound: boolean,
    scannerVibration: boolean,
    scannerSound: boolean,
    camera: number,
    history: boolean,
    openAutoURL: boolean,
}
export type AddSettingsAction = {
    type: string,
    settingsData: Settings
}
export type SettingsListActions = AddSettingsAction;
// THEME TYPES
export type ThemesInUseState = Theme[];
export type Theme = {
    dark: boolean,
    image?: any,
    index?: number,
    name?: string,
    colors: {
        background: string,
        border: string,
        card: string,
        notification: string,
        primary: string,
        text: string,
    }
};
export type AddThemeAction = {
    type: string,
    themeData: Theme
}
export type ThemeListActions = AddThemeAction;
// to delete -- test ---
export type UserListState = User[];

export type User = {
    name: string;
    surname: string;
    age: number;
}

export type AddUserAction = {
    type: string;
    userData: User;
}
export type UpdateUserAction = {
    type: string;
    index: number;
    userData: User;
}
export type RemoveUserAction = {
    type: string;
    index: number;
}
export type UserListAction = AddUserAction | UpdateUserAction | RemoveUserAction;

export type AppState = {
    userList: UserListState,
    usedTheme: ThemesInUseState
    usedSettings: SettingsInUseState
    // add future state slices here
}