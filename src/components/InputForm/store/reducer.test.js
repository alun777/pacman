import { fromJS } from 'immutable';
import { reducer, constants } from './index';

const defaultState = {
  textareaInput: '',
  facePosition: '',
  xPosition: 0,
  yPosition: 0,
  placeValid: false,
  error: ''
};

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(fromJS(defaultState));
});

describe('it should handle correct action types', () => {
  it('should handle constants.CHANGE_INPUT_VALUE', () => {
    expect(
      reducer(fromJS(defaultState), {
        type: constants.CHANGE_INPUT_VALUE,
        event: { target: { value: 'PLACE 2,2,SOUTH REPORT TEST' } }
      })
    ).toEqual(
      fromJS({ ...defaultState, textareaInput: 'PLACE 2,2,SOUTH REPORT TEST' })
    );
  });

  it('should handle constants.CHANGE_POSITION_DATA', () => {
    expect(
      reducer(fromJS(defaultState), {
        type: constants.CHANGE_POSITION_DATA,
        positionOutput: {
          textareaInput: 'PLACE 1,2SOUTH',
          facePosition: 'NORTH',
          xPosition: 2,
          yPosition: 3,
          placeValid: true
        }
      })
    ).toEqual(
      fromJS({
        ...defaultState,
        textareaInput: 'PLACE 1,2SOUTH',
        facePosition: 'NORTH',
        xPosition: 2,
        yPosition: 3,
        placeValid: true
      })
    );
  });

  it('should handle constants.CHANGE_ERROR_MESSAGE', () => {
    expect(
      reducer(fromJS(defaultState), {
        type: constants.CHANGE_ERROR_MESSAGE,
        error: true
      })
    ).toEqual(fromJS({ ...defaultState, error: true }));
  });

  it('should handle constants.RESET_INPUT', () => {
    expect(
      reducer(fromJS(defaultState), {
        type: constants.RESET_INPUT
      })
    ).toEqual(fromJS({ ...defaultState }));
  });
});
