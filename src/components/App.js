import React, { Component } from 'react';
import './App.css';
import Login from './login/Login';
import Home from './home/Home';

import { Router, Route, Switch } from 'react-router-dom';
import * as actions from '../store/action';
import PrivateRoute from './private/PrivateRoute';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
class App extends Component {
  state = {
    isLoggedIn: false,
  }

  componentDidMount() {
    this.props.getLoggedinUser();
  }

  render() {
    return (
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
      isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
      getLoggedinUser: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);