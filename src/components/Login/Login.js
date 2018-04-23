import React, {Component} from 'react'
import './Login.css'

export default function Login(){
    return(
        <div className='loginbody' >
            <img className='logo' src='https://s3.amazonaws.com/freebiesupply/large/2x/flickr-logo-black-transparent.png'/>
            <h1 className='loginscreen'>
            <a className='loginword' href={ process.env.REACT_APP_LOGIN }>Please Login</a>
             </h1>


        </div>
    )
}