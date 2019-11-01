import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import '../css/style.css'
import {handleAddQuestion} from '../actions/shared'

class NewQuestion extends Component {

	state = {
	    submitted: false,
	    OptionOne:'',
	    OptionTwo:''
  	}


  	handleSubmit = (event) => {
  		event.preventDefault()
        const { authedUser, dispatch } = this.props
        const { optionOne, optionTwo } = this.state
        //Make sure that you passed authedUser id only
        dispatch(handleAddQuestion(optionOne,optionTwo,authedUser.id.id))
        this.setState({
  			submitted:true
  		})
  	}

  	handleChange = (event) => {
  		event.preventDefault()
  		//Either Option One or Option Two
        this.setState({
            [event.target.name]: event.target.value
        })
  	}

render() {
        if (this.state.submitted)
            return <Redirect to='/'/>
        return(
        	 <Container className="componentLength">
                <h1> Would You Rather? ... </h1>
                <Form onSubmit={this.handleSubmit}>
               	 <Form.Group controlId="addQuestion">
                    <Form.Label className="optionLable">Option 1: </Form.Label>
                    <Form.Control
                        name='optionOne'
                        defaultValue = {this.state.optionOne}
                        onChange={this.handleChange} 
                        placeholder='First Option ...' 
                        />
                    <Form.Label className="optionLable">Option 2: </Form.Label>
                    <Form.Control 
                        name='optionTwo'
                        defaultValue = {this.state.optionTwo}
                        onChange={this.handleChange} 
                        placeholder='Second Option ...' 
                    />
                    <Button type='submit' className="button">Submit</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
	}
}

const mapStateToProps = ({authedUser}) => {
    return {
       	authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion) 