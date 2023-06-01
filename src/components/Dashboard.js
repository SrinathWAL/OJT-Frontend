//Import Statements
import React from 'react'
import {useSelector} from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap';
import welcome from './images/welcome.svg'


export default function Dashboard() {
//Getting user data from the state
let {userObj}=useSelector(state=>state.login)  
  return (
    //React-Card View for Dashboard
    <Container>
      <Row>
        <Col md={6}>
        <img src={welcome} alt="IMG" width="500" height="400"></img>
        </Col>
        <Col md={6}>
        <Card className='mb-4 shadow'>
            <Card.Body className='bg-warning'>
              <Card.Title>" Welcome Back " {userObj.user_name}</Card.Title>
              <Card.Text>
              {userObj.user_name} is an exceptional individual who truly embodies the qualities of a remarkable full stack developer. 
              His unwavering dedication and work ethic are truly commendable.{userObj.user_name} consistently demonstrates a strong
              passion for his craft, always going the extra mile to deliver exceptional results. 
              His contributions to projects are invaluable, and his ability to work seamlessly within a team is truly admirable. 
              {userObj.user_name}'s hard work, intelligence, and unwavering consistency make him an invaluable asset in any development team.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='shadow'>
            <Card.Body className='bg-dark text-light'>
              <Card.Title>React and Node JS</Card.Title>
              <Card.Text>
              ReactJS can be employed to create the front-end user interface of a web application, 
              while Node.js can handle the back-end logic and data processing. This combination allows
              for a full-stack JavaScript development environment, promoting code reusability, 
              and facilitating seamless communication between the front-end and back-end components of an application.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
