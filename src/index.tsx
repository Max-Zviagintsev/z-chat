import React, {PureComponent} from 'react';
import {Provider, connect} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import {RootState} from "./store/store";
import configureStore from './store/store';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';

import App from './App';
import LoginComponent from './components/auth/login/LoginComponent';
import Register from './components/auth/register/RegisterComponent';
import {setUser, clearUser} from "./store/user/actions";


const store = configureStore();

interface OwnProps {
}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Root extends PureComponent<Props> {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/register" component={Register}/>
            </Switch>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: state.user.isLoading
    };
};

const mapDispatchToProps = {
    setUser, clearUser
};

const RootWithAuth = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Root)
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth/>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

