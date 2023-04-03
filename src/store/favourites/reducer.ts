import {
  ChangeValueFavouriteAction, DeleteValueFavouriteAction,
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
      return newState.filter(item => item.id !== toDelete_selectedElement)
    default:
      return state;
  }
};