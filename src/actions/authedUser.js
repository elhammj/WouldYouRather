/* 
Action Creator: For Authed USer to login and logout
*/
import {_getUser} from '../utils/_DATA.js';

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER'

export let setAuthedUser = (id) => {
	return{
		type: SET_AUTHED_USER,
		authenticated: true,
		id,
	}
}

export let logoutAuthedUser = () => {
  return {
    type: LOGOUT_AUTHED_USER,
    authenticated: false,
    id: ''
  }
}

export let handleUserLogin = (id) => {
    return (dispatch) => {
        _getUser(id).then((user) => {
            dispatch(setAuthedUser(user))
        })
    }
}

export let handleUserLogout = () => {
    return (dispatch) => {
        dispatch(logoutAuthedUser());
        window.location.href = '/';
    }
}