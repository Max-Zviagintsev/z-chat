export interface UserState {
    readonly currentUser: any,
    readonly isLoading: boolean
}

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER'
}