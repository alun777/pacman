import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actionCreators, constants } from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should create an action to handle input change', () => {
  const event = 'PLACE XYF';
  const expectedAction = {
    type: constants.CHANGE_INPUT_VALUE,
    event,
  };
  expect(actionCreators.handleInputChangeAction(event)).toEqual(expectedAction);
});

it('should create an action to reset input', () => {
  const expectedAction = {
    type: constants.RESET_INPUT,
  };
  expect(actionCreators.handleResetAction()).toEqual(expectedAction);
});

describe('handle submit button actions', () => {
  it('creates error message when there is no input value', () => {
    const store = mockStore({});

    store.dispatch(actionCreators.handleButtonSubmitAction(''));

    expect(store.getActions()).toEqual([
      {
        type: constants.CHANGE_ERROR_MESSAGE,
        error: 'Please enter some valid commands.',
      },
    ]);
  });

  it('creates error message when PLACE command is off the grid', () => {
    const store = mockStore({});

    store.dispatch(
      actionCreators.handleButtonSubmitAction('PLACE 4,5,EAST REPORT'),
    );

    expect(store.getActions()).toEqual([
      {
        type: constants.CHANGE_ERROR_MESSAGE,
        error: 'Please enter a valid PLACE in your commands.',
      },
    ]);
  });

  it('creates error message when there is no REPORT command', () => {
    const store = mockStore({});

    store.dispatch(
      actionCreators.handleButtonSubmitAction('PLACE 2,2,EAST MOVE LEFT'),
    );

    expect(store.getActions()).toEqual([
      {
        type: constants.CHANGE_ERROR_MESSAGE,
        error: 'Please have a REPORT command to show the result',
      },
    ]);
  });

  it('should ignore all commands before the last PLACE command', () => {
    const store = mockStore({});

    store.dispatch(
      actionCreators.handleButtonSubmitAction(
        'PLACE 2,2,EAST MOVE  PLACE 3,0,WEST LEFT REPORT',
      ),
    );

    expect(store.getActions()).toEqual([
      {
        type: constants.CHANGE_POSITION_DATA,
        positionOutput: {
          facePosition: 'SOUTH',
          xPosition: 3,
          yPosition: 0,
          placeValid: true,
        },
      },
    ]);
  });

  it('should generate right output when commands are correct', () => {
    const store = mockStore({});

    store.dispatch(
      actionCreators.handleButtonSubmitAction(
        `
          PLACE 2,2,EAST LEft MOVE lEFt  Move    lEfT  mOVE LEFT Move  RIGHT moVE right  MOve Right  Move RiGhT
          MOVe
          RIGHT MOVE

          LEFT MOVE MOVE MOVE RIGHT MOVE MOVE right MOVE MOVE MOVE MOVE MOVE MOVE RIGHT MOVE MOVE MOVE MOVE
          MOVE MOVE MOVE MOVE MOVE

          REPORT
        `,
      ),
    );

    expect(store.getActions()).toEqual([
      {
        type: constants.CHANGE_POSITION_DATA,
        positionOutput: {
          facePosition: 'NORTH',
          xPosition: 0,
          yPosition: 4,
          placeValid: true,
        },
      },
    ]);
  });
});
