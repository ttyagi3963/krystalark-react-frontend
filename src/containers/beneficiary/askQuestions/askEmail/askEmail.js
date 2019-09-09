import React, { Component } from 'react'
import {  Avatar , Alert, Spin} from 'antd'
import './askEmail.css'

export default class AskEmail extends Component{

    afterClose = (event)=>{
        this.props.buttonClickHandler(event,'email',true)
    }

    render(){

        let emailClass=['form-group', 'hidden']
        if(this.props.state.isEmailAvailable)
          emailClass= ['form-group']


        return(
            <div className="QuestionBox fader" id="emailBox">
                    <h6><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>1</Avatar> Do You know {this.props.bName}' email?</h6>

                    <div className={emailClass.join(' ')} style={{marginTop:'20px'}}> 
                        <label htmlFor="email">Email</label>
                                    
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        id="email" 
                                        onChange={(event)=>this.props.inputChangeHandler(event,'email')}
                                        
                                        >   
                                     </input>
                                    
                    
                    </div>
                    <div id="EmailAlert" className="hidden">
                                <Alert
                                        message="Email Not Available"
                                        description="You can always add the email later"
                                        type="error"
                                        closable
                                        closeText="Add email"
                                        afterClose = {this.afterClose}
                                        showIcon></Alert>
                                       
                                                    
                    </div>
                   
                    <div id="emailQuestion" className={this.props.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.props.buttonClickHandler(event,'email',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.props.buttonClickHandler(event,'email',true)}>Yes, I have it!</button>
                     </div>
                     <div id="emailSave" className={!this.props.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.props.emailSaverHandler(event,'email')}>Save Email { this.props.state.showEmailLoader? <Spin />: ''}</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.props.buttonClickHandler(event,'email',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div id="emailInfoBox" className="InfoBox">
                                   <strong>Why do we need {this.props.bName}'s email?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

        )
    }

}