import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import React from 'react'


export default (
    <Switch>
        <Route exact path ='/' component={Login}/>
        <Route path = '/profile' component={Profile}/>
        <Route path = '/upload' component={Upload}/>
        <Route path = '/dashboard' component={Dashboard}/>
    </Switch>
)