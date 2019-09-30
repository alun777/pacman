import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';

import InputForm from './components/InputForm/InputForm';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <InputForm />
    </Fragment>
  </Provider>
);

export default App;
