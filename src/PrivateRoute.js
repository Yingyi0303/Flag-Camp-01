import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure this path is correct

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
