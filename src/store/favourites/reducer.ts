import {
  ChangeValueFavouriteAction, DeleteByDateFavoriteAction,
  DeleteValueFavouriteAction,
  FavouriteListActions,
  FavouritesInUseState
} from "../../store/types";
import { FAVOURITE_LIST_ACTION_TYPES } from "../../store/favourites/actions";


export const initialState: FavouritesInUseState | [] = [];

export const usedFauvorites = (
  state: FavouritesInUseState = initialState,
  action: FavouriteListActions
) => {
  const newState: FavouritesInUseState = [...state]; // deep-cloning
  switch (action.type) {
    case FAVOURITE_LIST_ACTION_TYPES.CHANGE_FAVOURITE:
      // pay attention to type-casting on action
      const add_payload = <ChangeValueFavouriteAction>action;
      const selectedElement = add_payload.favouriteData;
      return [...newState, selectedElement];
    case FAVOURITE_LIST_ACTION_TYPES.DELETE_FAVOURITE:
      const delete_add_payload = <DeleteValueFavouriteAction>action;
      const toDelete_selectedElement = delete_add_payload.favouriteID;
      return newState.filter(item => item.id !== toDelete_selectedElement);
    case FAVOURITE_LIST_ACTION_TYPES.ALL_DELETE_FAVOURITE:
      return [];
    case FAVOURITE_LIST_ACTION_TYPES.DELETE_BY_DATE_FAVOURITE:
      const delete_date_payload = <DeleteByDateFavoriteAction>action;
      const date_to_delete = delete_date_payload.date;
      return newState.filter(i => i.date !== date_to_delete);
    default:
      return state;
  }
};