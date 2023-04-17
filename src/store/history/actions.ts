export enum HISTORY_LIST_ACTION_TYPES {
  ADD_HISTORY = "HISTORY/ADD_HISTORY",
  DELETE_HISTORY = "HISTORY/DELETE_HISTORY",
  ALL_DELETE_HISTORY = "HISTORY/ALL_DELETE_HISTORY",
  DELETE_BY_DATE = "HISTORY/DELETE_BY_DATE",
  UPDATE_ITEM = "HISTORY/UPDATE_ITEM"
}

export const addHistory = (history: object): { type: HISTORY_LIST_ACTION_TYPES.ADD_HISTORY; historyData: {} } => ({
  type: HISTORY_LIST_ACTION_TYPES.ADD_HISTORY,
  historyData: { ...history }
});
export const deleteHistory = (id: string | number[]): { type: HISTORY_LIST_ACTION_TYPES.DELETE_HISTORY; id: string | number[] } => ({
  type: HISTORY_LIST_ACTION_TYPES.DELETE_HISTORY,
  id: id
});
export const allDeleteHistory = (): { type: HISTORY_LIST_ACTION_TYPES.ALL_DELETE_HISTORY } => ({
  type: HISTORY_LIST_ACTION_TYPES.ALL_DELETE_HISTORY
});
export const deleteByDate = (date: string): { type: HISTORY_LIST_ACTION_TYPES.DELETE_BY_DATE; date: string } => ({
  type: HISTORY_LIST_ACTION_TYPES.DELETE_BY_DATE,
  date: date
});
export const updateCustomNameHistory = (id: number[], name: string): { type: HISTORY_LIST_ACTION_TYPES.UPDATE_ITEM; params: { id: number[], name: string } } => ({
  type: HISTORY_LIST_ACTION_TYPES.UPDATE_ITEM,
  params: {id, name}

});
