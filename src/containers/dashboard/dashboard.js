import React , {Component, Fragment} from 'react';
import { Col, Row} from 'react-bootstrap';
import BeneficiaryList from '../beneficiary/beneficiaryList';
import MessageList from '../messages/messageList/messageList';
import './dashboard.css';


class Dashboard extends Component{
   state = {
      userInfo:{},
      beneList:[]
   }

   componentDidMount(){
       fetch('http://localhost:8080/getUserInfo',{
                method:'GET',
                method: 'GET',
                headers:{
                    Authorization: 'Bearer ' + this.props.token
                }
            })
            .then(user=>{
                return user.json();
            })
            .then(userData =>{              
                this.setState({userInfo: userData, beneList: userData.userInfo.beneficiarys})
            })
            .catch(err =>{
                console.log("user retrieval error", err)
            })

       

   }

   render(){
      
       return(
       <Fragment>
           <Col xs={12} sm={3} className="LeftSide">
            tt
           </Col>
           <Col xs={12} sm={9} className="RightSide">
               <Col xs={12}  className="Boxes">
                   <p className="Heading">Your Beneficiaries</p>
                   <ul className="BeneficiaryList">
                        <BeneficiaryList token={this.props.token} beneList={this.state.beneList}></BeneficiaryList>
                    </ul>
               </Col>
               <Col xs={12} className="Boxes" style={{marginTop:'40px'}}>
                   <p className="Heading"> Your Messages</p>
                    <MessageList token = {this.props.token}></MessageList>

               </Col>
           </Col>
           
       </Fragment>
       )
   }
}

export default Dashboard;