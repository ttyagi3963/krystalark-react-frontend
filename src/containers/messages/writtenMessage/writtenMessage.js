import React, { Component } from 'react';
import MessageSteps from '../../../components/steps/steps';
import Dropzone from 'react-dropzone'

import {Button} from 'react-bootstrap';
import './writtenMessage.css'



class WrittenMessage extends Component{
    constructor(props){
        super(props);
        this.state={
            filesPreview:[],
            filesToBeSent:[],
            printcount:10,
          
      }
    }
      onDrop =(acceptedFiles) =>{
          // console.log('Accepted files: ', acceptedFiles[0].name);
          var filesToBeSent=this.state.filesToBeSent;

        
                filesToBeSent.push(acceptedFiles);
                var filesPreview=[];
                for(var i in filesToBeSent){
                    filesPreview.push(<li key={i} className="list-group-item list-group-item-success"> {filesToBeSent[i][0].name}</li>)
                  }
                  this.setState({filesToBeSent,filesPreview});
               
             
      }
    
    writtenMessageSubmitHandler  = (event) =>{
        event.preventDefault();
        let formData = new FormData();
        formData.append("bName",document.getElementById("bName").value);
        formData.append("messageSubject",document.getElementById("subject").value);
        formData.append("messageBody",document.getElementById("message").value)
        const relationship =(document.getElementById("relationship").value).trim().split(' ')
        console.log("relationship fe ="+relationship[1])
        formData.append("relationship",relationship[1])
        var filesArray = this.state.filesToBeSent;
        for(var i in filesArray){
           formData.append("filesUploaded",filesArray[i][0])
          }
          
        

        fetch('http://localhost:8080/createWrittenMessage',{
              
                method:'POST',
                headers:{
                    'authorization': ' Bearer '+this.props.token,
                    
                },
                body: formData
            })
            .then(data =>{
                return data.json()
            })
            .then(resData =>{
                this.props.history.push('/createMessage/when')    
            })
            .catch(err =>{
                console.log(err)
            })

    }
    render(){
      
        return(

            <div className='MessageContainer'>
                 <MessageSteps currentStep={2}></MessageSteps>
                <form method="Post"  onSubmit={this.writtenMessageSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="user">Message Recipient</label>
                    <input type="text" className="form-control" name="bName" id="bName" disabled value={localStorage.getItem('bName')}/>
                    <input type="hidden"  name="relationship" id="relationship" value={localStorage.getItem('relationship')}/>
                 </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text"  className="form-control" id="subject" name="subject"/>
                </div>

               
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" name="message"/>
                </div>
                <div className="DropZoneContainer">
                <label>Attach files - You can attach images, documents, videos, pdf etc (optional)</label>

                <Dropzone  
                    onDrop={(files) => this.onDrop(files)}  
                    accept='video/quicktime, video/x-ms-wmv,video/mp4,image/jpeg, image/png,image/gif, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,audio/mpeg,Waveform Audio Format, video/webm,	image/webp, video/mpeg,pdf, video/x-msvideo, text/plain,audio/aac'
                    multiple>
                    {({getRootProps, getInputProps, isDragActive, isDragReject,rejectedFiles}) => (
                        <div {...getRootProps()}>
                        <input {...getInputProps()} id="filesUploaded" name="filesUploaded"/>
                        {isDragActive ? "" : 'Click me or drag a file to upload!'}
                        {isDragReject && (
                            <div className="text-danger">
                            File type not accepted, sorry!
                          </div>
                        )}
                        </div>
                    )}
                </Dropzone>
                </div>
                <ul className="">
                    {this.state.filesPreview}
                </ul>

               
               
                <Button variant="primary" size="lg" type="submit">
                   Save Message
                </Button>
                </form>
            </div>
           
        )
    }
}

export default WrittenMessage;