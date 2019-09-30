import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOCATION_INPUT:
      return state.set('locationEntered', action.event.target.value);

    default:
      return state;
  }
};
