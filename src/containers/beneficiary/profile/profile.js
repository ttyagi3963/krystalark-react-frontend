import React , {Component, Fragment} from 'react';
import profileImage from  '../../../static/img/profile-placeholder.png';
import Modal from '../../../utilities/modal'
import './profile.css';


class Profile extends Component{
    
    state ={
        modalVisible:false,
        profilePic: this.props.profileData.beneficiary.picture ? "http://localhost:8080/"+(this.props.profileData.beneficiary.picture).replace(/\//g, '/') : profileImage
    }
    

    addPhoto=(event)=>{
        event.preventDefault();
        this.setState({modalVisible: true})
    }
    inputChangeHandler =(value, file) =>{
        this.setState({postData: file}, function(){
            console.log(this.state.postData.size)
        })
    }

    uploadAvatarHandler = (event) =>{
        event.preventDefault();
        let formData = new FormData();
            formData.append('image',this.state.postData);
            formData.append('bid',document.getElementById('bid').value)

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
            const pic = "http://localhost:8080/"+(resData.beneficiary.picture).replace(/\/\//g, '/')
            this.setState({profilePic: pic, pic:pic})
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
        
        let photoAction = "Add Photo"
       
        if(this.props.profileData.beneficiary.picture){
            photoAction ="Change Photo"
        }

        return(
            <Fragment>
                <div className="leftSide col-2" >
                    <div className="thumb">
                        <img src={this.state.profilePic} alt="Profile Image" width="150px"></img>
                    </div>
                    <div className = "GetImageLink TextCenter">
                        <a onClick={this.addPhoto} href="javascript://">{photoAction}</a>
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
                        <input type="hidden" name="bid" id="bid" value={this.props.profileData.beneficiary._id} ></input>
                     <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </Modal>
            </Fragment>
        )
    }
    
    
}

export default Profile;