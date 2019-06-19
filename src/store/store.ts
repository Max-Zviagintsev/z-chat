import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import {userReducer} from "./user/reducer";

export const history = createBrowserHistory();

const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer(history),
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}