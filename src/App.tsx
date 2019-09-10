import React, {FunctionComponent} from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {History} from 'history';

import LoginComponent from './components/auth/login/LoginComponent';
import Register from './components/auth/register/RegisterComponent';
import HomeComponent from "./components/home/HomeComponent";
import {setUser, clearUser} from "./store/user/actions";
import {Route, Switch} from "react-router";
import {shallowEqual, useSelector} from 'react-redux';

interface Props {
    history: History;
}

export const App: FunctionComponent<Props> = (props) => {
    const {history}: Props = props;
    const userSet = useSelector(setUser, shallowEqual);
    const userClear = useSelector(clearUser, shallowEqual);

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={HomeComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </ConnectedRouter>
    )
};

