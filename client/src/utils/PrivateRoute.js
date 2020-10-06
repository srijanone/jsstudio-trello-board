import React from 'react';
import { Route, Redirect } from 'react-router';

function isAuthenticated() {
    return true;

}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;