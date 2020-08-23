import { SET_SEARCH_TERM } from "./action-types";

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});
