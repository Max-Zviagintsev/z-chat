import {action} from 'typesafe-actions'
import {SET_USER, CLEAR_USER} from './types'

export const setUser = () => action(SET_USER);
export const clearUser = () => action(CLEAR_USER);