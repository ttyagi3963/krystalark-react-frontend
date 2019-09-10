import React, { Component, Fragment } from 'react'
import {  Avatar , Alert, Spin} from 'antd'
import './askEmail.css'

export default class AskEmail extends Component{

    state={
        email:''
    }

    afterClose = (event)=>{
        this.props.buttonClickHandler(event,'email',true)
    }

    inputChangeHandler=(event)=>{
        let inputValue = event.target.value
        this.setState({email: inputValue})
    }

    emailSaverHandler = (event,field) =>{
       
        if(this.state.email){
            this.setState({showEmailLoader: true})
            const formData= new FormData();
            
            formData.append("bId", this.state.bId)
            formData.append("email", this.state.email)    
            
            fetch("http://localhost:8080/beneficiary/updateBeneficiaryEmail",{
                method:'POST',
                headers:{
                    'authorization': ' Bearer '+this.props.token,
                
                },
                body: formData
            })
            .then(result =>{
                this.setState({showEmailLoader: false})
                if(result.status ===  500 ){
                    throw new Error('Unable to Update beneficiary')
                }
                return result.json();
            })
            .then(resData =>{
                console.log(resData)
                // this.setState({email})
                
               
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }

    emailQuestionClickHandler =(event, flag) =>{
       
         this.setState({isEmailAvailable: flag},function(){
                     if(!flag){
                         document.getElementById('EmailAlert').classList.remove("hidden") ;
                         document.getElementById('emailQuestion').classList.add("hidden");
                         document.getElementById('emailInfoBox').classList.add("hidden")
                         document.getElementById('emailSave').classList.add("hidden")
                         if(this.props.nextSlide)
                            document.getElementById(this.props.nextSlide).classList.remove("fadedOut");                         
                      }                
                 
                 })
            }

    render(){

        let emailClass=['form-group', 'hidden']
        if(this.state.isEmailAvailable)
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
                                        onChange={this.inputChangeHandler}
                                        
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

                   
                    <div id="emailQuestion" className={this.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.emailQuestionClickHandler(event,false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.emailQuestionClickHandler(event,true)}>Yes, I have it!</button>
                     </div>
                     <div id="emailSave" className={!this.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.emailSaverHandler(event,'email')}>Save Email { this.state.showEmailLoader? <Spin />: ''}</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.emailQuestionClickHandler(event,false)} style={{fontSize:"13px",marginLeft:'15px'}}>I cant remember!</a>
                     </div>
                     <div id="emailInfoBox" className="InfoBox">
                                   <strong>Why do we need {this.props.bName}'s email?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

        )
    }

}