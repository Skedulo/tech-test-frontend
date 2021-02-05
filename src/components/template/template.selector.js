import {createSelector} from 'reselect';

export const templateSelector = createSelector(
  state => state.template,
  template => template,
);
