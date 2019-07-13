import React , { Component} from 'react';
import {List, Card} from 'antd';
import MessageSteps from '../../../components/steps/steps'

import 'antd/dist/antd.css'
import './messageType.css';

class MessageType extends Component{
    state ={
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
        ]
    }


    createMessageHandler(title,parent,event){
        localStorage.setItem(parent,title);
        document.querySelectorAll('.ant-card').forEach(function(el){
            el.classList.remove("SelectedBox")
         });       
 
         event.target.closest('.ant-card').classList.add("SelectedBox");
         
        
         this.props.history.push('/createMessage/when')
    }

    render(){
        return(
            <div className='MessageContainer'>
                <MessageSteps currentStep={1}></MessageSteps>
                <div id="messageType" className="animated" >
                    <h2>Please select the type of message you are composing for {localStorage.getItem('bName')}</h2>
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

         
        </div>
        
        )
    }
}
export default MessageType;
