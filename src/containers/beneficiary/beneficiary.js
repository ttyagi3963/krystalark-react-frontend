import React, { Component } from 'react';
import './beneficiary.css';
import {Link} from 'react-router-dom'

const beneficiary = (props) =>{
  
       
        return( 
            Object.keys(props.beneficiary).map(item =>(
            <li key={item}>
                <Link to={"/getBeneficiaryInfo/"+props.beneficiary[item]._id}>{props.beneficiary[item].name}</Link>
            </li>
        )))
       
        
      
    }


export default beneficiary;