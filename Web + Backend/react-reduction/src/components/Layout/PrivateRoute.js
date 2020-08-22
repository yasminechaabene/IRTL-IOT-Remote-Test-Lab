import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from 'components/UserFunctions';
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('usertoken') ? (
                <Component {...props} />
            ) : (
                    <Route 
                        {...window.location.pathname = '/login'}
                        
                    />
                
                )
        }
    />
);
export default PrivateRoute;