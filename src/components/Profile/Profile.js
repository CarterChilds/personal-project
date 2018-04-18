import React, {Component} from 'react'
import axios from 'axios'
import './Profile.css'
import Gallery from 'react-photo-gallery';



export default class Profile extends Component {
    constructor(){
        super()

        this.state = {
            username: '',
            user_picture: '',
            user_posts: [], 
            user_id: ''

        }
    }

    componentDidMount(){
        axios.get('/api/user')
        .then((res) => {
            
            this.setState({
                
                username: res.data.username,
                user_picture: res.data.profile_picture,
                user_id: res.data.user_id

            })
        } ).then(() => {
            this.getPosts()
        })
    }


    getPosts(){
        console.log(this.state.user_id)
        axios.get(`/api/posts/${this.state.user_id}`)
        
        .then((res) => {
            console.log(res.data)
            this.setState({
                user_posts: res.data
            })
         
        } )
    }

    render(){
        const username = this.state.username
        const userPicture = this.state.user_picture
        const posts = this.state.user_posts.map((element, index) => {
            return(
             
                {
                    src: `${element.image}`, width: 2, height: 2
                }
            )
        })
        // <img key={index} src={element.image} />
        
        
        return(
            <div className='profile'>
                
                <h2 className='username'>
                {username}
                </h2>
            
                <img className='profile_pic' src={userPicture}/>
                <Gallery columns={4} photos={posts} onClick={console.log('hi')}/>
                
            </div>
        )
    }
}