import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store/configureStore';
import { loadUsers } from './actions/userActions';

import UserList from './components/user/UserList';

const store = configureStore();

store.dispatch(loadUsers());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
