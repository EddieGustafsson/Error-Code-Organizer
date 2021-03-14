import React from 'react';
import { Segment, Form, Button, Tab, Grid, Header } from 'semantic-ui-react';

function ProfileSettings({ match }) {

    const profileForm = [
        <Tab.Pane attached={false} style={{ minHeight: '50vh' }}>
            <Header as='h3' dividing>Public profile</Header>
            <Form>
                <Form.Input
                    label='Name'
                    width='10'
                    name='name'
                    value='Eddie Gustafsson'
                />
                <Form.Field>
                    <Form.TextArea
                        label='Bio'
                        name='bio'
                        placeholder='Tell us a little bit about yourself'
                        width='10'
                        rows={2}
                    />
                </Form.Field>
                <Form.Input
                    label='URL'
                    width='10'
                    name='url'
                    value='https://edgus.dev'
                />
                <Form.Input
                    label='Location'
                    width='10'
                    name='location'
                    value='Skövde, Sweden'
                />
                <Button
                    positive
                    type='submit'
                >Update profile</Button>
            </Form>
        </Tab.Pane>
    ]

    const accountForm = [
        <Tab.Pane attached={false} style={{ minHeight: '50vh' }}> 
            <Form>
                <Header as='h3' dividing>Change username</Header>
                <p>Changing your username can have unintended side effects.</p>
                <Button type='submit'>Change username</Button>
            </Form>
            <br></br>
            <Form>
                <Header as='h3' dividing>Export account data</Header>
                <p>Export all repositories and profile metadata for @EddieGustafsson. Exports will be available for 7 days.</p>
                <Button type='submit'>Start export</Button>
            </Form>
            <br></br>
            <Form>
                <Header as='h3' color='red' dividing>Delete account </Header>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <Button type='submit' negative>Delete your account</Button>
            </Form>
        </Tab.Pane>
    ]

    const appearanceForm = [
        <Tab.Pane attached={false} style={{ minHeight: '50vh' }}> 
            <Form>
                <Header as='h3' dividing>Theme</Header>
                <p>Set your theme preference to the light or dark theme.</p>
                <Form.Group inline>
                    <Form.Radio
                        label='Light'
                        value='light'
                        checked
                    />
                    <Form.Radio
                        label='Dark'
                        value='dark'
                    />
                    </Form.Group>
                <Button type='submit' positive>Update preference</Button>
            </Form>
        </Tab.Pane>
    ]

    const securityForm = [
        <Tab.Pane attached={false} style={{ minHeight: '50vh' }}> 
            <Form>
                <Header as='h3' dividing>Change password</Header>
                <Form.Input
                    label='Old password'
                    width='10'
                    name='old_password'
                />
                <Form.Input
                    label='New password'
                    width='10'
                    name='new_password'
                />
                <Form.Input
                    label='Confirm new password'
                    width='10'
                    name='new_password2'
                />
                <Button type='submit' positive>Update password</Button>
            </Form>
        </Tab.Pane> 
    ]

    const panes = [
        { menuItem: 'Profile', render: () => profileForm },
        { menuItem: 'Account', render: () => accountForm },
        { menuItem: 'Appearance', render: () => appearanceForm },
        { menuItem: 'Account security', render: () => securityForm }
    ]

    return (
        <div>
            <Segment vertical >
                <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Header as='h2'>Profile settings</Header>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment vertical>
                <Tab menu={{ fluid: true, vertical: true, pointing: true }} panes={panes} />
            </Segment>
        </div>
    );

}

export default ProfileSettings;
