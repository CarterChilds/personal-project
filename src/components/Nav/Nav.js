import React from 'react';
import './Nav.css';
import flickrLogo from './flickrLogo.svg'
import {Link} from 'react-router-dom';
import Dashboard from './../Dashboard/Dashboard';
import _ from 'lodash'
export default function Nav (){

    return(
        <div className='Nav'>
            <div className='primaryNav'>
                <div className='logo-container'>
            <img className='logo' src={flickrLogo}/>
                </div>
            <Link to='/profile'><span className='you'>You</span></Link>
            <Link to='/dashboard'><span className='photostream'>Photostream</span></Link>
            <Link to='/upload'><span className='create'>Create</span></Link>
            <Link to='/donate'><span className='donate'>Donate</span></Link>
            <div className='subNav'>
              <a className='login' href={ process.env.REACT_APP_LOGIN }>Login</a>
            <span className='search'>
                <input className='search-child' type='search' placeholder='Search'/>
              
            </span>
            

            </div>
        </div>
        </div>
    )
}
