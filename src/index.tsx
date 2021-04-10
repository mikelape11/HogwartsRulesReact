import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Demo from "./views/components/login/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./views/components/home/index";
import PrivateRoute from "../src/views/services/PrivateRoute";
import { Provider } from "react-redux";
import createStore from "./views/store/index";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={createStore}> */}
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Demo} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
