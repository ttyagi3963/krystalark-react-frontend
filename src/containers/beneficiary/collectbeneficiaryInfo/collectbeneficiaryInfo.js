import React, { Component, Fragment } from 'react'
import queryString from 'query-string';
import { Col, Row} from 'react-bootstrap';
import MessageSteps from '../../../components/steps/steps'
import {  Avatar , Alert, Spin} from 'antd'

import AskForEmail from '../askQuestions/askEmail/askEmail'
import EmailAlreadyPresent from '../askQuestions/askEmail/EmailAlreadyPresent'
import './collectbeneficiaryInfo.css';




class CollectbeneficiaryInfo extends Component{

    state={
        beneficiary:{
            email:''
        },
        isEmailAvailable: '',
        isSsnAvailable: '',
        isPhoneAvailable: '',
        isAddressAvailable:'',
        showEmailLoader: false

    }

    componentDidMount=(props)=>{
        const bId= queryString.parse(this.props.location.search).bId
        this.setState({bId: bId})
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
            this.setState({beneficiary: b.beneficiary}, function(){
                console.log(this.state.beneficiary.email)
            })
           
        })
        .catch(err =>{
            console.log(err)
        })
        
    }

    
    ssnSaverHandler = (event,field) =>{
       
        if(this.state.ssn){
            this.setState({showSsnLoader: true})
            const formData= new FormData();
            
            formData.append("bId", this.state.bId)
            formData.append("ssn", this.state.ssn)    
            
            fetch("http://localhost:8080/beneficiary/updateBeneficiarySsn",{
                method:'POST',
                headers:{
                    'authorization': ' Bearer '+this.props.token,
                
                },
                body: formData
            })
            .then(result =>{
                this.setState({showSsnLoader: false})
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

   
    inputChangeHandler=(event, field)=>{
        let inputValue = event.target.value
        switch(field){
         
            case 'ssn':
                this.setState({ssn:inputValue})
                break;

            case 'phone':
                    this.setState({phone:inputValue})
                    break;
        }
       
    
    }

    buttonClickHandler =(event, field,flag) =>{
       console.log("flag="+flag+" field="+field)
        switch(field){
            case "email":
                this.setState({isEmailAvailable: flag},function(){
                    if(!flag){
                      
                        document.getElementById('EmailAlert').classList.remove("hidden") ;
                        document.getElementById('emailQuestion').classList.add("hidden");
                        document.getElementById('emailInfoBox').classList.add("hidden")
                        document.getElementById('emailSave').classList.add("hidden")
                        document.getElementById('ssnBox').classList.remove("fadedOut");
                        
                     }                
                
                })
                  
                   

                break;
            
            case "ssn":
                        this.setState({isSsnAvailable: flag},function(){
                            if(!flag){
                                
                                document.getElementById('ssnAlert').classList.remove("hidden") ;
                                document.getElementById('ssnQuestion').classList.add("hidden");
                                document.getElementById('ssnInfoBox').classList.add("hidden")
                                document.getElementById('ssnSave').classList.add("hidden")
                                document.getElementById('phoneBox').classList.remove("fadedOut");
                                
                            }
                        })
                        
                        break;
           case "phone":
                            this.setState({isPhoneAvailable: flag}, function(){
                                if(!flag){
                                
                                    document.getElementById('phoneAlert').classList.remove("hidden") ;
                                    document.getElementById('phoneQuestion').classList.add("hidden");
                                    document.getElementById('phoneInfoBox').classList.add("hidden")
                                    document.getElementById('phoneSave').classList.add("hidden")
                                    document.getElementById('addressBox').classList.remove("fadedOut");
                                    
                                }
                            })
                          
                            break;
            case "add":
                                this.setState({isAddressAvailable: flag})
                                if(!flag){
                           
                                    document.getElementById('addressBox').classList.add("fadedOut");
                                    //document.getElementById('addressBox').classList.remove("fadedOut");
                
                                    
                                }
                                break;
        }
    }
  render(){
      let bName = '';
      if(this.state.beneficiary) {
          bName =this.state.beneficiary.name
      }

     

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
                {
                    this.state.beneficiary.email.length>2  ? <EmailAlreadyPresent /> 
                    : 
                    <AskForEmail bName={bName} token={this.state.token} state={this.state} nextSlide="ssnBox" beneficiary></AskForEmail>
                }
               
               
               
               <div className="QuestionBox fader fadedOut" id="ssnBox">
                    <h6><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>2</Avatar> No Problem! How about {bName}' Social Security Number?</h6>

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
                    <div id="ssnAlert" className="hidden">
                                <Alert
                                        message="SSN Not Available"
                                        description="You can always add the SSN later"
                                        type="warning"
                                        showIcon
                                       
                                                    />
                    </div>
                   
                    <div id="ssnQuestion" className={this.state.isSsnAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'ssn',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'ssn',true)}>Yes, I have it!</button>
                     </div>
                     <div id="ssnSave" className={!this.state.isSsnAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.ssnSaverHandler(event,'ssn')}>Save SSN</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.buttonClickHandler(event,'ssn',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div id="ssnInfoBox" className="InfoBox">
                                   <strong>Why do we need {bName}'s SSN?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

               <div className="QuestionBox fader fadedOut" id="phoneBox">
                    <h6><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>3</Avatar> Ok! How about {bName}'s Phone Number?</h6>

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
                    <div id="phoneAlert" className="hidden">
                                <Alert
                                        message="Phone Number Not Available"
                                        description="You can always add the Phone later"
                                        type="warning"
                                        showIcon
                                       
                                                    />
                    </div>
                    <div id="phoneQuestion" className={this.state.isPhoneAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'phone',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'phone',true)}>Yes, I have it!</button>
                     </div>
                     <div id="phoneSave" className={!this.state.isPhoneAvailable?'form-group hidden': 'form-group'}>
                            <button className="btn btn-primary" onClick ={(event)=>this.fieldSaverHandler(event,'phone')}>Save Phone</button>&nbsp;
                            <a href="javascript://"  onClick ={(event)=>this.buttonClickHandler(event,'phone',false)} style={{fontSize:"13px"}}>I cant remember!</a>
                     </div>
                     <div id="phoneInfoBox" className="InfoBox">
                                   <strong>Why do we need {bName}'s phone number?</strong>
                                   <p>In order to contact your beneficiary that there is a message waiting for them</p>
                               </div>
               </div>

               <div className="QuestionBox  fader fadedOut" id="addressBox">
                    <h6><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>4</Avatar> Do you know {bName}'s address?</h6>

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
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'add1',false)}>No, I dont!</button>&nbsp;
                            <button className="btn btn-primary" onClick ={(event)=>this.buttonClickHandler(event,'add1',true)}>Yes, I have it!</button>
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