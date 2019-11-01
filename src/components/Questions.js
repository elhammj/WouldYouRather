import React, {Component} from 'react'
import {connect} from 'react-redux'
import Errorpage from './Errorpage'
import {Container, Row, Col } from 'react-bootstrap'
import '../css/style.css'
import { Link } from 'react-router-dom'

class Questions extends Component{


  render(){
    const {qid, author, authorAvatar, timestamp, answers} = this.props
    const linkResult = "/results/" + qid
    const linkQuestion = "/questions/" + qid
    let isItAnswered
    if(answers[qid]===undefined){
      isItAnswered = false
    }
    else{
      isItAnswered = true
    }
    //Handle erros for questions that are not there
    if (!qid){
      return <Errorpage/>
    }

    return(
      <Container fluid={true} className="question-container">
        <Row>
          <Col sm={4}>
            <img alt={author} src={authorAvatar} className="avatar"/>
            <div>Asked by: <span>{author}</span></div>
            <div> <span> Created: {timestamp} </span> </div>
          </Col>
          <Col sm={8}>
            <div>{this.props.questions}</div>
            {isItAnswered ?
             <Link to={linkResult} className="answerButton">View Poll!</Link>:
             <Link to={linkQuestion} className="answerButton">View Poll!</Link>
            }
          </Col>
        </Row>
      </Container>

    )
  }
}

const mapStateToProps = ({questions,users,authedUser},{qid}) => {
    return {
        questions: "Would you rather " + questions[qid].optionOne.text + " or " +  questions[qid].optionTwo.text,
        author: users[questions[qid].author].name,
        authorAvatar: users[questions[qid].author].avatarURL,
        timestamp: questions[qid].timestamp,
        qid:qid,
        answers: authedUser.id.answers
    }
}

export default connect(mapStateToProps)(Questions)