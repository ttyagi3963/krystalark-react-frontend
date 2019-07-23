import React , {Component, Fragment} from 'react';
import { Col, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BeneficiaryListRow from '../beneficiary/beneficiaryListRowDisplay';
import MessageList from '../messages/messageList/messageList';
import './dashboard.css';
import Silhoutte from '../../static/img/m.jpg';
import UsageProgress from '../../components/userProgress/userProgress'
import Modal from '../../utilities/modal'

class Dashboard extends Component{
   state = {
      userInfo:{},
      beneList:[],
      modalShow: false,
      modalHeading: "Add Profile Picture",
      ShowCloseButton:true,
      profilePic:Silhoutte
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
               if(userData.userInfo.picture){               
                this.setState({profilePic:(userData.userInfo.picture).replace(/\\/g,"/")})  
               }
   
                this.setState({userInfo: userData.userInfo, 
                    beneList: userData.userInfo.beneficiarys,
                    diskUsage:userData.userInfo.usedDiskSpace,
                    allotedDiskCapacity:userData.userInfo.assigedDiskSpace
                })
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
   handleModalClose =(event) =>{
    event.preventDefault();
    this.setState({modalShow:false})
   }

   uploadProfilePicHandler =(event) =>{
    event.preventDefault();
    let formData = new FormData();
    formData.append('avatar',this.state.postData);  
    formData.append('fileSize',this.state.postData.size) 

        fetch('http://localhost:8080/uploadProfilePic',{
            method:'POST',
            headers:{
                'authorization': ' Bearer '+this.props.token,
            
            },
            body: formData
        })
        .then(res =>{
            this.setState({modalShow:false})
            return res.json();
        })
        .then(resData => {
          
            const pic = (resData.picPath).replace(/\\/g,"/");
            this.setState({profilePic: pic, diskUsage: resData.usedDiskSpace})
        })
        .catch(err =>{
            console.log(err)
        })
   }

   render(){
       let usagePercentage = 0
       if(this.state.diskUsage > 0){
        usagePercentage = (this.state.diskUsage/this.state.allotedDiskCapacity)*100
       }
      
       return(
       <Fragment>
           <Col xs={12} sm={3} className="LeftSide">
                <div className="ProfilePicBlock">
                    <div className="ProfilePic">
                       
                            {this.state.profilePic !== Silhoutte ? 
                            <div>
                                <img className="Pic" src={"http://localhost:8080/"+this.state.profilePic} alt="Profile Pic" />
                                <p style={{padding:'20px 0 0 0 '}}><a href="javascript://" onClick={this.handlePicModal} className="Link">Change Profile Picture</a></p>
                            </div>
                                
                                
                                : 
                                <div>                                   
                                  <img className="Pic" src={this.state.profilePic} alt="Profile Pic" />
                                  <div style={{padding:'20px 0 0 0 '}}>
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
                   <p className="Heading">Usage {}</p>
                   <UsageProgress usagePercentage ={ Math.round(usagePercentage)}></UsageProgress>
               </Col>
               <Col xs={12}  className="Boxes">
                   <p className="Heading">Your Beneficiaries</p>
                   <ul className="BeneficiaryList">
                        <BeneficiaryListRow token={this.props.token} beneList={this.state.beneList} useFor="dashboard"></BeneficiaryListRow>
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
                    showHeadClose={this.state.ShowCloseButton}
                    >
                       <Form id="addProfilePic" encType="multipart/form-data" onSubmit={this.uploadProfilePicHandler}>
                       <Form.Group controlId="formForFile">
                            <Form.Control type="file" 
                                name="avatar" 
                                id="avatar"
                                onChange={e =>this.inputChangeHandler(e.target.value, e.target.files[0])}

                                />  
                          
                           </Form.Group>  
                           <Button variant="secondary" onClick={this.handleModalClose} style={{marginRight:'15px'}}>
                                Close
                            </Button>
                           <button type="submit" className="btn btn-primary">Upload</button>    
                       </Form>
                </Modal>          
           
       </Fragment>
       )
   }
}

export default Dashboard;