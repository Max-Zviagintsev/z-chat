import {UserState, UserActionTypes} from './types';

export const initialState: UserState = {
    currentUser: null,
    isLoading: true
};

export function userReducer(
    state = initialState,
    action: any
): UserState {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload.currentUser
            }
        }
        case UserActionTypes.CLEAR_USER: {
            return {
                ...state,
                isLoading: false
            }
        }
        default:
            return state;
    }
}