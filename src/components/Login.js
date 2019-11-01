import React, {Component} from 'react'
import {handleUserLogin} from '../actions/authedUser'
import { connect } from 'react-redux'
import '../css/style.css'
import { Container, Row, Col } from 'react-bootstrap'


class Login extends Component {
  
    state = {
      userID: ''
    }


  handleChange = (value) => {
    this.setState(()=> ({
            userID: value
    }))
    console.log("Test updating: " + value)
  }

  handleSubmit = (event) => {
    
    this.props.dispatch(handleUserLogin(this.state.userID))
    console.log("Test dispatching: " + this.state.userID)
    event.preventDefault()
    
  }

  render(){
  	const {users} = this.props
  	return (
  	//Using React documentation: https://reactjs.org/docs/forms.html
    <Container className="login">
      <Row className="justify-content-md-center">
      <Col xs={6}>
    	<form onSubmit={this.handleSubmit}>
          <h2> WHO ARE YOU? </h2>
            <select className="select-css" onChange={(e)=> this.handleChange(e.target.value)}>
            (//To solve select issue: https://stackoverflow.com/questions/8605516/default-select-option-as-blank)
              <option value> -- select a user name -- </option>
             {users && Object.keys(users).map((user)=>
              <option key={user} value={user.id}>{user}</option>)}
            </select>
          <div>
           <input className="button" type="submit" value="Submit"  disabled={!this.state.userID}/>
          </div>
        </form>
        </Col>
        </Row>
      </Container>
   )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}


export default connect(mapStateToProps)(Login)