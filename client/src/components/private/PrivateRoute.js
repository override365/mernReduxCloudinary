import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest}
        render={props => auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

