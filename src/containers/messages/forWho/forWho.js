import React , { Component } from 'react';
import {List, Card} from 'antd';
import 'antd/dist/antd.css'
import './forWho.css';

 
  

class ForWho extends Component{

    state ={
        steps:[
            {  forWho:0 }           
            ],
        data : [
            {
              title: 'Father',
            },
            {
              title: 'Mother',
            },
            {
              title: 'Son',
            },
            {
              title: 'Daughter',
            },
            {
              title: 'Sister',
            },
            {
              title: 'Brother',
            },
          ]
        
    }

    forWhoHandler = (who, parent) =>{
        this.props.storeMessageStates("forWho",who)
        
    }
    
    render(){

        return(
            <div id="categories" >
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
                        <List.Item>
                            <Card title={item.title} onClick={() => this.forWhoHandler(item.title,'categories')}>send to {item.title}</Card>
                      </List.Item>
                    )}
        />
      
            </div>
        )
    }

}

export default ForWho;