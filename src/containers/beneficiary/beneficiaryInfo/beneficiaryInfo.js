import React, { Component, Fragment } from 'react';
import Profile from '../profile/profile';

class BeneficiaryInfo extends Component{
    _isMounted = false;

    state = {
        
    }
    componentDidMount() {
        this._isMounted = true;
        const bId = this.props.match.params.bId
        fetch('http://localhost:8080/beneficiary/'+bId , {
            headers:{
                authorization: ' Bearer '+this.props.token
            }
        })
        .then(result => {
            return result.json();
        })
        .then(resData => {
           
            if(this._isMounted){
               console.log(resData)
                this.setState({profileData:resData})
            }
           
        })
        .catch( err => {
            console.log("error = ", err)
        })

    }

    
    componentWillUnmount() {
        this._isMounted = false;
        
      }

    render(){
        let profile= null;
        
        return(
           <div className="row UserProfile">
               {
                   this.state && this.state.profileData?
                   <Profile  profileData = {this.state.profileData} token={this.props.token}></Profile>:''
               }
              
           </div>
            
        )
    }
}

export default BeneficiaryInfo;