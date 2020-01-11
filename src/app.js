import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SecureRoute from './components/common/SecureRoute'

import Home from './components/common/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/user/Profile'



import 'bulma'

import './style.scss'

class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <SecureRoute path="/me" component={Profile} />
          <SecureRoute path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
