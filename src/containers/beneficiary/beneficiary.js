import React, { Component } from 'react';
import './beneficiary.css';

const beneficiary = (props) =>{
  
       
        return( 
            Object.keys(props.beneficiary).map(item =>(
            <li key={item}>{props.beneficiary[item].name}</li>
        )))
       
        
      
    }


export default beneficiary;