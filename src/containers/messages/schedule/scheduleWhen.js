import React , { Component, Fragment } from 'react';
import {List, Card, Radio} from 'antd';
import MessageSteps from '../../../components/steps/steps'

import 'antd/dist/antd.css'
import './scheduleWhen.css';

class MessageType extends Component{
    state ={
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
         
        
         //this. props.history.push('/createMessage/scheduleWhen')
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        localStorage.setItem("frequency",e.target.value);
      };

    render(){
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

                <div id="frequency" className="animated">
                    <h3>Cool! How about the frequency?</h3>
                    <p>For example,  a Birthday wish can be scheduled to be delivered on a set day,every year</p>
                    <div className="frequencyRadio">
                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio value="recurring">Recurring </Radio>
                        <Radio value="once">One Time Only</Radio>
                       
                    </Radio.Group>
                    </div>
                </div>

         
        </div>
        
        )
    }
}
export default MessageType;
