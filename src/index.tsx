import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Demo from "./views/components/login/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./views/components/home/index";
import PrivateRoute from '../src/views/services/PrivateRoute';
import useAuth from './views/hooks/useAuth';
const [auth] = useAuth();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Demo} />
        <PrivateRoute path ="/home" isAuthenticated={auth} component={Home}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
