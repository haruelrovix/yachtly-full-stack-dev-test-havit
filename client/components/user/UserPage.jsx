import React from "react";
import { Switch, Route } from 'react-router-dom';

import UserForm from '../user/UserForm';

const UserPage = () => (
  <div>
    <Switch>
      <Route exact path='/user' component={UserForm}/>
      <Route path='/user/:id' component={UserForm}/>
    </Switch>
  </div>
);

export default UserPage;
