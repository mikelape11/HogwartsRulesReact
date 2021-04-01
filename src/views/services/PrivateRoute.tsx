import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ component, ...rest }: any) => {
  const [auth] = useAuth();
  const routeComponent = (props: any) =>
    auth ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};
export default PrivateRoute;
