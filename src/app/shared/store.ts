import { combineReducers } from "redux";

export interface AppStateStore { };

export let allReducers = {};

export function mergeReducers(ngRedux, newReducers) {
  allReducers = { ...allReducers, ...newReducers };
  ngRedux["_store"].replaceReducer(combineReducers(allReducers));
}
