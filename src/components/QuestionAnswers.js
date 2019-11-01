import React, {Component} from 'react'
import {connect} from 'react-redux'
import Errorpage from './Errorpage'
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../css/style.css'
import { Redirect } from 'react-router-dom'
import {handleAnswerQuestion} from '../actions/shared'

class QuestionAnswers extends Component {

state ={
	selectedOption: '',
	answerSubmitted: false
}

handleOptionChange = (event) => {
	this.setState({
		selectedOption: event.target.value
	})
}



handleSubmit = (event,qid) => {
	event.preventDefault();
    const { authedUser, dispatch } = this.props
    const { selectedOption } = this.state
    //Make sure that you passed authedUser id only
    dispatch(handleAnswerQuestion(qid,selectedOption,authedUser.id.id))
    this.setState({
  		selectedOption:'',
  		answerSubmitted: true
  	})

}


	render() {
		const {questions} = this.props
		const {answerSubmitted} = this.state
		const longPath = this.props.location.pathname
		const splitPath = longPath.split('/')
		const qid = splitPath[2]
		//Handle erros for questions that are not there
		if (questions[qid]===undefined){
		    return <Errorpage/>
		}
		if (answerSubmitted === true) {
            return <Redirect to={`/results/${qid}`}/>;
        }
		return(
		<Container className="componentLength">
				<Row>
					<Col sm={12}>
						Would You Rather ... ?
						<fieldset id="answer">
							<div>
					            <input type="radio" value='optionOne' name="answer" onChange={this.handleOptionChange}/>
					            {questions[qid].optionOne.text}
					        </div>
					        <label> OR </label>
					        <div>
					            <input type="radio" value='optionTwo' name="answer" onChange={this.handleOptionChange}/>
					            {questions[qid].optionTwo.text}
					        </div>
				        </fieldset>
				        <Button className="button" onClick={(event) => this.handleSubmit(event,qid)}> Submit Answer</Button>
					</Col>
				</Row>
		</Container>
	)


}}

const mapStateToProps = ({questions,authedUser}, qid) => {
    return {
    	answers: authedUser.id.answers,
    	questions,
    	qid,
       	authedUser
    }
}

export default connect(mapStateToProps)(QuestionAnswers) 