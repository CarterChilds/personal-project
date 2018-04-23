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
            input:'',
            bio: ''
            
            

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
        }).then(() => {
            this.getBio()
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
    

    getBio(){
        axios.get(`/api/getbio/${this.state.user_id}`)
        .then((res) => {
            console.log(res.data)
            this.setState({
                bio: res.data
            })

        } )
    }


    deletePost(id){
        
        axios.delete(`/api/deletepost/${id}`)
        .then((res) => {
            console.log('not deleted posts: ',res.data)
            this.setState({
                user_posts: res.data
            })
        } )

    }


    handleBioChange(value){
        this.setState({
            input: value
        })
    }

    handleBioUpdate(input){
        axios.put('/api/updatebio', {bio: input})
        this.setState({
            bio: this.state.input,
        
        })

    }

 

    render(){
        const username = this.state.username
        const userPicture = this.state.user_picture
        const posts = this.state.user_posts.map((element, index) => {
            
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


               
                 <textarea className='bioInput' placeholder='Bio'onChange={ (e) => this.handleBioChange( e.target.value ) }/><br/>
                <button className='bioButton' onClick={(e) => this.handleBioUpdate(this.state.input) }>Submit</button> <br/>


           


                


                <p className='bio'>{this.state.bio}</p>

                <h2 className='posts'> 
                    Posts:
                    <p className='deleteMessage'>Click to Delete</p>
        
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