import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Demo from "./views/components/login/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./views/components/home/index";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Demo} />
        <Route path="/home"  component={Home}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
