import React, { Component } from "react";
import axios from "axios";
import "./Upload.css";
import flickrLogo from "./../Nav/flickrLogo.svg";
import { Link } from "react-router-dom";

function sendToback(photo) {
  console.log(photo);
  return axios.post("/api/photoUpload", photo);
}

function deletePost(post) {
  axios.delete("/api/deletepost", post);
}

export default class Upload extends Component {
  constructor() {
    super();

    this.state = {
      file: "",
      filename: "",
      filetype: "",
      loggedIn: false
    };
    this.handlePhoto = this.handlePhoto.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);
  }
  componentWillMount() {
    this.loggedIn();
  }

  loggedIn() {
    axios
      .get("/auth/me")
      .then(res => {
        this.setState({
          loggedIn: true
        });
      })
      .catch(res => {
        this.props.history.push("/");
      });
  }

  handlePhoto(event) {
    const reader = new FileReader(),
      file = event.target.files[0],
      _this = this;

    reader.onload = photo => {
      this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type
      });
    };
    reader.readAsDataURL(file);
  }

  sendPhoto(event) {
    event.preventDefault();
    alert("Photo uploaded to profile");

    sendToback(this.state).then(response => {
      console.log(response.data);
    });
  }

  render() {
    this.state.file && console.log(this.state.photo);
    return (
      <div>
        <div className="Nav">
          <div className="primaryNav">
            <div className="logo-container">
              <img className="logo" src={flickrLogo} />
            </div>
            <Link to="/profile">
              <span className="you">You</span>
            </Link>
            <Link to="/dashboard">
              <span className="photostream">Photostream</span>
            </Link>
            <Link to="/upload">
              <span className="create">Create</span>
            </Link>
            <Link to="/donate">
              <span className="donate">Donate</span>
            </Link>
            <div className="subNav">
              <a className="login" href="http://localhost:8181/auth/logout">
                Logout
              </a>
              <span className="search">
                <input
                  className="search-child"
                  type="search"
                  placeholder="Search"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="upload">
          <div className="FileUpload">
            <div className="FileUpload-top">
              <input
                className="file-button"
                type="file"
                onChange={this.handlePhoto}
              />
              <br />
              <button
                className="btn-success upload-button"
                onClick={this.sendPhoto}
              >
                Upload
              </button>
            </div>
            {this.state.file && (
              <img src={this.state.file} alt="" className="file-preview" />
            )}
          </div>
          {/* <div className="uploaded-pic"> */}
        </div>
      </div>
    );
  }
}
