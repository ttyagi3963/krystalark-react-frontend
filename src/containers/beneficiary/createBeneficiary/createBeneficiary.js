import React , { Component} from 'react';
import { Field, formInputData, formValidation } from 'reactjs-input-validator';

class Createbeneficiary extends Component{  

    submitHandler = (event) =>{

    }

   render(){
       return(
           <div className="CreateBeneficiary">
               <form className="" name ="create-beneficiary" method = "POST" onSubmit={this.submitHandler}>
               <div className="form-group">
                        <Field
                            name = "name"
                            id = "name"
                            type="name"
                            label="Full name of Beneficiary"
                           
                            onChange = {this.handleChange}
                            value = {this.state.data.email}
                            shouldValidateInputs = {this.state.shouldValidateInputs}
                            required
                            requiredErrMsg = "Email is required."
                            validator="isEmail"
                            validatorErrMsg ="Please enter a valid email"
                        />

                   </div>
               </form>
           </div>
       )
   } 
}