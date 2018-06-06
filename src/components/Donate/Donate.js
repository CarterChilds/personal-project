import React, {Component} from 'react'
import Checkout from './../Checkout/Checkout'
import './Donate.css'
import flickrLogo from './../Nav/flickrLogo.svg'
import {Link} from 'react-router-dom';
import axios from 'axios'


export default class Upload extends Component {
    constructor(){
        super();

        this.state = {
            amount: 0,
            loggedIn: false
        }
    }
    //setting state to whatever is typed into an input box so user can decide what amount they want to donate 
    handleDonation(e) {
        this.setState({amount: e}) 
    }
    componentWillMount() {
        this.loggedIn()
    }
  

    loggedIn(){
        axios.get('/auth/me')
        .then((res) =>{
           this.setState({
               loggedIn: true
           })
        } )
        .catch((res) => {
          this.props.history.push('/')
        } )
      }


    render(){
        return(
            <div>
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
            <a className='login' href='http://localhost:8181/auth/logout'>Logout</a>
            <span className='search'>
                <input className='search-child' type='search' placeholder='Search'/>
              
            </span>
            

            </div>
        </div>
        </div>
            <div className='background'>  
            <div className= 'intro'>
                Please enter an amount to donate:
            </div>
            <div className='donate'>
                <input className='donate-input' placeholder="Amount to Donate" min='1' max ='10000' onChange={(e) => this.handleDonation(e.target.value)}/>
                <Checkout
                //amount is in pennies by default, multiply the amount by 100 to get normal USD
                amount={+this.state.amount * 100}
                />
            </div>
                {/* <img className='logo' src='https://s3.amazonaws.com/freebiesupply/large/2x/flickr-logo-black-transparent.png'/> */}
            </div>
            </div>
        )
    }
}