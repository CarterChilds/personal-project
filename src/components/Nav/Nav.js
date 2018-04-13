import React from 'react';
import './Nav.css';
import flickrLogo from './flickrLogo.svg'
import {Link} from 'react-router-dom';

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
              <a className='login' href='http://localhost:8181/auth'>Login</a>
            <span className='search'>
                <input className='search-child' type='text' placeholder='Search'/>
            </span>
            

            </div>
        </div>
        </div>
    )
}
