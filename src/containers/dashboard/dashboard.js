import React , {Component, Fragment} from 'react';
import { Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BeneficiaryList from '../beneficiary/beneficiaryList';
import MessageList from '../messages/messageList/messageList';
import './dashboard.css';
import Silhoutte from '../../static/img/m.jpg';
import Modal from '../../utilities/modal'

class Dashboard extends Component{
   state = {
      userInfo:{},
      beneList:[],
      modalShow: false
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

   inputChangeHandler =(value, file) =>{
        this.setState({postData: file}, function(){
            console.log(this.state.postData.size)
        })
    }

   handlePicModal =(event)=>{
       event.preventDefault();
       this.setState({modalShow:true})
   }

   uploadProfilePicHandler =(event) =>{
    event.preventDefault();
    let formData = new FormData();
    formData.append('fileObject',this.state.postData);   

        fetch('http://localhost:8080//uploadProfilePic',{
            method:'POST',
            headers:{
                'authorization': ' Bearer '+this.props.token,
            
            },
            body: formData
        })
        .then(res =>{
            return res.json();
        })
        .then(resData => {
            console.log(resData)
            // const pic = "http://localhost:8080/"+(resData.beneficiary.picture).replace(/\/\//g, '/')
            // this.setState({profilePic: pic, pic:pic})
        })
        .catch(err =>{
            console.log(err)
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
                                      <a href="javascript://" onClick={this.handlePicModal} className="Link">Add Profile Picture</a>
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

           <Modal 
                    modalId="addPic"
                    heading={this.state.modalHeading}                    
                    disableBackClick=""
                    modalShow={this.state.modalShow}
                    >
                       <form id="addProfilePic" encType="multipart/form-data" onSubmit={this.uploadProfilePicHandler}>
                       <input type="file" 
                             name="avatar" 
                             id="avatar"
                            onChange={e =>this.inputChangeHandler(e.target.value, e.target.files[0])}

                            />  
                           <button type="submit" className="btn btn-primary">Upload</button>       
                       </form>
                </Modal>          
           
       </Fragment>
       )
   }
}

export default Dashboard;