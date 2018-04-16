import React, {Component} from 'react'
import './Upload.css'

 export default class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: ''
      };
      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
    
    }
  
    handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
  
      return (
        <div className='uploadBody'>
          <form className='uploader' onSubmit={this._handleSubmit}>
            <input className='fileSelect' type="file" onChange={this.handleImageChange} />
            <button className='submit' type="submit" onClick={this.handleSubmit}>Upload Image</button>
          </form>
          {$imagePreview}
        </div>
      )
    }
  
  }