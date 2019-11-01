import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import Navigation from './Navigation'
import Footer from './Footer'
import Login from './Login'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import QuestionAnswers from './QuestionAnswers'
import QuestionResult from './QuestionResult'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component{
  //Get the data from database file
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    return(
      <Router>
      {!this.props.userID
            ? <Login/> 
            : <div style={{width:"100%"}}>
                <Navigation authedUser={this.props.authedUserName} authedUserAvatar={this.props.authedUserPhoto}/>
                <Route path='/' exact component={Home} />
                <Route path='/leaderBoard' component={LeaderBoard} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/questions' component={QuestionAnswers} />
                <Route path='/results' component={QuestionResult} />
                <Footer/>
              </div>
      }
      </Router>
    )
  }
}

let mapStateToProps = ({ authedUser }) => {
  return {
    userID: authedUser !== null,
    authedUserName: authedUser ? authedUser.id.name : '',
    authedUserPhoto: authedUser ? authedUser.id.avatarURL : '',
  }
}

export default connect(mapStateToProps)(App)