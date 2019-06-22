import React, { Component } from 'react';

class BeneficiaryInfo extends Component{
    state = {}

    componentWillMount(){
        const bId = this.props.match.params.bId
        fetch('http://localhost:8080/getBeneficiaryInfo/'+bId , {
            headers:{
                authorization: ' Bearer '+this.props.token
            }
        })
        .then(result => {
            return result.json();
        })
        .then(resData => {
            console.log(resData)
        })
        .catch( err => {
            console.log("error = ", err)
        })

    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default BeneficiaryInfo;