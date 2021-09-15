import { Component } from "react";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import { withAuth0 } from "@auth0/auth0-react";
class Profile extends Component {

  render() {

    const user = this.props.auth0.user;

    return (
      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={user.picture}/>
  <Card.Body>
    <Card.Title>{user.name}</Card.Title>
    <Card.Text>
    {user.email}
    </Card.Text>
  </Card.Body>
</Card>
    )
  }
};

export default withAuth0(Profile);
