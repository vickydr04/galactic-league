import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Filter from './components/Filter';
import Galactic from './components/Galactic';

function App() {
  return (
  <Router>
    
      <Nav />
        <Switch>
          <Fragment>
            <Route path="/" exact component={Filter} />
            <Route path="/my-galactic-league" component={Galactic} />
          </Fragment>
        </Switch>
    </Router>

  );
}

export default App;