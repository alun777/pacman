import { constants } from './index';

//Handle textarea input change
export const handleInputChangeAction = event => ({
  type: constants.CHANGE_INPUT_VALUE,
  event
});

// Set the final position as the output
const updateNewPosition = positionOutput => ({
  type: constants.CHANGE_POSITION_DATA,
  positionOutput
});

//Handle LEFT, RIGHT, MOVE commands
const handleCommands = (positionOutput, formatCommands) => {
  //Start to iterate from commands after PLACE value
  for (let i = 2; i < formatCommands.length; i++) {
    //Change face position if there is a LEFT command
    if (formatCommands[i] === 'LEFT') {
      switch (positionOutput.facePosition) {
        case 'NORTH':
          positionOutput.facePosition = 'WEST';
          break;
        case 'SOUTH':
          positionOutput.facePosition = 'EAST';
          break;
        case 'EAST':
          positionOutput.facePosition = 'NORTH';
          break;
        case 'WEST':
          positionOutput.facePosition = 'SOUTH';
          break;
      }
    }

    //Change face position if there is a RIGHT command
    if (formatCommands[i] === 'RIGHT') {
      switch (positionOutput.facePosition) {
        case 'NORTH':
          positionOutput.facePosition = 'EAST';
          break;
        case 'SOUTH':
          positionOutput.facePosition = 'WEST';
          break;
        case 'EAST':
          positionOutput.facePosition = 'SOUTH';
          break;
        case 'WEST':
          positionOutput.facePosition = 'NORTH';
          break;
      }
    }

    /*
      Change to new position when there is a MOVE command
      Ignore MOVE commands that move off the grid 
    */
    if (formatCommands[i] === 'MOVE') {
      switch (positionOutput.facePosition) {
        case 'NORTH':
          if (positionOutput.yPosition === 4) {
            break;
          } else {
            positionOutput.yPosition += 1;
            break;
          }
        case 'WEST':
          if (positionOutput.xPosition === 0) {
            break;
          } else {
            positionOutput.xPosition -= 1;
            break;
          }
        case 'SOUTH':
          if (positionOutput.yPosition === 0) {
            break;
          } else {
            positionOutput.yPosition -= 1;
            break;
          }
        case 'EAST':
          if (positionOutput.xPosition === 4) {
            break;
          } else {
            positionOutput.xPosition += 1;
            break;
          }
      }
    }

    //Return output when there is a REPORT command
    if (formatCommands[i] === 'REPORT') {
      return positionOutput;
    }
  }
};

export const handleButtonSubmitAction = textareaInput => {
  return dispatch => {
    //Set default position value
    let positionOutput = {
      facePosition: '',
      xPosition: 0,
      yPosition: 0,
      placeValid: false
    };

    //Check if commands can be converted into an array
    const commands = textareaInput.search(/\s/g);
    if (commands === -1) {
      dispatch(handleErrorMessage('Please enter some valid commands.'));
      return;
    }

    //Format commands in an array in order to iterate
    let formatCommands = textareaInput
      .replace(/\s/g, ' ')
      .toUpperCase()
      .split(' ');

    //Ignore all commands until there is a PLACE command
    const lastPlaceIndex = formatCommands.lastIndexOf('PLACE');
    if (lastPlaceIndex !== -1) {
      formatCommands = formatCommands.slice(lastPlaceIndex);
    }

    /*Check if the place command is valid and not off the 5*5 grid
     placePosition[0] represents x position
     placePosition[1] represents y position
     placePosition[2] represents face position
    */
    let placePosition = formatCommands[1].split(',');
    if (
      placePosition[0] <= 4 &&
      placePosition[0] >= 0 &&
      placePosition[1] <= 4 &&
      placePosition[1] >= 0 &&
      ['NORTH', 'SOUTH', 'EAST', 'WEST'].indexOf(placePosition[2] !== -1) &&
      !positionOutput.placeValid
    ) {
      positionOutput = {
        facePosition: placePosition[2],
        xPosition: parseInt(placePosition[0], 10),
        yPosition: parseInt(placePosition[1], 10),
        placeValid: true
      };
    } else {
      //Issue error message when there is no valid place entered
      dispatch(
        handleErrorMessage('Please enter a valid PLACE in your commands.')
      );
      return;
    }

    //handle rest commands after a valid PLACE
    positionOutput = handleCommands(positionOutput, formatCommands);

    //Issue error message if there is no REPORT command
    if (positionOutput) {
      dispatch(updateNewPosition(positionOutput));
    } else {
      dispatch(
        handleErrorMessage('Please have a REPORT command to show the result')
      );
    }
  };
};

const handleErrorMessage = error => {
  return {
    type: constants.CHANGE_ERROR_MESSAGE,
    error
  };
};

export const handleResetAction = () => ({
  type: constants.RESET_INPUT
});
