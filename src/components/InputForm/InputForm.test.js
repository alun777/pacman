import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fromJS } from 'immutable';
import { InputForm, mapStateToProps, mapDispatchToProps } from './InputForm';
import { actionCreators } from './store/index';
import { exportAllDeclaration } from '@babel/types';
import { Container, Divider, Header, Message, Form } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    textareaInput: 'PLACE 1,2,NORTH REPORT',
    handleInputChange: jest.fn(),
    handleButtonSubmit: jest.fn(),
    handleResetButton: jest.fn(),
    placeValid: true,
    facePosition: 'NORTH',
    xPosition: 1,
    yPosition: 2,
    error: ''
  };

  const propsError = {
    ...props,
    error: 'error'
  };

  const enzymeWrapper = shallow(<InputForm {...props} />);
  const enzymeWrapperWithError = shallow(<InputForm {...propsError} />);

  return {
    props,
    enzymeWrapper,
    enzymeWrapperWithError
  };
}

describe('Testing component', () => {
  it('should render self', () => {
    const { enzymeWrapper, enzymeWrapperWithError } = setup();

    expect(enzymeWrapper.find('Container')).toHaveLength(1);
    expect(enzymeWrapper.find('Divider')).toHaveLength(1);
    expect(enzymeWrapper.find('Header')).toHaveLength(1);
    expect(enzymeWrapper.find('Message')).toHaveLength(2);
    expect(enzymeWrapper.find('Form')).toHaveLength(1);

    expect(enzymeWrapper.find('a').text()).toBe('HERE');

    expect(
      enzymeWrapper
        .find(Message)
        .last()
        .hasClass('')
    ).toBe(true);

    expect(
      enzymeWrapperWithError
        .find(Message)
        .last()
        .hasClass('error')
    ).toBe(true);

    expect(enzymeWrapper.find(Form.TextArea).props().placeholder).toEqual(
      'Input your commands here'
    );
  });

  it('should call the correct function when form submitted', () => {
    const { enzymeWrapper, props } = setup();

    enzymeWrapper.find(Form).simulate('submit');
    expect(props.handleButtonSubmit).toHaveBeenCalled();
  });
});

describe('Testing mapStateToProps', () => {
  it('should render self', () => {
    const { props } = setup();

    expect(
      mapStateToProps(fromJS({ InputForm: { ...props } })).textareaInput
    ).toEqual('PLACE 1,2,NORTH REPORT');

    expect(
      mapStateToProps(fromJS({ InputForm: { ...props } })).placeValid
    ).toEqual(true);

    expect(
      mapStateToProps(fromJS({ InputForm: { ...props } })).facePosition
    ).toEqual('NORTH');

    expect(
      mapStateToProps(fromJS({ InputForm: { ...props } })).xPosition
    ).toEqual(1);

    expect(
      mapStateToProps(fromJS({ InputForm: { ...props } })).yPosition
    ).toEqual(2);

    expect(mapStateToProps(fromJS({ InputForm: { ...props } })).error).toEqual(
      ''
    );
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should dispatch the correct action', () => {
    const dispatch = jest.fn();
    const event = {};
    const textareaInput = 'MockText';
    event.persist = jest.fn();

    mapDispatchToProps(dispatch).handleInputChange(event);
    expect(dispatch).toHaveBeenCalledWith(
      actionCreators.handleInputChangeAction(event)
    );
    expect(dispatch).toHaveBeenCalledTimes(1);

    mapDispatchToProps(dispatch).handleButtonSubmit(textareaInput);

    expect(dispatch).toHaveBeenCalledTimes(2);

    mapDispatchToProps(dispatch).handleResetButton();
    expect(dispatch).toHaveBeenCalledWith(actionCreators.handleResetAction());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
