import React , { Component, Fragment } from 'react';
import {List, Card} from 'antd';
import { Steps, Button, message } from 'antd/';
import 'antd/dist/antd.css'
import './forWho.css';


const { Step } = Steps;


 
  

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
          },
          {
              title:"At a future Date",
              id: "Freq-3"
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
           
            case 'categories':
                    this.setState({"for":data})
                    this.props.storeMessageStates("forWho",data)
                    setTimeout(()=>{                       
                        document.getElementById("messageCategory").className="animated fadeIn"
                        this.next();
                       },
                   500
                   )
                   break;

            case 'messageCategory':
                    this.setState({"mCat":data})
                    this.props.storeMessageStates("messageCategory",data)  
                    setTimeout(()=>{                      
                        document.getElementById("messageDelivery").className="animated fadeIn"
                        this.next();
                       },
                   500
                   )
                   break;

            case 'messageDelivery':
                        this.setState({"delivery":data})
                        setTimeout(()=>{                           
                            document.getElementById("messageFrequency").className="animated fadeIn"
                            
                           },
                       500
                       )
                       break;

            case 'messageFrequency':
                    this.setState({"frequency":data})
                            setTimeout(()=>{                               
                                document.getElementById("messageFrequencyDate").className="animated fadeIn"
                                
                               },
                           500
                           )
                           break;
              
        }
      
        
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

            <div id="categories" className="animated" >
                <h2>How are you related to the reciever of your message?</h2>
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
                            <Card id={item.id+"Card"} title={item.title} onClick={(event) => this.createMessageHandler(item.title,'categories',event)}>send to {item.title}</Card>
                      </List.Item>
                    )}
                />
      
            </div>
            <div id="messageCategory" className="hidden" >
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
                        <Card title={item.title} onClick={(event) => this.createMessageHandler(item.title,'messageCategory',event)}>Select</Card>
                  </List.Item>
                )}
            />
  
        </div>
        <div id="messageDelivery" className="hidden" >
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
                        <Card title={item.title} onClick={(event) => this.createMessageHandler(item.title,'messageDelivery',event)}>Select</Card>
                  </List.Item>
                )}
            />
  
        </div>
        <div id="messageFrequencyDate" className="hidden" >
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

        <div id="MessageDates">
            this is messahe form
            </div>            

        </div>
        )
    }

}

export default ForWho;