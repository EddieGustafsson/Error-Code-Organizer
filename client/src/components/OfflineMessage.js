import { Container } from 'semantic-ui-react';
import React from 'react';
import { List, Segment, Header } from 'semantic-ui-react';
import packageJson from '../../package.json';

class OfflineMessage extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Header as='h5' attached='top'>
                        API SERVER OFFLINE
                    </Header>
                    <Segment color='red' attached>
                        Connection to the API server failed. Possible reasons are:
                        <List bulleted>
                            <List.Item>Connection parameters for the specified API Server are invalid</List.Item>
                            <List.Item>API Server is not running</List.Item>
                            <List.Item>Network connection is lost</List.Item>
                        </List>
                    </Segment>
                    <Segment attached='bottom'>
                        ECO Version {packageJson.version}
                    </Segment>
                </Container>
            </div>
        )
    }
}

export default OfflineMessage;