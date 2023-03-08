import React from "react";
import { Route, Redirect } from "react-router-dom";
import {observer} from "mobx-react";

export const PrivateRoute = observer(({ component: Component, isAuthenticated, ...rest }) => {
    return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === true) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }
      }}
    />
  );
});
