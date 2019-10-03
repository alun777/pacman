import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({
  textareaInput: '',
  facePosition: '',
  xPosition: 0,
  yPosition: 0,
  placeValid: false,
  error: ''
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_INPUT_VALUE:
      return state.set('textareaInput', action.event.target.value);

    case constants.CHANGE_POSITION_DATA:
      return state.merge({
        ...action.positionOutput,
        error: ''
      });

    case constants.CHANGE_ERROR_MESSAGE:
      return state.set('error', action.error);

    case constants.RESET_INPUT:
      return defaultState;

    default:
      return state;
  }
};
