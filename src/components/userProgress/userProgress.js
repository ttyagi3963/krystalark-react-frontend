import React ,{Fragment} from 'react';
import {Progress} from 'antd';
import './userProgress.css'

const userProgress =(props)=>{
    return (
        <Fragment>
            <h5>You are using {props.usagePercentage}% of your 5MB</h5>
            <Progress strokeWidth={20}  percent={props.usagePercentage} status="active" />
            <p>You are in the <b> Free Tier</b></p>
            <p> Upgrade to <b> 1 GB</b> for just <b>$3.99</b></p>
        </Fragment>
        
    )

}

export default userProgress