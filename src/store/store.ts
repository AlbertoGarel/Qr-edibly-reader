import {combineReducers} from 'redux';
import {userList} from './user-list/reducer';
import {usedTheme} from './themes/reducer';
import {usedSettings} from './settings/reducer';
import {usedHistory} from './history/reducer';
import {usedFauvorites} from './favourites/reducer';
import {AppState} from "./types";
import {configureStore} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
};

const rootReducer = combineReducers<AppState>({
    userList,
    usedTheme,
    usedSettings,
    usedHistory,
    usedFauvorites
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})