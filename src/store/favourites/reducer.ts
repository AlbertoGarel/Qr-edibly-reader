import {
  ChangeValueFavouriteAction, DeleteByDateFavoriteAction,
  DeleteValueFavouriteAction,
  FavouriteListActions,
  FavouritesInUseState, UpdateItemNameFavourite, UpdateItemNameHistory
} from "../../store/types";
import { FAVOURITE_LIST_ACTION_TYPES } from "../../store/favourites/actions";
import { HISTORY_LIST_ACTION_TYPES } from "../../store/history/actions";


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
    case HISTORY_LIST_ACTION_TYPES.UPDATE_ITEM:
      const update_item_payload = <UpdateItemNameFavourite>action;
      const item_to_update = update_item_payload.params;
      return newState.map(item => {
        if (item.id === item_to_update.id) {
          return {
            ...item,
            ...item_to_update
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};