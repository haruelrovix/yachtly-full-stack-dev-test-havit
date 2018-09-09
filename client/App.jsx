import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store/configureStore';
import { loadUsers } from './actions/userActions';

import Header from './components/header/Header';
import Main from './components/main/Main';

const store = configureStore();

store.dispatch(loadUsers());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
