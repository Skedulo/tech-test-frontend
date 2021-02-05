import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './template.constant';
import {api} from './template.services';

export const actionFetching = () => ({
  type: ACTION_FETCHING,
});

export const actionFetched = payload => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = () => ({
  type: ACTION_FETCH_FAIL,
});

export const actionFetch = () => async (dispatch, getState) => {
  try {
    await dispatch(actionFetching());
    const {data} = await api();
    await dispatch(actionFetched(data));
  } catch (error) {
    await dispatch(actionFetchFail());
  }
};
