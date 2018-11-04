import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { dataManager } from '../dataManager'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        dataManager.getCurrentUser()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)