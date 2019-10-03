import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import PropTypes from 'prop-types';

import { Container, Divider, Header, Message, Form } from 'semantic-ui-react';

export const InputForm = ({
  textareaInput,
  handleInputChange,
  handleButtonSubmit,
  handleResetButton,
  placeValid,
  facePosition,
  xPosition,
  yPosition,
  error
}) => {
  return (
    <Container>
      <Divider hidden />
      <Header as='h1' dividing>
        Pacman Simulator
      </Header>
      <Message info>
        <Message.Header>
          <p>
            The source code of this tool can be found{' '}
            <a href='https://github.com/alun777/pacman' target='_blank'>
              HERE
            </a>
            .
          </p>
          <p>
            Instruction: create an application that can read in commands of the
            following form and rules.
          </p>
        </Message.Header>
        <Message.Item>
          <span>PLACE X,Y,F MOVE LEFT RIGHT REPORT</span>
        </Message.Item>
        <Message.Item>
          Commands are case-insensitive but be aware of the white space between
          them.{' '}
        </Message.Item>
        <p>
          {' '}
          Example:
          <p>PLACE 1,2,EAST MOVE MOVE LEFT MOVE REPORT</p>
          will give you
          <p>Output: 3,3,NORTH</p>
        </p>
      </Message>
      <Form onSubmit={() => handleButtonSubmit(textareaInput)}>
        <Form.TextArea
          name='input'
          placeholder='Input your commands here'
          rows='10'
          onChange={handleInputChange}
          value={textareaInput}
        />
        <Form.Group inline>
          <Form.Button primary>Submit</Form.Button>
          <Form.Button type='button' onClick={handleResetButton}>
            Reset
          </Form.Button>
        </Form.Group>
      </Form>
      <Message className={error ? 'error' : ''}>
        <p>Result:</p>
        {placeValid && !error && (
          <p>
            Output: {xPosition},{yPosition},{facePosition}
          </p>
        )}
        {error && <p>{error}</p>}
      </Message>
    </Container>
  );
};

export const mapStateToProps = state => ({
  textareaInput: state.getIn(['InputForm', 'textareaInput']),
  placeValid: state.getIn(['InputForm', 'placeValid']),
  facePosition: state.getIn(['InputForm', 'facePosition']),
  xPosition: state.getIn(['InputForm', 'xPosition']),
  yPosition: state.getIn(['InputForm', 'yPosition']),
  error: state.getIn(['InputForm', 'error'])
});

export const mapDispatchToProps = dispatch => ({
  handleInputChange(event) {
    event.persist();
    dispatch(actionCreators.handleInputChangeAction(event));
  },
  handleButtonSubmit(textareaInput) {
    dispatch(actionCreators.handleButtonSubmitAction(textareaInput));
  },
  handleResetButton() {
    dispatch(actionCreators.handleResetAction());
  }
});

InputForm.propTypes = {
  textareaInput: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleButtonSubmit: PropTypes.func.isRequired,
  handleResetButton: PropTypes.func.isRequired,
  placeValid: PropTypes.bool.isRequired,
  facePosition: PropTypes.string.isRequired,
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);
