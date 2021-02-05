import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './template.constant';

const initialState = {
  isFetching: true,
  isFetched: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_FETCHING: {
    return {
      ...state,
      isFetching: true,
    };
  }
  case ACTION_FETCHED: {
    return {
      ...state,
      isFetching: false,
      isFetched: true,
      data: {...action.payload},
    };
  }
  case ACTION_FETCH_FAIL: {
    return {
      ...state,
      isFetched: false,
      isFetching: false,
    };
  }
  default:
    return state;
  }
};
