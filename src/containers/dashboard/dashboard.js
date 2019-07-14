import React , {Component, Fragment} from 'react';
import { Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BeneficiaryList from '../beneficiary/beneficiaryList';
import MessageList from '../messages/messageList/messageList';
import './dashboard.css';
import Silhoutte from '../../static/img/m.jpg'

class Dashboard extends Component{
   state = {
      userInfo:{},
      beneList:[]
   }

   componentDidMount(){
      
       fetch('http://localhost:8080/getUserInfo',{
                method:'GET',               
                headers:{
                    Authorization: 'Bearer ' + this.props.token
                }
            })
            .then(user=>{
                return user.json();
            })
            .then(userData =>{              
                this.setState({userInfo: userData.userInfo, beneList: userData.userInfo.beneficiarys})
            })
            .catch(err =>{
                console.log("user retrieval error", err)
            })

       

   }

   render(){
      
       return(
       <Fragment>
           <Col xs={12} sm={3} className="LeftSide">
                <div className="ProfilePicBlock">
                    <div className="ProfilePic">
                       
                            {this.state.userInfo.gender ? 
                            <div>
                                <img src={this.state.userInfo.picture} alt="Profile Pic" />
                                <p style={{padding:'40px 0 0 0 '}}><a href="" className="Link">Change Profile Picture</a></p>
                            </div>
                                
                                
                                : 
                                <div>                                   
                                  <img src={Silhoutte} alt="Profile Pic" />
                                  <div style={{padding:'40px 0 0 0 '}}>
                                      <a href="" className="Link">Add Profile Picture</a>
                                 </div>
                                </div>
                            }
                       
                        
                    </div>
                    <div className="ProfileData">
                        <p><b>Name:</b> {this.state.userInfo.name}</p>
                        <p>
                            <b>Email: </b> 
                            {this.state.userInfo.email ? 
                                this.state.userInfo.email 
                                : 
                                <Link to={"/updateProfile?id"+this.state.userInfo._id}>Add</Link>}
                                </p>

                            <p>
                            <b>Gender: </b> 
                            {this.state.userInfo.gender ? 
                                this.state.userInfo.gender 
                                : 
                                <Link to={"/updateProfile?id"+this.state.userInfo._id}>Add</Link>}
                                </p>
                            <p>
                            <b>DOB: </b> 
                            {this.state.userInfo.dateOfBirth ? 
                                this.state.userInfo.dateOfBirth 
                                : 
                                <Link to={"/updateProfile?id"+this.state.userInfo._id}>Add</Link>}
                                </p>
                            <p>
                            {this.state.userInfo.loginCount ? 
                                <span><b>Logins: </b> 
                                
                                {this.state.userInfo.loginCount}  {this.state.userInfo.loginCount===1 ? 'time' : 'times'}
                                </span>
                                : 
                                <Link to={"/updateProfile?id"+this.state.userInfo._id}>Add</Link>}
                            </p>
                    </div>
                </div>
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