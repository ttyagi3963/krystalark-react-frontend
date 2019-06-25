import React , {Component, Fragment} from 'react';
import profileImage from  '../../../static/img/profile-placeholder.png';
import Modal from '../../../utilities/modal'
import './profile.css';


class Profile extends Component{
    state ={
        modalVisible:false
    }

    addPhoto=(event)=>{
        event.preventDefault();
        this.setState({modalVisible: true})
    }
    inputChangeHandler =(value, file) =>{
        this.setState({postData: file}, function(){
            console.log(this.state)
        })
    }

    uploadAvatarHandler = (event) =>{
        event.preventDefault();
        let formData = new FormData();
            formData.append('image',this.state.postData);

        fetch('http://localhost:8080/beneficiary/uploadAvatar',{
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
        })
        .catch(err =>{
            console.log(err)
        })
        
    }

    render(){
        let address="";

        if(this.props.profileData.beneficiary.address){
            address = address+ this.props.profileData.beneficiary.address.streetAddress1+", "+
            this.props.profileData.beneficiary.address.streetAddress2+" <br> "+this.props.profileData.beneficiary.address.city+", "+
            this.props.profileData.beneficiary.address.state+" <br>"+this.props.profileData.beneficiary.address.zip
        }

        return(
            <Fragment>
                <div className="leftSide col-2" >
                    <div className="thumb">
                        <img src={profileImage} alt="Profile Image"></img>
                    </div>
                    <div className = "GetImageLink TextCenter">
                        <a onClick={this.addPhoto} href="javascript://">Add Photo</a>
                    </div>
                </div>
                <div className="rightSide col-10">
                    <p><b>Name:</b> {this.props.profileData.beneficiary.name} </p>
                    <p><b>Address:</b> <span dangerouslySetInnerHTML={{__html:address}}></span> </p>
                    <p><b>Email:</b> {this.props.profileData.beneficiary.email} </p>
                    <p><b>Phone:</b> {this.props.profileData.beneficiary.phoneNumber} </p>
                    <p><b>SSN:</b> {this.props.profileData.beneficiary.ssn} </p>
                    <p><b>Relationship:</b> {this.props.profileData.beneficiary.relationship} </p>
                </div>
                <Modal 
                    modalVisible = {this.state.modalVisible } 
                    modalId="addPhoto"
                    heading="Add Profile Photo"
                    
                    >
                    <form id="addPhotoForm" encType="multipart/form-data" onSubmit={this.uploadAvatarHandler}>
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

export default Profile;