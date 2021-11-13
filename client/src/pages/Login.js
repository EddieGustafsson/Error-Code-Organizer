import React from 'react';
import { Grid, Container, Header, Segment, Message } from 'semantic-ui-react';
import UserLoginForm from '../components/forms/UserLoginForm';
import SmallNavbar from '../components/SmallNavbar';
import packageJson from '../../package.json';

class Login extends React.Component {
    render() {
        const featureList = [
            'Fusce aliquam urna nec lectus rhoncus, ac euismod massa rhoncus.',
            'Mauris semper sem nisi, vel ullamcorper tortor luctus ut.',
            'Donec nec malesuada est, id blandit dui.'
        ]
        return (
            <div>
                <SmallNavbar />
                <Container>
                    <Grid>
                        <Grid.Column floated='left' width={10}>
                            <Segment.Group>
                                <Segment style={{ minHeight: '50vh' }}>
                                    <Header as='h2'>Error Code Organizer</Header>
                                    <p>MERN based application to organize error codes in a project.</p>
                                    <Message header='New Site Features' list={featureList} />
                                </Segment>
                                <Segment>
                                    <p>ECO Version {packageJson.version}</p>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <Segment>
                                <UserLoginForm />
                            </Segment>
                            <Segment>
                                <p>Don't have an account yet? <a href="/auth/register">Register an account</a>. </p>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default Login;
