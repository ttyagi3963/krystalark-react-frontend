import React , { Component, Fragment } from 'react';
import {List, Card, Radio, Button} from 'antd';
import  queryString from 'query-string'
import MessageSteps from '../../../components/steps/steps'
import Cleave from 'cleave.js/react'
import 'antd/dist/antd.css'
import './scheduleWhen.css';

class MessageType extends Component{
    state ={
        radioValue:'0',
        dateRawValue: '',
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
        ]
    }
    
    componentDidMount =(props) =>{
    
    let messageId = (queryString.parse(this.props.location.search)).mid
       if(!messageId){
           this.props.history.push('/dashboard')
           return
       }

       fetch('http://localhost:8080/getMessageById/'+messageId,{
            method: 'GET',
            headers:{
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result =>{
           
            if(result.status === 200)
                 return result.json();
                 else
                return []
        })
        .then(resData => {
            if(resData.status === '200'){
                this.setState({message:resData.message})
                console.log(resData)
            }
            else{
               
                this.setState({message:''})
            }
         
        })
        .catch(err =>{
           
            console.log("message retrival error", err)
        })


    }

    createMessageHandler(title,parent,event){
        localStorage.setItem(parent,title);
        document.querySelectorAll('.ant-card').forEach(function(el){
            el.classList.remove("SelectedBox")
         });      

         event.target.closest('.ant-card').classList.add("SelectedBox");

         if(title !== "Immediately After My Passing"){
           
            document.getElementById("frequency").classList.remove("hidden")
            document.getElementById("frequency").classList.add('fadeIn');
         }
         else{
             const mId=this.state.message._id;
             const bId= this.state.message.messageReciever._id
           this.props.history.push('/createMessage/addBeneficiary?bId='+bId+'&mId='+mId)
         }
       
        
         
    }
    onDateChange =e => {
        this.setState({dateRawValue: e.target.value}, function(){
            localStorage.setItem("recurring",'')
            localStorage.setItem("oneTimeOnlyDate",this.state.dateRawValue)
        });
    }
    onMMDDChange =e => {
        this.setState({MMDD: e.target.value}, function(){
            localStorage.setItem("oneTimeOnlyDate",'')
            localStorage.setItem("recurring",this.state.MMDD)
        });
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
          }, function(){
            localStorage.setItem("frequency",this.state.radioValue);
          });
       
      };

      messageMetaDataHandler = e =>{
          const bName = localStorage.getItem('bName');
          const messageType = localStorage.getItem('messageType');
          const relationship = localStorage.getItem('relationship');
          const messageDeliveryWhen = localStorage.getItem('messageDeliveryWhen');
          const frequency = localStorage.getItem('frequency');
          const oneTimeOnlyDate = localStorage.getItem('oneTimeOnlyDate');
          const recurringDate = localStorage.getItem('recurring');
         console.log(bName)

          console.log("you are scheduling a "+ messageType +" delivery for your "+relationship+", "+bName+".")
          console.log("it will be delivered "+frequency+", "+ messageDeliveryWhen+ " on "+oneTimeOnlyDate);

          let formData = new FormData();
            formData.append('bName',bName);
            formData.append('messageType',messageType);
            formData.append('relationship',relationship);
            formData.append('messageDeliveryWhen',messageDeliveryWhen);
            formData.append('frequency',frequency);
            formData.append('oneTimeOnlyDate',oneTimeOnlyDate);
            formData.append('recurringDate',recurringDate);
           
          fetch("http://localhost:8080/createMessage",{
                method: 'POST',
                headers:{
                    'authorization': ' Bearer '+this.props.token,
                   

                   
                },
                body: formData
                
          }).then(data =>{
              return data.json()
          }).then(resData=>{
              
              const messageId = resData.messageData._id;
              const messageType =  resData.messageData.messageType;
              const bId =  resData.messageData.messageReciever;
              const messageDeliveryWhen =  resData.messageData.messageDeliveryWhen;
              const frequency =  resData.messageData.frequency;
              const createdAt =  resData.messageData.createdAt;
              const oneTimeOnlyDate =  resData.messageData.oneTimeOnlyDate;

              //cleanup localstorage
            
              localStorage.removeItem('bName');
              localStorage.removeItem('relationship');
              localStorage.removeItem('recurring');
              localStorage.removeItem('messageDeliveryWhen');
              localStorage.removeItem('oneTimeOnlyDate');
              localStorage.removeItem('messageType');

              switch(messageType){
                  case 'Video Messages':
                      this.props.history.push({
                          pathname:'/message/recordVideo',
                          state:{messageData:resData.messageData}
                      })
                  break;

                  default:
                      break;
              }


          }).catch(err =>{
              console.log("error "+err)
          })

      }

    render(){
        let buttonClass = ['btn', 'btn-primary', 'btn-lg']
       
        if(!this.state.dateRawValue && !this.state.MMDD){
           
            buttonClass =  ['btn', 'btn-primary', 'btn-lg', 'disabled']
                            
        }
        let oneTimeOnlyClass = ['animated', 'hidden']
        if(this.state.radioValue === 'once'){
            oneTimeOnlyClass = ['animated', 'fadeIn']
        }
        let oneTimeOnlyRecurringClass = ['animated', 'hidden']
        if(this.state.radioValue === 'once' || this.state.radioValue === 'recurring'){
            oneTimeOnlyRecurringClass = ['animated', 'fadeIn']
        }

        let recurringClass = ['animated', 'hidden']
        if(this.state.radioValue === 'recurring'){
            recurringClass = ['animated', 'fadeIn']
        }
        return(
            <div className='MessageContainer'>
                <MessageSteps currentStep={3}></MessageSteps>
                <div id="messageDeliveryWhen" className="animated" >
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

                <div id="frequency" className="animated hidden">
                    <h3>Cool! How about the frequency?</h3>
                    <p>For example,  a Birthday wish can be scheduled to be delivered on a set day,every year.</p>
                    <p><strong> Choose Frequency by selecting one below</strong></p>
                    <div className="frequencyRadio">
                     <Radio.Group 
                           
                            buttonStyle="solid" 
                            onChange={this.onChange} 
                            >
                        <Radio.Button value="recurring">Recurring</Radio.Button>
                        <Radio.Button value="once">One Time Only</Radio.Button>
                      
                    </Radio.Group>
                    </div>
                </div>

                <div id="frequency-oneTimeOnly" className={oneTimeOnlyClass.join(' ')}>
                    <h3>Now lets select the date</h3>
                   
                    <p><strong> Please select the date of message delivery to {localStorage.getItem("fullName")}</strong></p>
                    <div className="form-group">
                        <label htmlFor ="oneTimeOnlyDate">Please enter the date (MM/DD)&nbsp;&nbsp;</label>
                    <Cleave
                            placeholder="MM/DD"
                            options={{date: true, delimiters: ['/'],datePattern: ['m','d']}}
                            name="oneTimeOnlyDate"
                            id="oneTimeOnlyDate"
                            className="dateClass"                        
                            value={this.state.dateRawValue}                           
                            type="tel"                           
                            onChange={this.onDateChange}
                        />

                        {/* <div className="Time">
                            <h5>You can also provide the exact time of delivery on {this.state.dateRawValue}! (optional)</h5>
                            <Cleave
                            options={{ time: true,delimiters: [':'], timePattern: ['h', 'm'],timeFormat: '12'}}
                             />
                        </div> */}

                        
                </div>
                
                
                
            </div>
            <div id="frequency-recurring" className={recurringClass.join(' ')}>
                    <h3>Now lets select the date</h3>
                   
                    <p><strong> Your message will be delivered on the exact day and month of every year you choose.</strong></p>
                    <div className="form-group">
                        <label htmlFor ="oneTimeOnlyDate">Please enter the date (MM/DD)&nbsp;&nbsp;</label>
                    <Cleave
                            placeholder="MM/DD"
                            options={{date: true, delimiters: ['/'],datePattern: ['m','d']}}
                            name="recurringDate"
                            id="recurringDate"
                            className="dateClass"                        
                            value={this.state.mmdd}                           
                            type="tel"                           
                            onChange={this.onMMDDChange}
                        />
                       
                </div>
            </div>
            <div className="submitButton" className={oneTimeOnlyRecurringClass.join(' ')}>
                            <button 
                                    type="button" 
                                    className={buttonClass.join(' ')}
                                    onClick={this.messageMetaDataHandler}
                            >
                                Continue
                            </button>
                </div>

         
        </div>
        
        )
    }
}
export default MessageType;
