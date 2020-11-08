import React                                      from 'react';
import { Container }                              from 'semantic-ui-react';
import {BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import Login                                      from './pages/Login';
import Register                                   from './pages/Register';
import MainContainer                              from './components/MainContainer';
import { Provider }                               from 'react-redux';
import store                                      from './store';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


function App() {
  return (
    <Provider store={store}>
      <Container fluid>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/register" exact component={Register} />
              <Route path="/" component={MainContainer} />
            </Switch>
          </div>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
