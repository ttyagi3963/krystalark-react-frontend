import React, { Component, Fragment } from 'react'
import queryString from 'query-string';
import { Col, Row} from 'react-bootstrap';
import MessageSteps from '../../../components/steps/steps'
import {  Avatar , Popover} from 'antd'
import './collectbeneficiaryInfo.css';




class CollectbeneficiaryInfo extends Component{

    state={}

    componentDidMount=(props)=>{
        const bId= queryString.parse(this.props.location.search).bId
        const mId= queryString.parse(this.props.location.search).mId

        fetch("http://localhost:8080/beneficiary/"+bId,{
            method:'GET',
            headers:{
                'authorization': ' Bearer '+this.props.token,
            
            }
        })
        .then(result =>{
            if(result.status !==  200 && result.status !== 201){
                throw new Error('Could not get list')
            }
            return result.json();
        })
        .then(b =>{
            console.log(b)
            this.setState({beneficiary: b.beneficiary})
           
        })
        .catch(err =>{
            console.log(err)
        })
        
    }

   
    inputChangeHandler=(event, field)=>{
        let inputValue = event.target.value
        switch(field){
            case 'email':
                    this.setState({email: inputValue})
            break;

            case 'ssn':
                this.setState({ssn:inputValue})
                break;
        }
       
    
    }

    buttonClickHandler =(event, field,flag) =>{
        switch(field){
            case "email":
                this.setState({isEmailAvailable: flag})
                if(!flag){
                   
                    var s = document.getElementById('emailBox').style;
                    s.opacity = 1;
                    (function fade()
                        {(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
                        document.getElementById("ssnBox").classList.add("fadeIn")
                    
                }

                break;
            
            case "ssn":
                        this.setState({isSsnAvailable: flag})
                        if(!flag){
                   
                            var s = document.getElementById('ssnBox').style;
                            s.opacity = 1;
                            (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
        
                            
                        }
                        break;
        }
    }
  render(){
      let bName = '';
      if(this.state.beneficiary) {
          bName =this.state.beneficiary.name
      }

      let emailClass=['form-group', 'hidden']
      if(this.state.isEmailAvailable)
        emailClass= ['form-group']

        let ssnClass=['form-group', 'hidden']
        if(this.state.isSsnAvailable)
          ssnClass= ['form-group']

         let phoneClass=['form-group', 'hidden']
        if(this.state.isPhoneAvailable)
          phoneClass= ['form-group']

          let addressClass=['form-group', 'hidden']
          if(this.state.isAddressAvailable)
          addressClass= ['form-group']


      return(
          <Fragment>
             
              <Row className="RecipientContainer">
              <MessageSteps currentStep={4}></MessageSteps>
              <Col xs={12}>
                  <h5>{bName}' Information</h5>
              </Col>
               <Col xs={12} sm={3}>
                    <div className="AvatarContainer">
                        <Avatar shape="square" size={164} icon="user" />
                    </div>
               </Col>
               <Col xs={12} sm={9}>
               <div className="QuestionBox" id="emailBox">
                    <h6>Do You know {bName}' email?</h6>

                    <div className={emailClass.join(' ')} style={{marginTop:'20px'}}> 
                        <label htmlFor="email">Email</label>
                                    
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        id="email" 
                                        onChange={(event)=>this.inputChangeHandler(event,'email')}
                                        
                                        >   
                                     </input>
                    </div>
                    <div className={this.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'email',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'email',true)}>Yes, I have it!</button>
                     </div>
                     <div className={!this.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.fieldSaverHandler(event,'email')}>Save Email</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.buttonClickHandler(event,'email',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div className="InfoBox">
                                   <strong>Why do we need {bName}'s email?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

               <div className="QuestionBox hidden" id="ssnBox">
                    <h6>No Problem! How about {bName}' Social Security Number?</h6>

                    <div className={ssnClass.join(' ')} style={{marginTop:'20px'}}> 
                        <label htmlFor="ssn">Social Security Number</label>
                                    
                                    <input 
                                        type="ssn" 
                                        className="form-control" 
                                        name="ssn" 
                                        id="ssn" 
                                        onChange={(event)=>this.inputChangeHandler(event,'ssn')}
                                        
                                        >   
                                     </input>
                    </div>
                    <div className={this.state.isSsnAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'ssn',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'ssn',true)}>Yes, I have it!</button>
                     </div>
                     <div className={!this.state.isSsnAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.fieldSaverHandler(event,'ssn')}>Save Email</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.buttonClickHandler(event,'ssn',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div className="InfoBox">
                                   <strong>Why do we need {bName}'s SSN?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

               <div className="QuestionBox  hidden" id="phoneBox">
                    <h6>Ok! How about {bName}' Phone Number?</h6>

                    <div className={phoneClass.join(' ')} style={{marginTop:'20px'}}> 
                        <label htmlFor="phone">Phone</label>
                                    
                                    <input 
                                        type="phone" 
                                        className="form-control" 
                                        name="phone" 
                                        id="phone" 
                                        onChange={(event)=>this.inputChangeHandler(event,'phone')}
                                        
                                        >   
                                     </input>
                    </div>
                    <div className={this.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'phone',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'phone',true)}>Yes, I have it!</button>
                     </div>
                     <div className={!this.state.isEmailAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.fieldSaverHandler(event,'phone')}>Save Phone</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.buttonClickHandler(event,'phone',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div className="InfoBox">
                                   <strong>Why do we need {bName}'s phone number?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

               <div className="QuestionBox  hidden" id="addressBox">
                    <h6>Do you know {bName}' address?</h6>

                    <div className={addressClass.join(' ')} style={{marginTop:'20px'}}> 
                        <label htmlFor="phone">Phone</label>
                                    
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="street" id="street" 
                                                    onChange={(event)=>this.inputChangeHandler(event,'street')}
                                                    placeholder="Street Address"
                                                    >
                                            </input>
                                            <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="apt" id="apt" 
                                                    onChange={(event)=>this.inputChangeHandler(event,'apt')}
                                                    placeholder="Apt/Suite #"
                                                    >
                                            </input>
                                            <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="city" id="city" 
                                                    onChange={(event)=>this.inputChangeHandler(event,'city')}
                                                    placeholder="City"
                                                    >
                                            </input>
                                            <select 
                                                    name="state" id="state" 
                                                    className="form-control" 
                                                    onChange={(event)=>this.inputChangeHandler(event,'state')}>
                                                        <option value="ca">California</option>
                                                    </select>
                    </div>
                    <div className={this.state.isAddressAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'add',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'add',true)}>Yes, I have it!</button>
                     </div>
                     <div className={!this.state.isAddressAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.fieldSaverHandler(event,'add')}>Save Address</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.buttonClickHandler(event,'add',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div className="InfoBox">
                                   <strong>Why do we need {bName}'s Address?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>






















                              

                         



                            
                                

                                
                                

                                
                                
                        
               </Col>
               </Row>
          </Fragment>
           
          
      )
  }
}

export default CollectbeneficiaryInfo;