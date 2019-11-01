import {getInitialData} from '../utils/api'
import {_saveQuestion, _saveQuestionAnswer } from '../utils/_DATA.js'
import {receiveUsers, userAddQuestion, userAddAnswer} from '../actions/users'
import {receiveQuestions,answerQuestion,addQuestion} from '../actions/questions'

//const AUTHED_ID = 'tylermcginnis'


export let handleInitialData = () => {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
    }
}

export let handleAnswerQuestion = (qid,answer, authedUser) => {
	return (dispatch) =>{
		_saveQuestionAnswer({
            authedUser, qid, answer
        })
		.then(()=>{
            console.log("then" + qid,authedUser,answer)
			dispatch(answerQuestion(qid,authedUser,answer))
            dispatch(userAddAnswer(qid,authedUser,answer))
		})
    }
}


export let handleAddQuestion = (optionOne, optionTwo, authedUser, callback) => {
    return (dispatch) => {
        _saveQuestion({
            optionOneText:optionOne,
            optionTwoText:optionTwo,
            author:authedUser,
        }).then((question) => {
            dispatch(userAddQuestion(question))
            dispatch(addQuestion(question))
        }).then(callback);
    }
}