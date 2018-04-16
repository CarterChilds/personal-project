import React, {Component} from 'react'
import axios from 'axios'
export default class Profile extends Component {
    constructor(){
        super()

        this.state = {
            username: '',
            user_picture: ''

        }
    }

    componentDidMount(){
        axios.get('/api/user')
        .then((res) => {
            
            this.setState({
                
                username: res.data.username,
                user_picture: res.data.profile_picture

            })
        } )
    }

    render(){
        const username = this.state.username
        const userPicture = this.state.user_picture
        
        
        return(
            <div>
                
                {username}
                <img src={userPicture}/>
                
                
            </div>
        )
    }
}