import React , { Component} from 'react';
import {List, Card} from 'antd';
import MessageSteps from '../../../components/steps/steps'
import Modal from '../../../utilities/modal';
import $ from 'jquery';

import {Field} from 'reactjs-input-validator';
import 'antd/dist/antd.css'
import './relationship.css';
window.jQuery = window.$ = $;

class Relationship extends Component{
    state ={
        data:{},
        modalShow:false,
        modalHeading:'',
        relation : [
            {
              title: 'Father',
              id:"category-1"
            },
            {
              title: 'Mother',
              id:"category-2"
            },
            {
              title: 'Son',
              id:"category-3"
            },
            {
              title: 'Daughter',
              id:"category-4"
            },
            {
              title: 'Sister',
              id:"category-5"
            },
            {
              title: 'Brother',
              id:"category-6"
            },
          ]
    }

    createMessageHandler(title,parent,event){
        localStorage.setItem(parent,title);
        this.setState({relationship:title});
        event.target.closest('.ant-card').classList.add("SelectedBox");

       
        this.setState({modalHeading: "Great! Lets get Started!"})
        this.setState({modalSubHeading: "What is your "+title+"'s Name ?"}) 
        this.setState({modalShow: true})
      
    }

    handleChange = (event, inputValue, inputName, validationState, isRequired) =>{

        const value = (event && event.target.value)  || inputValue;
        const {data} =  this.state;
        data[inputName] = { value, validation:validationState, isRequired }
        this.setState({
            data,
          });
   };
   onSubmitHandler =(event)=>{
    event.preventDefault();
    const firstName = (document.getElementById("firstName").value).trim();
    const mi = (document.getElementById("middleInitial").value).trim();
    const lastName = (document.getElementById("lastName").value).trim();
    
    if(mi.length>0 && mi !==" ")
    {
      localStorage.setItem("bName",firstName+' '+mi+' '+lastName)
    }
    else{
      localStorage.setItem("bName",firstName+' '+lastName)
    }
    
    this.setState({modalShow: false})
    this.props.history.push('/createMessage/messageType')
   }

    render(){
        return(
            <div className='MessageContainer'>
                <MessageSteps currentStep={0}></MessageSteps>
                <div id="relationship" className="animated" >
                <h2>Who are you scheduling this message for?</h2>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                      }}
                  
                    dataSource={this.state.relation}
                    renderItem={item => (
                        <List.Item id={item.id}>
                            <Card id={item.id+"Card"} title={item.title} onClick={(event) => this.createMessageHandler(item.title,'relationship',event)}>send to {item.title}</Card>
                      </List.Item>
                    )}
                />
      
            </div>
            <Modal 
                    modalId="addName"
                    heading={this.state.modalHeading}                    
                    disableBackClick="static"
                    modalShow={this.state.modalShow}
                    >
                    <h5>{this.state.modalSubHeading}</h5>
                     <form onSubmit={this.onSubmitHandler} noValidate>
                        <div className="form-group">
                        <Field
                                name="firstName"
                                id = "firstName"
                                label = "First Name"
                                type = "text"
                                placeholder = "First Name"
                                onChange = {this.handleChange}
                                value = {this.state.data.firstName}
                                shouldValidateInputs = {this.state.shouldValidateInputs}
                                required
                                requiredErrMsg = "First name is required"
                            />
                        </div>
                        <div className="form-group">
                        <Field
                                name="middleInitial"
                                id = "middleInitial"
                                label = "Middle Initial (optional)"
                                className="middleInitial"
                                type = "text"
                                placeholder = "Middle Name"
                                onChange = {this.handleChange}
                                value = {this.state.data.middleInitial}
                                shouldValidateInputs = {this.state.shouldValidateInputs}
                                
                            />
                        </div>
                        <div className="form-group">
                        <Field
                                name="lastName"
                                id = "lastName"
                                label = "Last Name"
                                type = "text"
                                placeholder = "Last Name"
                                onChange = {this.handleChange}
                                value = {this.state.data.lastName}
                                shouldValidateInputs = {this.state.shouldValidateInputs}
                                required
                                requiredErrMsg = "Last name is required"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Next</button>
                      </form>       
                </Modal>             
           
        </div>
        
        )
    }
}
export default Relationship;
