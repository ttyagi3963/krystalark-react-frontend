import React , { Component, Fragment} from 'react';
import Beneficiary from './beneficiary';
import './beneficiaryList.css'

class BeneficiaryList extends Component {
    state = {
        beneList:[]
    };

    componentWillMount(){
        fetch('http://localhost:8080/getBeneficiaryList',{
            method:'GET',
            headers:{
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then( result =>{
            if(result.status !==  200 && result.status !== 201){
                throw new Error('Could not get list')
            }
            return result.json();
        })
        .then(resData => {
            
            this.setState({beneList: resData.userData.beneficiarys, userData: resData.userData},function(){
              
            })
           
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render(){
       
        return(
            <Fragment>
                 <Beneficiary beneficiary={this.state.beneList}></Beneficiary> 
            </Fragment>
            
           
        )
    }

}

export default BeneficiaryList;