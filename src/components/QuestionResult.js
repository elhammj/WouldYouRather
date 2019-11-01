import React, {Component} from 'react'
import {connect} from 'react-redux'
import Errorpage from './Errorpage'
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../css/style.css'
import { Link } from 'react-router-dom'

class QuestionResult extends Component {


calculateTotalVotes = (questions,qid) => {
	let optionOneV = questions[qid].optionOne.votes.length
	let optionTwoV = questions[qid].optionTwo.votes.length
	return optionOneV+optionTwoV
}

calculateOptionV = (questions,qid,option) => {
	const optionV = (questions[qid])[option].votes.length
	const optionVP = (optionV/this.calculateTotalVotes(questions,qid))*100
	return optionVP
}

	render() {
		const {questions, answers} = this.props
		const longPath = this.props.location.pathname
		const splitPath = longPath.split('/')
		const qid = splitPath[2]
		//Handle erros for questions that are not there
		if (questions[qid]===undefined){
		    return <Errorpage/>
		}
		const answerSelected = answers[qid]
		return(
		<Container className="componentLength">
		<Row>
			<Col sm={12}>
				Would You Rather ... ?
				{answerSelected==='optionOne'?
				<h1 className="optionSelected">{questions[qid].optionOne.text}:{this.calculateOptionV(questions,qid,"optionOne")}% --> This is your ANSWER</h1>:
				<h1>{questions[qid].optionOne.text}:{this.calculateOptionV(questions,qid,"optionOne")}%</h1>
				}
				{answerSelected==='optionTwo'?
				<h1 className="optionSelected">{questions[qid].optionTwo.text}:{this.calculateOptionV(questions,qid,"optionTwo")}% --> This is your ANSWER</h1>:
				<h1>{questions[qid].optionTwo.text}:{this.calculateOptionV(questions,qid,"optionTwo")}%</h1>}
			</Col>
		</Row>
		<Row>
			<Col sm={6}>
				<Link className="button" to="/">Back To Home</Link>
			</Col>
		</Row>
		</Container>)

}}

const mapStateToProps = ({questions,authedUser}, qid) => {
    return {
    	answers: authedUser.id.answers,
    	questions,
    	qid,
       	authedUser
    }
}

export default connect(mapStateToProps)(QuestionResult) 