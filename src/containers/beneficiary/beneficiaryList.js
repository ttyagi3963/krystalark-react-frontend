import React , { Component, Fragment} from 'react';
import {Empty, Button} from 'antd';

import DisplayBListInRow from './beneficiaryListRowDisplay';
import DisplayBListInCol from './beneficiaryListColDisplay';


  

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
            this.props.loadBeneficiaryData(resData.userData.beneficiarys)
            // this.setState({beneList: resData.userData.beneficiarys, userData: resData.userData},function(){
            //   console.log(this.state.beneList.length)
            // })
           
        })
        .catch(err =>{
            console.log(err)
        })
    }

    customizeRenderEmpty = () => (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
            height: 60,
            }}
            description={
            <span className="NullText">
                You have not added any <b>Beneficiaries!</b>
            </span>
            }
        >
            <Button type="primary" onClick={this.handleCreateBeneficiary}>Create a Beneficiary</Button>
            <div className="Subtext">(You can schedule a message for them later)</div>
      </Empty>
      );

    handleCreateBeneficiary=(props)=>{
        window.location.href="/createBeneficiary"
    }
    

    render(){
       
        return(
            <Fragment>
                     {/* {this.props.useFor ==='dashboard'?             
                           <DisplayBListInRow renderEmpty={this.customizeRenderEmpty} beneList={this.state.beneList}></DisplayBListInRow>
                           :
                           <DisplayBListInCol  renderEmpty={this.customizeRenderEmpty} beneList={this.state.beneList}></DisplayBListInCol>
                          
                 } */}
            </Fragment>
           
        
        )
    }

}

export default BeneficiaryList;