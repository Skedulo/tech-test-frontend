import { SET_SEARCH_TERM } from "./action-types";
import { combineReducers } from "redux";

const initSearch = { searchTerm: "" };
function search(state = initSearch, action) {
  switch (action.type) {
    case SET_SEARCH_TERM:
      const { searchTerm } = action;
      return { ...state, searchTerm };
    default:
      return state;
  }
}
export default combineReducers({ search });
