export enum HISTORY_LIST_ACTION_TYPES {
  ADD_HISTORY = "HISTORY/ADD_HISTORY",
  DELETE_HISTORY = "HISTORY/DELETE_HISTORY",
}

export const addHistory = (history: object): { type: HISTORY_LIST_ACTION_TYPES.ADD_HISTORY; historyData: {} } => ({
  type: HISTORY_LIST_ACTION_TYPES.ADD_HISTORY,
  historyData: { ...history }
});
export const deleteHistory = (id: string): { type: HISTORY_LIST_ACTION_TYPES.DELETE_HISTORY; id: string } => ({
  type: HISTORY_LIST_ACTION_TYPES.DELETE_HISTORY,
  id: id
});
