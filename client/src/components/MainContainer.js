import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';

import Navbar from '../components/Navbar';
import AlertMessage from '../components/AlertMessage';
import Breadcrumb from '../components/Breadcrumb';
import packageJson from '../../package.json';
import { Loader } from 'semantic-ui-react';

const Project = lazy(() => import("../pages/Project"));
const Projects = lazy(() => import("../pages/Projects"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ProjectSidebar = lazy(() => import("../components/ProjectSidebar"));
const ProjectActivity = lazy(() => import("../pages/ProjectActivity"));
const ProjectSettings = lazy(() => import("../pages/ProjectSettings"));
const ProfileSettings = lazy(() => import("../pages/ProfileSettings"));

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Grid columns='equal'>
                    {/* Left sidebar */}
                    <Grid.Column>
                        <Suspense fallback={<Loader active inline='centered' />}>
                            <Switch>
                                <Route path="/project/:id" component={ProjectSidebar} />
                            </Switch>
                        </Suspense>
                    </Grid.Column>
                    {/* Main area */}
                    <Grid.Column width={12}>
                        <Container>
                            <AlertMessage />
                            <Header as='h5' attached='top'>
                                <Breadcrumb />
                            </Header>
                            <Segment attached raised style={{ minHeight: '100%' }}>
                                <Suspense fallback={<Loader active inline='centered' />}>
                                    <Switch>
                                        <Route path="/" exact component={Dashboard} />
                                        <Route path="/projects" component={Projects} />
                                        <Route exact path="/project/:id" component={Project} />
                                        <Route exact path="/project/:id/activity" component={ProjectActivity} />
                                        <Route exact path="/project/:id/settings" component={ProjectSettings} />
                                        <Route exact path="/user/:username" component={ProfilePage}/>
                                        <Route exact path="/user/:id/settings" component={ProfileSettings} />
                                    </Switch>
                                </Suspense>
                            </Segment>
                            <Segment attached='bottom'>
                                ECO Version {packageJson.version}
                            </Segment>
                        </Container>
                    </Grid.Column>
                    {/* Right sidebar */}
                    <Grid.Column>

                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default MainContainer;