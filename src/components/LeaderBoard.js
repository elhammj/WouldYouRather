import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/style.css'

//Score
const score = (user) => {
	return (Object.keys(user.answers).length + user.questions.length)
}

class LeaderBoard extends Component {
	render() {
		const { users } = this.props
        //Convert to array
        const usersList = Object.keys(users).map((uid) => users[uid])
        //console.log(userList)
        usersList.sort((user1, user2) => score(user2) - score(user1))
        return (
        	<ul className="leadersList">
        	{usersList.map((user) => {
        		const { id, name, avatarURL} = user
        		return(
        			<li key={id}>
        			<Container fluid={true} className="score-container">
	        			<Row>
	        				<Col sm={5}>
			        			<img alt={name} src={avatarURL} className="avatar"/>
			        			<div>{name}</div>
	        				</Col>
		        			<Col sm={7}>
		        				<div className="score-title">TOTAL SCORE</div>
		        				<div className="score-number">{score(user)}</div>
		        			</Col>
	        			</Row> 
	        		</Container>
        			</li>
        			)
        		})}
        		</ul>
        		)
        	}
		}

const mapStateToProps = ({ users }) => {
    return {
       	users
    }
}

export default connect(mapStateToProps)(LeaderBoard)