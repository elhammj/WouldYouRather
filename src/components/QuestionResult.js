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
	return [(optionOneV+optionTwoV), optionOneV, optionOneV]
}


calculateOptionV = (questions,qid,option) => {
	const optionV = (questions[qid])[option].votes.length
	const optionVP = (optionV/(this.calculateTotalVotes(questions,qid)[0]))*100
	return optionVP
}

	render() {
		const {questions, answers, users} = this.props
		const longPath = this.props.location.pathname
		const splitPath = longPath.split('/')
		const qid = splitPath[2]
		const author = users[questions[qid].author].name
		const authorAvatar = users[questions[qid].author].avatarURL
		const timestamp = questions[qid].timestamp
		//Handle erros for questions that are not there
		if (questions[qid]===undefined){
		    return <Errorpage/>
		}
		const answerSelected = answers[qid]
		return(
		<Container className="componentLength">
		<h1>Results ... </h1>
		<Row>
			<Col sm={4}>
			            <img alt={author} src={authorAvatar} className="avatar"/>
			            <div>Asked by: <span>{author}</span></div>
			            <div> <span> Created: {timestamp} </span> </div>
			</Col>
			<Col sm={8}>
				Would You Rather ... ?
				{answerSelected==='optionOne'?
				<p className="optionSelected">Option One: {questions[qid].optionOne.text} <br/> Percentage: {this.calculateOptionV(questions,qid,"optionOne")}%  <br/> Number of votes {this.calculateTotalVotes(questions,qid)[1]} --> This is your ANSWER</p>:
				<p>Option One: {questions[qid].optionOne.text} <br/> Percentage: {this.calculateOptionV(questions,qid,"optionOne")}% <br/> Number of votes {this.calculateTotalVotes(questions,qid)[1]}</p>
				}
				{answerSelected==='optionTwo'?
				<p className="optionSelected">Option Two: {questions[qid].optionTwo.text} <br/> Percentage: {this.calculateOptionV(questions,qid,"optionTwo")}% <br/> Number of votes {this.calculateTotalVotes(questions,qid)[2]} --> This is your ANSWER</p>:
				<p>Option Two: {questions[qid].optionTwo.text} <br/> Percentage: {this.calculateOptionV(questions,qid,"optionTwo")}% <br/> Number of votes {this.calculateTotalVotes(questions,qid)[2]} </p>}
			</Col>
		</Row>
		<Row>
			<Col sm={6}>
				<Link className="button" to="/">Back To Home</Link>
			</Col>
		</Row>
		</Container>)

}}

const mapStateToProps = ({questions,users, authedUser}, qid) => {
    return {
    	answers: authedUser.id.answers,
    	questions,
    	qid,
       	authedUser,
       	users
    }
}

export default connect(mapStateToProps)(QuestionResult) 