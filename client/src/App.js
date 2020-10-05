import React, { Suspense, lazy }                      from 'react';
import Navbar                                         from './components/Navbar';
import Breadcrumb                                     from './components/Breadcrumb';
import packageJson                                    from '../package.json';
import { Loader }                                     from 'semantic-ui-react';
import { Container, Grid, Segment, Header }           from 'semantic-ui-react';
import {BrowserRouter as Router, Switch, Route }      from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const Project           = lazy(() => import("./pages/Project"));
const Projects          = lazy(() => import("./pages/Projects"));
const Dashboard         = lazy(() => import("./pages/Dashboard"));
const ProjectSidebar    = lazy(() => import("./components/ProjectSidebar"));
const ProjectActivity   = lazy(() => import("./pages/ProjectActivity"));
const ProjectSettings   = lazy(() => import("./pages/ProjectSettings"));

function App() {
  return (
    <Container fluid>
      <Router>
        <div className="App">
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
                <Header as='h5' attached='top'>
                  <Breadcrumb />
                </Header>
                <Segment attached raised style={{minHeight: '100%'}}>
                  <Suspense fallback={<Loader active inline='centered' />}>
                    <Switch>
                      <Route path="/" exact component={Dashboard}/>
                      <Route path="/projects" component={Projects} />
                      <Route exact path="/project/:id" component={Project}/>
                      <Route exact path="/project/:id/activity" component={ProjectActivity}/>
                      <Route exact path="/project/:id/settings" component={ProjectSettings}/>
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
      </Router>
    </Container>
  );
}

export default App;
