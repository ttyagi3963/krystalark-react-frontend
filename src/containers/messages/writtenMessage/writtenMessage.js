import React, { Component } from 'react';
import './writtenMessage.css'

class WrittenMessage extends Component{

    render(){
        return(

            <div>
                <div class="form-group">
                    <label for="user">Message Recipient</label>
                    <input type="text" class="form-control" name="user" id="user" disabled value={localStorage.getItem('fullName')}/>
                 </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" class="form-control" id="subject" name="subject"/>
                </div>

               
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea  class="form-control" id="message" name="message"/>
                </div>
            </div>
        )
    }
}

export default WrittenMessage;