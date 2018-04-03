import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import routes from './routes'


class App extends Component {
  render() {
    return (
      <div className="App">

      <Nav/>
      {routes}
      </div>
    );
  }
}

export default App;
