import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({
  textareaInput: '',
  facePosition: '',
  xPosition: 0,
  yPosition: 0,
  placed: false,
  error: ''
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_INPUT_VALUE:
      return state.set('textareaInput', action.event.target.value);

    default:
      return state;
  }
};
