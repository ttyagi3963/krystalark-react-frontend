import React , { Component, Fragment } from 'react';
import {List, Card} from 'antd';
import MessageSteps from '../../../components/steps/steps'

import 'antd/dist/antd.css'
import './relationship.css';

class Relationship extends Component{
    state ={
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

        // document.querySelectorAll('.ant-card:not(.SelectedBox)').forEach( el=>{
         
        //         el.classList.add("animated")
        //         el.classList.add("fadeOut")
        // })
        //  document.getElementById("relationshipMessage").className="animated fadeIn"
         
         this. props.history.push('/createMessage/messageType')
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

            <div id="relationshipMessage" className="hidden">
                <h2>Perfect! </h2>
                <h5>What is ur {this.state.relationship}'s full name?</h5>
            </div>
        </div>
        
        )
    }
}
export default Relationship;
