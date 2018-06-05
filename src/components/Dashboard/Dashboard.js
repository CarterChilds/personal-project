import React, {Component} from 'react'
import axios from 'axios'
import Gallery from 'react-photo-gallery';
import _ from 'lodash'
import './Dashboard.css'
import flickrLogo from './../Nav/flickrLogo.svg'
import {Link} from 'react-router-dom';




export default class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            images: []
        }
    }

    //life cycle method allowing user to see posts on page load.
    //pulling from flickr api and can change url paramater to change what users are seeing  
    componentDidMount(){
        axios.get('/test/landscape')
        .then((res) => {
            this.setState({
                images: res.data.photos.photo
                
            })
        } )
    }
    


    
    render(){
        let imagesToDisplay = this.state.images.map((element, index) => {
            //map allowing api posts to be displayed
            //using gallery package to format pictures in a good looking way 
            return(
                {
                    src: `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`, width: 4, height: 4
                }
            )
        })
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
              <a className='login' href={ process.env.REACT_APP_LOGIN }>Login</a>
            <span className='search'>
                <input className='search-child' type='search' placeholder='Search'/>
              
            </span>
            

            </div>
        </div>
        </div>
            <div className='dash'>

                <Gallery columns ={4} photos={imagesToDisplay}/>
            </div>
            </div>
        )
    }
}

