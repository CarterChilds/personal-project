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
            user_id: '',
            
            

        }
    }

    componentDidMount(){
        axios.get('/api/user')
        .then((res) => {
            
            this.setState({
                
                username: res.data.username,
                user_picture: res.data.profile_picture,
                user_id: res.data.user_id,

            })
        } ).then(() => {
            this.getPosts()
        })
    }
    


    getPosts(){
        axios.get(`/api/posts/${this.state.user_id}`)
        
        .then((res) => {
            console.log(res.data)
            this.setState({
                user_posts: res.data,
           
            })
         
        } )
    }
    
    deletePost(id){
        
        axios.delete(`/api/deletepost/${id}`)
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
            console.log(element)
            return(
             
                {
                    src: `${element.image}`, width: 1, height: 1, id: element.id
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

                <h2 className='posts'> 
                    Posts:
                </h2>
                <Gallery  columns={3} photos={posts} onClick={e=>

                    {
                        console.log('e---->',e.target)
                        this.deletePost(e.target.id)
                        }} />
                
            </div>
        )
    }
}