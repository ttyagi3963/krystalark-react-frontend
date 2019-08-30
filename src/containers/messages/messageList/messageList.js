import React, {Component} from 'react';
import {Col, Row, Container} from 'react-bootstrap'
import './messageList.css'


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

 

    render(){
        
        return(
            <Container className="MessageListContainer">
                <Row className="Header">
                    <Col xs={2}>Recipient</Col>
                    <Col xs={5}>Subject</Col>
                    <Col xs={2}>Delivery Date</Col>
                    <Col xs={3}>Status</Col>
                </Row>
               


                 {
                     this.state.messageList.map(record =>{
                            return (
                                <Row className="DataRow">
                                    <Col xs={2}>{record.messageReciever.name}</Col>
                                    <Col xs={5}>{record.messageSubject}</Col>
                                    <Col xs={2}>{record.messageDeliveryWhen ? record.messageDeliveryWhen : <a  href={"/createMessage/when?mid="+record._id}>Not scheduled</a>}</Col>
                                    <Col xs={3}>{record.messageDeliveryWhen && record.messageReciever.beneficiaryStatus !=="Incomplete" 
                                                    ? <a href=''>Review Message</a> 
                                                    :
                                                    !record.messageDeliveryWhen && record.messageReciever.beneficiaryStatus ==="Incomplete" ? 
                                                    <ul>
                                                        
                                                        <li><a href={'/createMessage/addBeneficiary?bId='+record.messageReciever._id}>Complete Beneficiary Info</a></li>
                                                        <li><a href={"/createMessage/when?mid="+record._id}>Schedule Message</a></li>
                                                    </ul>
                                                       
                                                    
                                                    :
                                                         !record.messageDeliveryWhen ? 'Message not scheduled' :
                                                         record.messageReciever.beneficiaryStatus ==="Incomplete" ? 'Beneficiary Info Incomplete' : ''
                                                         
                                                            
                                                            }
                                    </Col>
                                </Row>
                            )
                    })
                 }
            </Container>
           
           
        )
    }
}

export default MessageList;