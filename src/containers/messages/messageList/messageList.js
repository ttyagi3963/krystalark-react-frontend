import React, {Component} from 'react';


const columns = [
   
    {
      title: 'Recipient',
      dataIndex: 'messageReciever.name',
      key: '1',
    },
    {
      title: 'Message Type',
      dataIndex: 'messageType',
      key: '2',
    },
    {
        title: 'Delivery Date',
        dataIndex: 'oneTimeOnlyDate',
        key: '3',
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
          this.setState({messageList:resData.messageList})
        })
        .catch(err =>{
           
            console.log("message list error", err)
        })
    }

    render(){
        let rows = '';
       
        return(<div></div>
            // <Table striped bordered hover>
            //     <thead>
            //         <tr>
            //         <th>#</th>
            //         <th>Recipient</th>
            //         <th>Message</th>
            //         <th>Delivery</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {/* {this.state.messageList.map(message =>{
            //              (
            //                 <
            //             )
            //         }) */}
                    
            //         }
            //     </tbody>

            // </Table>
        )
    }
}

export default MessageList;