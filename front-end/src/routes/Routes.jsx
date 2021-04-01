import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./../pages/Dashboard";
import Signup from "./../pages/Signup";
import Login from "./../pages/Login";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Login />} />
      <Route path="/signup" render={() => <Signup />} />
      <Route path="*" render={() => <Dashboard />} />
    </Switch>
  );
};

export default Routes;
