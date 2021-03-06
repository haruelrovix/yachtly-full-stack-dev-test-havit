import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserPage from '../user/UserPage';
import UserList from '../user/UserList';
import ModalDialog from '../modal/ModalDialog';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string '/'
const Main = () => (
  <main>
    <ModalDialog />
    <Switch>
      <Route exact path='/' component={UserList}/>
      <Route path='/user' component={UserPage}/>
    </Switch>
  </main>
);

export default Main;
