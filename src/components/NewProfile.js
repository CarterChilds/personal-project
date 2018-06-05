import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import Gallery from "react-photo-gallery";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      user_picture: "",
      user_posts: [],
      user_id: "",
      input: "",
      bio: ""
    };
  }

  //function that is displaying user posts on page
  //as well as account info being displayed that is being pulled from google

  componentDidMount() {
    axios
      .get("/api/user")
      .then(res => {
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
      <div className="profile">
        <div className="profile-section">
          <h2 className="username">{username}</h2>
          <img className="profile_pic" src={userPicture} />
          <textarea
            className="bioInput"
            placeholder="Bio"
            onChange={e => this.handleBioChange(e.target.value)}
          />
          <br />
          <button
            className="bioButton"
            onClick={e => this.handleBioUpdate(this.state.input)}
          >
            Submit
          </button>{" "}
          <br />
          <p className="bio">{this.state.bio}</p>
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
    );
  }
}
