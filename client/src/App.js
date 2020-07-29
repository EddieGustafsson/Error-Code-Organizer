import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';

import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import ProjectSidebar from './components/ProjectSidebar';

import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Project from './pages/Project';
import ProjectActivity from './pages/ProjectActivity';

function App() {
  return (
    <Container fluid>
      <Router>
        <div className="App">
          <Navbar />
          
          <Grid columns='equal'>
            
            <Grid.Column>
              <Switch>
                  <Route path="/project/:id" component={ProjectSidebar} />
              </Switch>
            </Grid.Column>

            <Grid.Column width={12}>
              <Container>
                <Header as='h5' attached='top'>
                  <Breadcrumb />
                </Header>
                <Segment attached raised style={{minHeight: '100%'}}>
                  <Switch>
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/projects" component={Projects} />
                    <Route exact path="/project/:id" component={Project}/>
                    <Route exact path="/project/:id/activity" component={ProjectActivity}/>
                  </Switch>
                </Segment>
                <Segment attached='bottom'>
                  ECO Version 1.0
                </Segment>
              </Container>
            </Grid.Column>

            <Grid.Column>

            </Grid.Column>

          </Grid>
        </div>
      </Router>
    </Container>
  );
}

export default App;
