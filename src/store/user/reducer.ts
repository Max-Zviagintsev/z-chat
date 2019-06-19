import {UserState, SET_USER, CLEAR_USER} from './types';
import { Action } from "redux";

export const initialState: UserState = {
    currentUser: null,
    isLoading: true
};

export function userReducer(
    state = initialState,
    action: Action
): UserState {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload.currentUser
            }
        }
        case CLEAR_USER: {
            return {
                ...state,
                isLoading: false
            }
        }
        default:
            return state;
    }
}