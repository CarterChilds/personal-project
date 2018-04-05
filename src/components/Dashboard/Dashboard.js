import React, {Component} from 'react'
import axios from 'axios'
import Gallery from 'react-photo-gallery';


export default class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            images: []
        }
    }
    componentDidMount(){
        axios.get('/test/puppy')
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
            <div>

                <Gallery columns ={4} photos={imagesToDisplay}/>
            </div>
        )
    }
}

