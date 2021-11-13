import React from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import UserRegisterForm from '../components/forms/UserRegisterForm';
import SmallNavbar from '../components/SmallNavbar';

class Register extends React.Component {
  render() {
    return (
      <div>
        <SmallNavbar />
        <Container>
          <Grid centered>
            <Grid.Column width={6}>
              <Segment>
                <UserRegisterForm />
              </Segment>
              <Segment>
                <p>Already have an account? <a href="/auth/login">Login to your account</a>. </p>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Register;
