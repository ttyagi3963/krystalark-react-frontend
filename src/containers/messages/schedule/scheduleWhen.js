import React , { Component, Fragment } from 'react';
import {List, Card, Radio} from 'antd';
import MessageSteps from '../../../components/steps/steps'

import 'antd/dist/antd.css'
import './scheduleWhen.css';

class MessageType extends Component{
    state ={
        radioValue:'0',
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
            //this.props.history.push('/createMessage/scheduleWhen')
         }
       
        
         
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
          }, function(){
            localStorage.setItem("frequency",this.state.radioValue);
          });
       
      };

    render(){
        let dateRange = new Array(31)  
            for(var i = 0; i<dateRange.length;i++) { 
                dateRange[i] = i + 1 
            }
        const monthRange=[
                        {id:1, month:'January'},
                        {id:2, month:'Feburary'},
                        {id:3, month:'March'},
                        {id:4, month:'April'},
                        {id:5, month:'May'},
                        {id:6, month:'June'},
                        {id:7, month:'July'},
                        {id:8, month:'August'},
                        {id:9, month:'September'},
                        {id:10, month:'October'},
                        {id:11, month:'November'},
                        {id:12, month:'December'}

                        
                    ]
        return(
            <div className='MessageContainer'>
                <MessageSteps currentStep={2}></MessageSteps>
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

                <div id="frequency-oneTimeOnly" className="animated">
                    <h3>Now lets select the date</h3>
                   
                    <p><strong> Choose Frequency by selecting one below</strong></p>
                    <div className="form-group">
                        <label forName="day">Choose the day</label>
                        <select name="dayDate" id="dayDate">
                           {
                           dateRange.map(i =>{
                                 return <option value={i}>{i}</option>
                             })
                            
                            }
                            
                        </select>
                        <label forName="day">Choose the Month</label>
                        <select name="monthDate" id="monthDate">
                           {
                           monthRange.map(i =>{
                                 return <option value={i.id}>{i.month}</option>
                             })
                            
                            }
                            
                        </select>
                    </div>
                </div>

         
        </div>
        
        )
    }
}
export default MessageType;
