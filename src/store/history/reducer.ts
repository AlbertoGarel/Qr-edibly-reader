import {
  AddHistoryAction, DeleteByDateHistory, DeleteHistoryAction,
  HistoryInUseState, HistoryListActions, UpdateItemNameHistory
} from "../../store/types";
import { HISTORY_LIST_ACTION_TYPES } from "../../store/history/actions";


export const initialState: HistoryInUseState | [] = [];

export const usedHistory = (
  state: HistoryInUseState = initialState,
  action: HistoryListActions
) => {
  const newState: HistoryInUseState = [...state]; // deep-cloning
  switch (action.type) {
    case HISTORY_LIST_ACTION_TYPES.ADD_HISTORY:
      // pay attention to type-casting on action
      const add_payload = <AddHistoryAction>action;
      const selectedElement = add_payload.historyData;
      return [...newState, selectedElement];
    case HISTORY_LIST_ACTION_TYPES.DELETE_HISTORY:
      const delete_payload = <DeleteHistoryAction>action;
      const delete_Element = delete_payload.id;
      return newState.filter((element) => element.id !== delete_Element);
    case HISTORY_LIST_ACTION_TYPES.ALL_DELETE_HISTORY:
      return [];
    case HISTORY_LIST_ACTION_TYPES.DELETE_BY_DATE:
      const delete_date_payload = <DeleteByDateHistory>action;
      const date_to_delete = delete_date_payload.date;
      return newState.filter(i => i.date !== date_to_delete);
    case HISTORY_LIST_ACTION_TYPES.UPDATE_ITEM:
      const update_item_payload = <UpdateItemNameHistory>action;
      const item_to_update = update_item_payload.params;
      console.log('to UPDATE', item_to_update)
      return newState.map(item => {
        if (item.id === item_to_update.id) {
          console.log('to UPDATE', item)
          return {
            ...item,
            ...item_to_update
          };
        } else {
          return item;
        }
      });
    // define rest of actions here
    default:
      return state;
  }
};