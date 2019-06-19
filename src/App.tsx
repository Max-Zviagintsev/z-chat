import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import {RootState} from "./store/store";
import LoginComponent from './components/auth/login/LoginComponent';
import Register from './components/auth/register/RegisterComponent';
import HomeComponent from "./components/home/HomeComponent";
import {setUser, clearUser} from "./store/user/actions";
import {Route, Switch} from "react-router";

interface OwnProps {
    history: History;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

type State = Readonly<{}>;

class App extends PureComponent<Props, State> {
    readonly state: State = {};

    render() {
        const {history}: OwnProps = this.props;

        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={HomeComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isLoading: state.user.isLoading
});

const mapDispatchToProps = {setUser, clearUser};

export default connect(mapStateToProps, mapDispatchToProps)(App);

