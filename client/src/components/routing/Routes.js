import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { default as Dashboard } from '../dashboard';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
};

export default Routes;
