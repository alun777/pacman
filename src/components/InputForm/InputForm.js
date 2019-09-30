import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import PropTypes from 'prop-types';

import { Container, Divider, Header, Message, Form } from 'semantic-ui-react';

const InputForm = ({
  textareaInput,
  handleInputChange,
  handleButtonSubmit
}) => {
  return (
    <Container>
      <Divider hidden />
      <Header as='h1' dividing>
        Pacman Simulator
      </Header>
      <Message info>
        <p>
          The source code of this tool can be found{' '}
          <a href='https://github.com/alun777/react-geocode' target='_blank'>
            HERE
          </a>
          .
        </p>
        <p>Instruction: </p>
      </Message>
      <Form onSubmit={() => handleButtonSubmit(textareaInput)}>
        <Form.TextArea
          name='input'
          placeholder='Input here'
          onChange={handleInputChange}
          value={textareaInput}
        />
        <Form.Group inline>
          <Form.Button primary>Submit</Form.Button>
          <Form.Button>Reset</Form.Button>
        </Form.Group>
      </Form>
      <Message>
        <Message.Header>Form data:</Message.Header>
      </Message>
    </Container>
  );
};

const handleCommands = textareaInput => {
  let commandArray = textareaInput.replace(/\n/g, ' ').split(' ');
  console.log(commandArray);
};

export const mapStateToProps = state => ({
  textareaInput: state.getIn(['InputForm', 'textareaInput'])
});

export const mapDispatchToProps = dispatch => ({
  handleInputChange(event) {
    dispatch(actionCreators.handleInputChangeAction(event));
  },
  handleButtonSubmit(textareaInput) {
    handleCommands(textareaInput);

    // const action = {};
    // dispatch(action);
  }
});

InputForm.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);
