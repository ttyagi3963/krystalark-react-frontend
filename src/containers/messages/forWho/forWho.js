import React , { Component, Fragment } from 'react';
import {List, Card} from 'antd';
import { Steps, Button, message, DatePicker } from 'antd/';
import {Field, formInputData, formValidation} from 'reactjs-input-validator';
import 'antd/dist/antd.css'
import './forWho.css';


const { Step } = Steps;

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'MM/DD/YYYY';
const monthFormat = 'MM/YYYY'; 
const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];  

class ForWho extends Component{

    state ={
        current: 0,
       
       
        data : [
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
          ],
          messageType:[
              {
                  title:"Written Messages",
                  id:"type-1"
              },
              {
                title:"Video Messages",
                id:"type-2"
              },
              {
                title:"Important documents",
                  id:"type-3"
               },
               {
                title:"Accounts & Passwords",
                id:"type-4"
                },
                {
                    title:"Other",
                    id:"type-5"
                }
          ],
          messageDelivery:[
              {
                  title:"Immediately After My Passing",
                  id: "Delivery-1"
              },
              {
                title:"At a Specific Date After My Passing",
                id: "Delivery-2"
            },
            {
                title:"At a future Date",
                id: "Delivery-3"
            }
          ],
          messageFrequency:[
            {
                title:"Recurring",
                id: "Freq-1"
            },
            {
              title:"One Time Only",
              id: "Freq-2"
            }
        ]
        
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }

    createMessageHandler = (data, parent,event) =>{
        
        document.querySelectorAll('.ant-card').forEach(function(el){
           el.classList.remove("SelectedBox")
        });       

        event.target.closest('.ant-card').classList.add("SelectedBox");
        document.getElementById(parent).className="animated fadeOut";

        switch(parent){
           
            case 'relationship':
                    this.setState({"relationship":data})
                    this.props.storeMessageStates("relationship",data)
                    setTimeout(()=>{                       
                        document.getElementById("relationshipMessage").className="animated fadeIn"
                        this.next();
                       },
                  500
                   )
                   break;

            case 'messageType':
                    this.setState({"messageType":data})
                    this.props.storeMessageStates("messageType",data)  
                    setTimeout(()=>{                      
                        document.getElementById("messageDeliveryWhen").className="animated fadeIn"
                        this.next();
                       },
                   500
                   )
                   break;

            case 'messageDeliveryWhen':
                let nextScreen = null;

                        this.setState({"messageDeliveryWhen":data},function(){
                            if(this.state.messageDeliveryWhen === 'Immediately After My Passing') 
                            {
                                nextScreen = "message"
                            }  
                            else{
                                nextScreen = "messageFrequency"
                               
                            }                   
                        })
                        this.props.storeMessageStates("messageDeliveryWhen",data)  
                        setTimeout(()=>{     
                            document.getElementById(nextScreen).className="animated fadeIn"
                           },
                       500
                       )
                       break;

            case 'messageFrequency':
                let typeOfCalendar=null;
                this.props.storeMessageStates("messageFrequency",data)  
                
                    this.setState({"messageFrequency":data}, function(){
                            if(this.state.messageFrequency =="One Time Only"){
                                 typeOfCalendar = "oneTimeonlyDate"
                            }
                            else{
                                
                            }
                    })
                    setTimeout(()=>{                               
                       document.getElementById(typeOfCalendar).className="animated fadeIn"
                                
                      },
                       500
                      )
             break;
              
        }
      
        
    }

    onDateChange =(date, dateString) => {
        this.props.storeMessageStates("oneTimeDate",dateString)  
        this.setState({"messageFrequency":dateString}, function(){
              console.log(this.state)
            })
    }

    
    render(){
        
        
        return(
            <div className="MessageContainer">
               
               <Steps current={this.state.current}>
                <Step title="Relationship" description="How are you related" />
                <Step title="Message Type" description="The type of message" />
                <Step title="Schedule" description="When should the message be sent" />
                <Step title="Reciever's Info" description="Contact Information of Reciever" />
                <Step title="Send Message" description="Compose and send" />

            </Steps>

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
                  
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item id={item.id}>
                            <Card id={item.id+"Card"} title={item.title} onClick={(event) => this.createMessageHandler(item.title,'relationship',event)}>send to {item.title}</Card>
                      </List.Item>
                    )}
                />
      
            </div>
            <div id="relationshipMessage" className="hidden">
               <h1>Perfect!!! Lets get started.</h1>     
               <h4>Whats is ur {this.state.relationship}'s Full Name?</h4>    
               <div>
               <div className="form-group">
                       <Field
                            name="name"
                            id = "name"
                            label = "Full name"
                            type = "text"
                            placeholder = "Full name"
                            onChange = {this.handleChange}
                            value = {this.state.data.name}
                            shouldValidateInputs = {this.state.shouldValidateInputs}
                            required
                            requiredErrMsg = "Full name is required"
                        />
                   </div>        
               </div>
            </div>
            <div id="messageType" className="hidden" >
            <h2>Please select the type of message you are composing</h2>
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
              
                dataSource={this.state.messageType}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title} onClick={(event) => this.createMessageHandler(item.title,'messageType',event)}>Select</Card>
                  </List.Item>
                )}
            />
  
        </div>
        <div id="messageDeliveryWhen" className="hidden" >
            <h2>When Should the message be sent?</h2>
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
              
                dataSource={this.state.messageDelivery}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title} onClick={(event) => this.createMessageHandler(item.title,'messageDeliveryWhen',event)}>Select</Card>
                  </List.Item>
                )}
            />
  
        </div>
        {}
        <div id="messageFrequency" className="hidden" >
            <h2>How many times should this message be delivered?</h2>
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
              
                dataSource={this.state.messageFrequency}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title} onClick={(event) => this.createMessageHandler(item.title,'messageFrequency',event)}>Select</Card>
                  </List.Item>
                )}
            />
  
        </div>

        <div id="oneTimeonlyDate" className="hidden">
        <DatePicker onChange={this.onDateChange} format = {dateFormat} />
        </div>            

        </div>
        )
    }

}

export default ForWho;