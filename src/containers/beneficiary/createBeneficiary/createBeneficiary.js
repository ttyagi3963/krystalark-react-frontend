import React , { Component} from 'react';
import { Field, formInputData, formValidation } from 'reactjs-input-validator';
import $ from 'jquery';
import axios from 'axios'
window.jQuery = window.$ = $;

class Createbeneficiary extends Component{  

    state = {
        data:{}
    }
    
    handleChange = (event, inputValue, inputName, validationState, isRequired) =>{

        const value = (event && event.target.value)  || inputValue;
        const {data} =  this.state;
        data[inputName] = { value, validation:validationState, isRequired }
        this.setState({
            data,
          });
    

   };
    submitHandler = (event) =>{
        event.preventDefault();
        
        fetch('http://localhost:8080/addBeneficiary',{
            method:'POST',
            headers:{
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInputData(this.state.data))

        })
        .then(result => {
             return result.json();
        })
        .then(resData =>{
            console.log(resData)
            this.props.history.replace("/dashboard")
        })
        .catch(err => {
            console.log(err)
        })
    }

   render(){
       return(
           <div className="CreateBeneficiary">
               <form className="" name ="create-beneficiary" id ="create-beneficiary" method = "POST" onSubmit={this.submitHandler}>
               <div className="form-group">
                        <Field
                            name = "name"
                            id = "name"
                            type="text"
                            label="Full name of Beneficiary"                           
                            onChange = {this.handleChange}
                            value = {this.state.data.name}
                            shouldValidateInputs = {this.state.shouldValidateInputs}
                            required
                            requiredErrMsg = "Name is required"
                        />

                   </div>
                   <div className="form-group">
                        <Field
                            name = "email"
                            id = "email"
                            type="email"
                            label="Email Address"
                            placeholder = "Email Address"
                            onChange = {this.handleChange}
                            value = {this.state.data.email}
                            
                        />

                   </div>
                   <div className="form-group">
                        <label htmlFor="relation">Relationship</label>
                        <select name="relation" id="relation">
                            <option value=""> Select ...</option>
                            <option value="brother">Brother</option>
                            <option value="sister">Sister</option>
                            <option value="mother">Mother</option>
                            <option value="father">Father</option>
                            <option value="son">Son</option>
                            <option value="daughter">daughter</option>
                        </select>

                   </div>
                   <div className="form-group">
                   <Field
                            name = "ssn"
                            id = "ssn"
                            type="tel"
                            label="Social Security Number"
                            placeholder = ""
                            onChange = {this.handleChange}
                            value = {this.state.data.ssn}
                           
                           
                        />
                   </div>
                   <div className="form-group">
                   <Field
                            name = "phoneNumber"
                            id = "phoneNumber"
                            type="tel"
                            label="Phone Number"
                            placeholder = ""
                            onChange = {this.handleChange}
                            value = {this.state.data.phoneNumber}
                           
                           
                        />


                   </div>
                   <div className="form-group">
                   <Field
                            name = "streetAddress1"
                            id = "streetAddress1"
                            type="text"
                            label="Address"
                            placeholder = "Street address"
                            onChange = {this.handleChange}
                            value = {this.state.data.streetAddress1}
                           
                           
                        />
                        <Field
                            name = "streetAddress2"
                            id = "streetAddress2"
                            type="text"                           
                            placeholder = "Apt, suite #"
                            onChange = {this.handleChange}
                            value = {this.state.data.streetAddress2}
                           
                           
                        />
                        <Field
                            name = "city"
                            id = "city"
                            type="text"                            
                            placeholder = "Enter City"
                            onChange = {this.handleChange}
                            value = {this.state.data.city}
                           
                        />
                        <Field
                            name = "state"
                            id = "state"
                            type="text"                           
                            placeholder = "Enter State"
                            onChange = {this.handleChange}
                            value = {this.state.data.state}
                           
                           
                        />
                        <Field
                            name = "country"
                            id = "country"
                            type="text"
                           
                            placeholder = "Country"
                            onChange = {this.handleChange}
                            value = {this.state.data.country}
                           
                           
                        />
                        <Field
                            name = "zip"
                            id = "zip"
                            type="text"
                            
                            placeholder = "zipcode"
                            onChange = {this.handleChange}
                            value = {this.state.data.zip}
                           
                           
                        />


                   </div>
                   < hr></hr>
                   <h3>Guardian :</h3>
                   <div className="form-group">
                   <Field
                            name = "coName"
                            id = "coName"
                            type="text"
                            label="Full name of Guardian"                           
                            onChange = {this.handleChange}
                            value = {this.state.data.coName}
                          
                        />

                   </div>
                   <div className="form-group">
                        <Field
                            name = "coEmail"
                            id = "coEmail"
                            type="email"
                            label="Email Address of Guardian"
                            placeholder = "Email Address"
                            onChange = {this.handleChange}
                            value = {this.state.data.coEmail}
                            
                        />

                   </div>
                   
                   
                   <div className="form-group">
                   <Field
                            name = "coPhoneNumber"
                            id = "coPhoneNumber"
                            type="tel"
                            label="Guardian's Phone Number"
                            placeholder = ""
                            onChange = {this.handleChange}
                            value = {this.state.data.coPhoneNumber}
                           
                           
                        />


                   </div>
                   <div className="form-group">
                   <Field
                            name = "coStreetAddress1"
                            id = "coStreetAddress1"
                            type="text"
                            label="Guardians Address"
                            placeholder = "Street address"
                            onChange = {this.handleChange}
                            value = {this.state.data.coStreetAddress1}
                           
                           
                        />
                        <Field
                            name = "coStreetAddress2"
                            id = "coStreetAddress2"
                            type="text"                           
                            placeholder = "Apt, suite #"
                            onChange = {this.handleChange}
                            value = {this.state.data.coStreetAddress2}
                           
                           
                        />
                        <Field
                            name = "coCity"
                            id = "coCity"
                            type="text"                            
                            placeholder = "Enter City"
                            onChange = {this.handleChange}
                            value = {this.state.data.city}
                           
                        />
                        <Field
                            name = "coState"
                            id = "coState"
                            type="text"                           
                            placeholder = "Enter State"
                            onChange = {this.handleChange}
                            value = {this.state.data.state}
                           
                           
                        />
                        <Field
                            name = "coCountry"
                            id = "coCountry"
                            type="text"
                           
                            placeholder = "Country"
                            onChange = {this.handleChange}
                            value = {this.state.data.country}
                           
                           
                        />
                        <Field
                            name = "coZip"
                            id = "coZip"
                            type="text"
                            
                            placeholder = "zipcode"
                            onChange = {this.handleChange}
                            value = {this.state.data.zip}
                           
                           
                        />

                    </div>
                   <div className = "form-group">
                       <button type="submit">Create Beneficiary</button>
                   </div>

               </form>
           </div>
       )
   } 
}

export default Createbeneficiary;