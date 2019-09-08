import {action} from 'typesafe-actions'
import {UserActionTypes} from './types'

export const setUser = () => action(UserActionTypes.SET_USER);
export const clearUser = () => action(UserActionTypes.CLEAR_USER);