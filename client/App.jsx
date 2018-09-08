import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';
import { loadUsers } from './actions/userActions';

import UserList from './components/user/UserList';
import UserForm from './components/user/UserForm';

const store = configureStore();

store.dispatch(loadUsers());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={UserList}/>
            <Route path='/user/:id' component={UserForm}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
