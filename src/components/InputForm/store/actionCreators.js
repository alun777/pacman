import { constants } from './index';

export const handleInputChangeAction = event => ({
  type: constants.CHANGE_INPUT_VALUE,
  event
});
