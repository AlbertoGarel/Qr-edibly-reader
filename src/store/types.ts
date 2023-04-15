// SETUP TYPES
export type SettingsInUseState = Settings[];
export type Settings = {
  copyClipboard: boolean,
  buttonVibration: boolean,
  buttonSound: boolean,
  scannerVibration: boolean,
  scannerSound: boolean,
  camera: string,
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
  usedHistory: HistoryInUseState,
  usedFauvorites: FavouritesInUseState
  // add future state slices here
}
// HISTORY TYPES
export type HistoryInUseState = History[];
export type History = {
  id: string | number[],
  content: {
    type: number
  },
  rawValue: string,
  format: number,
  favourite: false,
  listed: number,
  name: string,
  codetype: string,
  date: string,
  hour: string
}
export type AddHistoryAction = {
  type: string,
  historyData: History
}
export type DeleteHistoryAction = {
  type: string,
  id: string | number[]
}
export type DeleteByDateHistory = {
  type: string,
  date: string
}
export type HistoryListActions = AddHistoryAction | DeleteHistoryAction | DeleteByDateHistory;

// FAVOURITES TYPES
export type FavouritesInUseState = Favourites[];
export type Favourites = History;

export type ChangeValueFavouriteAction = {
  type: string,
  favouriteData: History
}
export type DeleteValueFavouriteAction = {
  type: string,
  favouriteID: string
}
export type DeleteByDateFavoriteAction = {
  type: string
  date: string
}
export type FavouriteListActions = ChangeValueFavouriteAction | DeleteValueFavouriteAction | DeleteByDateFavoriteAction;
