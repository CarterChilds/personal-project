import React, {Component} from 'react'
import Checkout from './../Checkout/Checkout'
import './Donate.css'

export default class Upload extends Component {
    constructor(){
        super();

        this.state = {
            amount: 0
        }
    }

    handleDonation(e) {
        this.setState({amount: e}) 
    }


    render(){
        return(
            <div className='background'>  
            <div className= 'intro'>
                Please enter an amount to donate:
            </div>
            <div className='donate'>
                <input placeholder="Amount to Donate" min='1' max ='10000' onChange={(e) => this.handleDonation(e.target.value)}/>
                <Checkout
                amount={+this.state.amount * 100}
                />
            </div>
                {/* <img className='logo' src='https://s3.amazonaws.com/freebiesupply/large/2x/flickr-logo-black-transparent.png'/> */}
            </div>
        )
    }
}