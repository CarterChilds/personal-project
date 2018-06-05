import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import Gallery from "react-photo-gallery";
import flickrLogo from './../Nav/flickrLogo.svg'
import {Link} from 'react-router-dom';


export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      user_picture: "",
      user_posts: [],
      user_id: "",
      input: "",
      bio: "",
      loggedIn: false
    };
  }

  //function that is displaying user posts on page
  //as well as account info being displayed that is being pulled from google

  componentDidMount() {
    axios
      .get("/api/user")
      .then(res => {
        console.log(res.data);

        this.setState({
          username: res.data.username,
          user_picture: res.data.profile_picture,
          user_id: res.data.user_id
        });
      })
      .then(() => {
        this.getPosts();
      });
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

 

  //function grabbing user posts based on user ID
  getPosts() {
    axios
      .get(`/api/posts/${this.state.user_id}`)

      .then(res => {
        console.log(res.data);
        this.setState({
          user_posts: res.data
        });
      });
  }

  //function allowing users to delete posts and then setting state
  deletePost(id) {
    axios.delete(`/api/deletepost/${id}`).then(res => {
      console.log("not deleted posts: ", res.data);
      this.setState({
        user_posts: res.data
      });
    });
  }

  //function allowing user to type in text box and changing the value of input on state
  handleBioChange(value) {
    this.setState({
      input: value
    });
  }
  //function allowing user to update bio and setting the value to bio to whatever was entered in the text box
  handleBioUpdate(input) {
    axios.put("/api/updatebio", { bio: input });
    this.setState({
      bio: this.state.input
    });
  }

  2;
  render() {
      console.log(this.state.loggedIn)
    const username = this.state.username;
    const userPicture = this.state.user_picture;
    const posts = this.state.user_posts.map((element, index) => {
      //map allowing user images to be displayed
      return {
        src: `${element.image}`,
        width: 1,
        height: 1,
        id: element.id
      };
    });

    return (
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
      <div className="profile">
        <div className="profile-section">
          <div class="container-fluid well span6">
            <div class="row-fluid">
              <div class="span2">
                <img src={userPicture} class="img-circle" />
              </div>

              <div class="span8">
                <h3>{username}</h3>
                <div class="form-group">
                <label for="bio">Bio:</label>
                <textarea class="form-control bio-input" rows="5" id="bio"></textarea>
              </div>
                <br />
                <button
                  className="bioButton btn-primary "
                  id='bio-submit'
                  onClick={e => this.handleBioUpdate(this.state.input)}
                >
                  Submit
                </button>{" "}
                <br />
                {/* <h6><a href="#">More... </a></h6> */}
              </div>

              <div class="span2">
                <div class="btn-group">
                  {/* <a class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                                Action 
                                <span class="icon-cog icon-white"></span><span class="caret"></span>
                            </a> */}
                  <ul class="dropdown-menu">
                    {/* <li><a href="#"><span class="icon-wrench"></span> Modify</a></li> */}
                    {/* <li><a href="#"><span class="icon-trash"></span> Delete</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <h2 className="posts">
            Posts:
            <p className="deleteMessage">Click to Delete</p>
            {/* {gallery package that formats photos} */}
          </h2>
          <Gallery
            columns={3}
            photos={posts}
            onClick={e => {
              console.log("e---->", e.target);
              this.deletePost(e.target.id);
            }}
          />
        </div>
      </div>
      </div>
    );
  }
}
