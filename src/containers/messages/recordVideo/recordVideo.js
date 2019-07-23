import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder'
import { Radio } from 'antd'
import './recordVideo.css';


class RecordVideo extends Component{
    state ={
        showUploadForm:false,
        fileObject:'' 

    }
    stopRecordingHandler =(blob)=>{
        this.setState({showUploadForm: true})
        var fileName = this.getFileName('webm');
        // let video = URL.createObjectURL(blob);
        var fileObject = new File([blob], fileName, {
            type: 'video/webm'
        });
        this.setState({fileObject: fileObject});
       
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

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            video: e.target.value,
          })
       
      };

  render(){
    let buttonClass = ['btn', 'btn-primary', 'btn-lg']
    
    let formClass= ['hideForm', 'ButtonControls']
    if(this.state.showUploadForm){
        formClass = ['showForm', 'ButtonControls']
    }
    

      return(
         
          <div className="col-12 VideoContainer">
              <h2>Lets Upload Your Video Message</h2>
              {/* <h5>It will be delivered <b>{deliveryWhen}</b> on {deliveryDate}, after you pass away. </h5> */}

              <h4 style={{marginTop:'100px'}}>Would You like to Record a new Video or upload an existing one?</h4>
              <div className="frequencyRadio">
                  <h5> Select Below</h5>
                     <Radio.Group 
                           
                            buttonStyle="solid" 
                            onChange={this.onChange} 
                            >
                        <Radio.Button value="old">Upload Exisiting Video file</Radio.Button>
                        <Radio.Button value="new">Record a New Video</Radio.Button>
                      
                    </Radio.Group>
                </div>
                {this.state.video === 'new' && 
                     <div className="VideoScreen">
                     <VideoRecorder 
                         onRecordingComplete={(blob) =>this.stopRecordingHandler(blob)}
                       
                         />
                 </div>
                }

               
                {this.state.video === 'old' &&
                   
                    <div className="form-group">
                        <label htmlFor="fileObject">Upload file</label>
                        <input type = "file" name="fileObject" className="UploadFile"></input>
                        </div>
                   
                }

              

                  <div className={formClass.join(' ')}>
                      <form action="/upload" encType="multipart/form-data" method="POST" onSubmit={this.saveVideoHandler}>
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