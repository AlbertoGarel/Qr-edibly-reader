export enum FAVOURITE_LIST_ACTION_TYPES {
  CHANGE_FAVOURITE = "FAVOURITES/CHANGE_FAVOURITE",
  DELETE_FAVOURITE = "FAVOURITES/DELETE_FAVOURITE"
}


export const changeStateFavourite = (favourite: object): { type: FAVOURITE_LIST_ACTION_TYPES.CHANGE_FAVOURITE; favouriteData: {} } => ({
  type: FAVOURITE_LIST_ACTION_TYPES.CHANGE_FAVOURITE,
  favouriteData: favourite
});

export const deleteFavourite = (id: string): { type: FAVOURITE_LIST_ACTION_TYPES.DELETE_FAVOURITE; favouriteID: string } => ({
  type: FAVOURITE_LIST_ACTION_TYPES.DELETE_FAVOURITE,
  favouriteID: id
});