import React, {Component} from 'react'
import {connect} from 'react-redux'
import Questions from './Questions'
import { Tabs, Tab } from 'react-bootstrap'
import '../css/style.css'

class Home extends Component{
  render(){
    return(
      <Tabs defaultActiveKey={1} id="questionsTab">
        <Tab eventKey={1} title="Unanswered Questions">
            <ul className="questionItem">
              {this.props.unanswered.map((id)=>(
                <li key={id} className="question">
                  <Questions qid={id}/>
                </li>
              ))}
            </ul>
        </Tab>
        <Tab eventKey={2} title="Answered Questions">
            <ul className="questionItem">
              {this.props.answered.map((id)=>(
                <li key={id} className="question">
                  <Questions qid={id}/>
                </li>
              ))}
            </ul>
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = ({questions, authedUser}) => {
  const questionList = Object.keys(questions)
  //Order the lis tof questions
  const questionListOrdered = questionList.sort((a,b)=>questions[b].timestamp - questions[a].timestamp)
  const authedUserAnsweredQ = (authedUser.id !== undefined) ? Object.keys(authedUser.id.answers):[]
  return{
    answered: questionListOrdered.filter((question) => {
      return authedUserAnsweredQ.includes(question) ? question : null
      }),
    unanswered: questionListOrdered.filter((question) => {
      return authedUserAnsweredQ.includes(question) ? null : question
    })
  }
}

export default connect(mapStateToProps)(Home)
