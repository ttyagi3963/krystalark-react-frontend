import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder'

import './recordVideo.css';

class RecordVideo extends Component{
    state ={
        showUploadForm:false,
        fileObject:''

    }
    stopRecordingHandler =(blob)=>{
        this.setState({showUploadForm: true})
        var fileName = this.getFileName('webm');
        let video = URL.createObjectURL(blob);
        var fileObject = new File([blob], fileName, {
            type: 'video/webm'
        });
        this.setState({fileObject: fileObject})
       
    }

    saveVideoHandler = (event) =>{
        event.preventDefault();
        let formData = new FormData();
            formData.append('fileObject',this.state.fileObject);
         
        fetch('http://localhost:8080/message/uploadMessageFile',{
            method:'POST',
            headers:{
                'authorization': ' Bearer '+this.props.token,
               
            },
            body: formData
        })
        .then(res =>{
            return res.json();
        })
        .then(resData => {
            console.log(resData)
            
        })
        .catch(err =>{
            console.log(err)
        })
    }

    discardVideoHandler=()=>{
        this.props.history.push('/message/recordvideo')
    }

    getRandomString=() => {
        // if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
        //     var a = window.crypto.getRandomValues(new Uint32Array(3)),
        //         token = '';
        //     for (var i = 0, l = a.length; i < l; i++) {
        //         token += a[i].toString(36);
        //     }
        //     return token;
        // } else {
            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
        //}
    }

   getFileName = (fileExtension) => {
        var d = new Date();
        var year = d.getUTCFullYear();
        var month = d.getUTCMonth();
        var date = d.getUTCDate();
        return 'RecordRTC-' + year + month + date + '-' + this.getRandomString() + '.' + fileExtension;
    }
   
    
    
    

  render(){
    let buttonClass = ['btn', 'btn-primary', 'btn-lg']
    
    let formClass= ['hideForm', 'ButtonControls']
    if(this.state.showUploadForm){
        formClass = ['showForm', 'ButtonControls']
    }
                        
    
      return(
          <div className="col-12 VideoContainer">
               <VideoRecorder 
                    onRecordingComplete={(blob) =>this.stopRecordingHandler(blob)}
                    />

                  <div className={formClass.join(' ')}>
                      <form action="/upload" encType="multipart/form-data" method="POST" onSubmit={this.saveVideoHandler}>
                      
                      <input type="hidden" name="fileObject" id="fileObject"></input>
                      
                            <button 
                            type="submit" 
                            className={buttonClass.join(' ')}
                            onClick={this.saveVideoHandler}
                            >
                               Save and Continue
                            </button>

                      </form>
                         
                      </div>  
          </div>
       
        
      )
  }
}

export default RecordVideo;