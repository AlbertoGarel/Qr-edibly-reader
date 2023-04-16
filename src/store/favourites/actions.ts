import { HISTORY_LIST_ACTION_TYPES } from "@App/store/history/actions";

export enum FAVOURITE_LIST_ACTION_TYPES {
  CHANGE_FAVOURITE = "FAVOURITES/CHANGE_FAVOURITE",
  DELETE_FAVOURITE = "FAVOURITES/DELETE_FAVOURITE",
  ALL_DELETE_FAVOURITE = "FAVOURITE/ALL_DELETE_FAVOURITE",
  DELETE_BY_DATE_FAVOURITE = "FAVOURITE/DELETE_BY_DATE_FAVOURITE"
}


export const changeStateFavourite = (favourite: object): { type: FAVOURITE_LIST_ACTION_TYPES.CHANGE_FAVOURITE; favouriteData: {} } => ({
  type: FAVOURITE_LIST_ACTION_TYPES.CHANGE_FAVOURITE,
  favouriteData: favourite
});

export const deleteFavourite = (id: string | number[]): { type: FAVOURITE_LIST_ACTION_TYPES.DELETE_FAVOURITE; favouriteID: string | number[] } => ({
  type: FAVOURITE_LIST_ACTION_TYPES.DELETE_FAVOURITE,
  favouriteID: id
});

export const allDeleteFavourites = (): { type: FAVOURITE_LIST_ACTION_TYPES.ALL_DELETE_FAVOURITE } => ({
  type: FAVOURITE_LIST_ACTION_TYPES.ALL_DELETE_FAVOURITE
});

export const deleteByDateFavourite = (date: string): { type: FAVOURITE_LIST_ACTION_TYPES.DELETE_BY_DATE_FAVOURITE; date: string } => ({
  type: FAVOURITE_LIST_ACTION_TYPES.DELETE_BY_DATE_FAVOURITE,
  date: date
});