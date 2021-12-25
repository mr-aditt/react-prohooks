import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Pages/Home'
import Search from './Components/Pages/Search'

import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';


class App extends Component {
  render(){
  return (
    <Router>
    <Security issuer='https://dev-00719154.okta.com/oauth2/default'
              clientId='0oa3f7m2uq6xmkVXr5d7'
              redirectUri={window.location.origin + '/login/callback'}
              pkce={true}>
      <div className='App'>
        <Navbar/>
        <div className='container'>
        <Route path="/" exact={true} component={Home} />
        <SecureRoute path="/search" exact={true} component={Search} />
        <Route path='/login/callback' component={LoginCallback} />
        </div>
      </div>
      </Security>
    </Router>

  )
}

}
export default App;
