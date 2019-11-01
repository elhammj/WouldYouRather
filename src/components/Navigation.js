import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleUserLogout} from '../actions/authedUser'
import { NavLink } from 'react-router-dom'
import { Navbar, Row, Col, Container } from 'react-bootstrap'
import '../css/style.css'

class Navigation extends Component{

	//Logout function
	handleLogout = () => {
		this.props.dispatch(handleUserLogout())
	}
	
	render() {
        const {authedUser, authedUserAvatar} = this.props
        return (
            <Container fluid={true} className="Nav">
            <Row>
            <Navbar expand="lg" className="navigation">
            <Col sm={8}>
                <ul className="navList">
                    <li className="navListItem">
                        <NavLink to='/'  activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li className="navListItem">
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li className="navListItem">
                        <NavLink to='/leaderBoard' activeClassName='active'>
                            LeaderBoard
                        </NavLink>
                    </li>
                </ul>
            </Col>
            <Col sm={4}>
                <img alt={authedUser+' avatar'} src={authedUserAvatar} className="userIcon"/>
                <span className="userName">{authedUser}</span>
                <button className="logoutBtn" onClick={this.handleLogout}>
                         Logout
                </button>
            </Col>
            </Navbar>
            </Row>
            </Container>

            )
    }
}



export default connect()(Navigation)