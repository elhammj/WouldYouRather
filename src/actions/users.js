/* 
Action Creator
*/
import {_getUsers} from "../utils/_DATA.js"

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'
export const USER_ADD_ANSWER = 'USER_ADD_ANSWER'

export function receiveUsers (users){
	return {
		type: RECEIVE_USERS,
		users
	}
}

export function userAddQuestion(question){
	return {
        type: USER_ADD_QUESTION,
        question
    }
}

export function userAddAnswer(qid, authedUser, answer){
	return {
        type: USER_ADD_ANSWER,
        qid,
        authedUser,
        answer,
    }
}


export function handleGetUsers() {
    return (dispatch) => {
        return _getUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
            })
    }
}