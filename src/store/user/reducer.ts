import {Reducer} from 'redux'
import {UserState, SET_USER, CLEAR_USER} from './types'

export const initialState: UserState = {
    currentUser: null,
    isLoading: true
};

const reducer: Reducer<UserState> = (state = initialState, action) => {
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
        default: {
            return state
        }
    }
};

export {reducer as userReducer}