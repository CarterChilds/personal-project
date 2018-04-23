import React, { Component } from 'react'
import axios from 'axios'
import './Upload.css'

function sendToback(photo){
    console.log(photo)
    return axios.post('/api/photoUpload', photo)
}

function deletePost(post){
    axios.delete('/api/deletepost', post)
}

export default class Upload extends Component {
    constructor(){
        super()

        this.state={
            file: '',
            filename: '',
            filetype: ''
        }
        this.handlePhoto=this.handlePhoto.bind(this)
        this.sendPhoto=this.sendPhoto.bind(this)
    }

    handlePhoto(event){
        const reader = new FileReader()
            , file = event.target.files[0]
            , _this = this
        
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto(event){
        event.preventDefault()
        alert('Photo uploaded to profile')

        sendToback(this.state).then(response => {
            console.log(response.data)
        })
    }

    render(){
        this.state.file && console.log(this.state.photo)
        return (
            <div className="FileUpload">
                <input className='file-button' type="file" onChange={this.handlePhoto}/>
                <br/>
                <button className='button'  onClick={this.sendPhoto }>Upload</button>
                {
                this.state.file &&
                <img src={this.state.file} alt="" className="file-preview"/>  
                }
                
            </div>
        )
    }
}