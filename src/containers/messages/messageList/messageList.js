import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
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
            if(result.status === '200')
                 return result.json();
                 else
                return ''
        })
        .then(resData => {
            if(resData.length >0)
                this.setState({messageList:resData})
             else{

             }
        })
        .catch(err =>{
           
            console.log("message list error", err)
        })
    }

    render(){
        
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Recipient</th>
                    <th>Message</th>
                    <th>Delivery</th>
                    </tr>
                </thead>
                <tbody>
                    </tbody>
            </Table>
        )
    }
}

export default MessageList;