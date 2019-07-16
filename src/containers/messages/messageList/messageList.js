import React, {Component} from 'react';
import {Avatar, List, Card, Icon,ConfigProvider,Empty, Button, Table} from 'antd';

const columns = [
    {
      title: ' Assigned To',
      dataIndex: 'assigned',
      sorter: true,
      render: name => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Scheduled For',
      dataIndex: 'scheduled',
      filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
      width: '20%',
    },
    {
        title: 'Message Type',
        dataIndex: 'mType',
        filters: [{ text: 'Video', value: 'Video' }, { text: 'Written', value: 'Written' }],
        width: '20%',
      },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];



class MessageList extends Component{
    state ={
       messageList:[]
    }

    componentDidMount(){
        fetch('http://localhost:8080/getMessageList',{
            method: 'GET',
            headers:{
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result =>{
            console.log(typeof(result.status))
            if(result.status === 200)
                 return result.json();
                 else
                return []
        })
        .then(resData => {
            if(resData.status === '200'){
                this.setState({messageList:resData.messageList})
            }
            else{
               
                this.setState({messageList:[]})
            }
         
        })
        .catch(err =>{
           
            console.log("message list error", err)
        })
    }

    handleCreateMessage =() =>{
        window.location.href='/createMessage/relationship'
    }

customizeRenderEmpty = () => (
        <Empty
           
            imageStyle={{
            height: 60,
            }}
            description={
            <span className="NullText">
                You have not added any <b>Messages!</b>
            </span>
            }
        >
            <Button type="primary" onClick={this.handleCreateMessage}>Schedule a Message</Button>
           
      </Empty>
      );
   

    render(){
        let rows = '';
        
       
        return(
            <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
                <Table  dataSource={this.state.messageList} columns={columns}>
                    
                </Table>
             </ConfigProvider>
           
        )
    }
}

export default MessageList;