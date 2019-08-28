import React , { Component} from 'react';
import {List, Card} from 'antd';
import MessageSteps from '../../../components/steps/steps'
import Modal from '../../../utilities/modal';
import $ from 'jquery';
import BeneficiaryList from '../../beneficiary/beneficiaryList'

import {Field} from 'reactjs-input-validator';
import 'antd/dist/antd.css'
import './relationship.css';
window.jQuery = window.$ = $;

class Relationship extends Component{
    state ={
        data:{},
        modalShow:false,
        modalHeading:'',
        showPreBListFlag: false,
        showNullFlag: true,
        relation : [
            {
              title: 'My Father',
              id:"category-1"
            },
            {
              title: 'My Mother',
              id:"category-2"
            },
            {
              title: 'My Son',
              id:"category-3"
            },
            {
              title: 'My Daughter',
              id:"category-4"
            },
            {
              title: 'My Sister',
              id:"category-5"
            },
            {
              title: 'My Brother',
              id:"category-6"
            },
            {
              title: 'My Wife',
              id:"category-7"
            },
            {
              title: 'My Husband',
              id:"category-8"
            },
            {
              title: 'My Girlfriend',
              id:"category-9"
            },
            {
              title: 'My Boyfriend',
              id:"category-10"
            },
            {
              title: 'My Uncle',
              id:"category-11"
            },
            {
              title: 'My Aunt',
              id:"category-12"
            },
            {
              title: 'My Grandfather',
              id:"category-13"
            },
            {
              title: 'My Grandmother',
              id:"category-14"
            },
            {
              title: 'My Grandson',
              id:"category-14"
            },
            {
              title: 'My Granddaugther',
              id:"category-13"
            },
          ]
    }

    createMessageHandler(title,parent,event){
        localStorage.setItem(parent,title);
        this.setState({relationship:title});
        event.target.closest('.ant-card').classList.add("SelectedBox");

       
        this.setState({modalHeading: "Great! Lets get Started!"})
        this.setState({modalSubHeading: "What is your "+(title).replace('My ','')+"'s Name ?"}) 
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
    console.log(firstName)
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
   

   ChooseScreenhandler =(showPreBListFlag) =>{
      this.setState({ showPreBListFlag:  showPreBListFlag})
   }

   loadBeneficiaryData =(beneList)=>{
     if(beneList.length >  0){
       this.setState({showPreBListFlag: true}, function(){
         this.setState({beneList: beneList})
       })
     }
   }
   handleClose =()=>{
      this.setState({modalShow:false})
   }

    render(){
     
        return(
            <div className='MessageContainer'>
                <BeneficiaryList token={this.props.token} loadBeneficiaryData={this.loadBeneficiaryData}></BeneficiaryList>

                <MessageSteps currentStep={0}></MessageSteps>

                {this.state.showPreBListFlag && 
                   <div className="PreexistingBeneficiary" >
                   <h2>Choose from Existing Beneficiaries?</h2>
                   <div className="PreexistingBeneficiariesContainer">
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
                        dataSource={this.state.beneList}
                        renderItem={item => (
                          <List.Item>
                            <Card title={item.name}>Select</Card>
                          </List.Item>
                        )}
                      />
                   </div>
                 </div>
                }
               {this.state.showNullFlag  && 
                <div id="relationship" className={["animated", 'DontShow'].join('')} >
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
               }
            <Modal 
                    modalId="addName"
                    heading={this.state.modalHeading}                    
                    disableBackClick="static"
                    modalShow={this.state.modalShow}
                    handleClose={this.handleClose}
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
