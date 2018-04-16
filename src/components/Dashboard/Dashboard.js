import React, {Component} from 'react'
import axios from 'axios'
import Gallery from 'react-photo-gallery';
import _ from 'lodash'
import './Dashboard.css'



export default class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            images: []
        }
    }
    componentDidMount(){
        axios.get('/test/mountains')
        .then((res) => {
            this.setState({
                images: res.data.photos.photo
                
            })
        } )
    }
    


    
    render(){
        let imagesToDisplay = this.state.images.map((element, index) => {
            return(
                {
                    src: `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`, width: 4, height: 4
                }
            )
        })
        return(
            <div className='dash'>

                <Gallery columns ={4} photos={imagesToDisplay}/>
            </div>
        )
    }
}

