import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder'

class RecordVideo extends Component{
 
    stopRecordingHandler =(blob)=>{
        var fileName = this.getFileName('webm');
        let video = URL.createObjectURL(blob);
        var fileObject = new File([blob], fileName, {
            type: 'video/webm'
        });
        //console.log(fileObject)
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
      return(
        <VideoRecorder 
        onRecordingComplete={(blob) =>this.stopRecordingHandler(blob)}
        />
        
      )
  }
}

export default RecordVideo;