import {createStore, Store, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";
import {RouterState, connectRouter, routerMiddleware} from 'connected-react-router';
import {all, fork} from 'redux-saga/effects';
import {History} from 'history';
import {userReducer} from "./user/reducer";
import {watchUserActions} from "./user/saga";

const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
});

export interface RootState {
    router: RouterState,
    user: any
}

export function* rootSaga() {
    yield all([fork(watchUserActions)])
}

export default function configureStore(history: History): Store<RootState> {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({});
    // create the redux-saga middleware
    const sagaMiddleware = createSagaMiddleware();

    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore(
        rootReducer(history),
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);
    return store
}