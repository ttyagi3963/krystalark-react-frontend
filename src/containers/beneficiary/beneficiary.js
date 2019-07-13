import React, { Component ,Fragment } from 'react';
import './beneficiary.css';
import {Link} from 'react-router-dom'
import {Avatar} from 'antd'
const beneficiary = (props) =>{
  
       
        return( 
          
            
                Object.keys(props.beneficiary).map(item =>(
                <li key={item}>
                    <Link to={"/beneficiary/"+props.beneficiary[item]._id}>
                        <Avatar style={{ backgroundColor: '#87d068' , marginRight:'10px', paddingBottom:'15px' }} icon="user" />
                         {props.beneficiary[item].name}
                    </Link>
                </li>
                ))
            
            )
        
       
        
      
    }


export default beneficiary;