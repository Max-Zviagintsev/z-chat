import {put, takeEvery} from 'redux-saga/effects';
import {UserActionTypes} from "./types";

function* setUser(payload: any) {
    yield put({
        type: UserActionTypes.SET_USER,
        payload: payload
    })
}

function* clearUser(payload: any) {
    yield put({
        type: UserActionTypes.CLEAR_USER,
        payload: payload
    })
}

export function* watchUserActions() {
    yield takeEvery(UserActionTypes.SET_USER, setUser);
    yield takeEvery(UserActionTypes.CLEAR_USER, clearUser);
}