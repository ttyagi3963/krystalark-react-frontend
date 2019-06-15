import React, {Component} from 'react';
import {Field, formInputData, formValidation} from 'reactjs-input-validator';
import './signup.css';


class SignupForm extends Component{
    state = {
        data:{}
    }

    setAutoLogout = milliseconds => {
        setTimeout(() => {
          this.logoutHandler();
        }, milliseconds);
      };
    
      logoutHandler = () => {
        this.setState({ isAuth: false, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
      };

    handleChange = (event, inputValue, inputName, validationState, isRequired) =>{

        const value = (event && event.target.value)  || inputValue;
        const {data} =  this.state;
        data[inputName] = { value, validation:validationState, isRequired }
        this.setState({
            data,
          });
   };

   onSubmitHandler = (event) =>{
      
    event.preventDefault();
    // tells you if the entire form validation is true or false
    const isFormValid = formValidation(this.state.data);

    if(isFormValid){
        fetch('http://localhost:8080/auth/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInputData(this.state.data))
        })
        .then(res => {               
              if (res.status !== 200 && res.status !== 201) {
                console.log('Error!');
                this.setState({error: "Unable to create a new account"})
                throw new Error('Unable to create a new account');
              }
              return res.json();
           
        })
        .then(resData => {
            console.log(resData)
            this.setState({
                isAuth: true,
                token: resData.token,
                authLoading: false,
                userId: resData.userId
              });
              localStorage.setItem('token', resData.token);
              localStorage.setItem('userId', resData.userId);
              const remainingMilliseconds = 60 * 60 * 1000;
              const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
              );
              localStorage.setItem('expiryDate', expiryDate.toISOString());
              this.setAutoLogout(remainingMilliseconds);
              this.props.history.replace('/');

        })
        .catch(err => {
            console.log(err)
        })

            
    }
    else{
        this.setState({shouldValidateInputs: !isFormValid})
    }
}


   render(){
       return(
           <div>
               <div className="Error">{this.state.error}</div>
               <form action = "/auth/signup" method="POST" onSubmit={this.onSubmitHandler} noValidate>
               <div className="form-group">
                       <Field
                            name="name"
                            id = "name"
                            label = "Full name"
                            type = "text"
                            placeholder = "Full name"
                            onChange = {this.handleChange}
                            value = {this.state.data.name}
                            shouldValidateInputs = {this.state.shouldValidateInputs}
                            required
                            requiredErrMsg = "Full name is required"
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
                            shouldValidateInputs = {this.state.shouldValidateInputs}
                            required
                            requiredErrMsg = "Email is required."
                            validator="isEmail"
                            validatorErrMsg ="Please enter a valid email"
                        />
                   </div>
                   <div className="form-group">
                        <Field
                                    name = "password"
                                    id = "password"
                                    type="password"
                                    label="Password"                          
                                    onChange = {this.handleChange}
                                    value = {this.state.data.password}
                                    shouldValidateInputs = {this.state.shouldValidateInputs}
                                    required
                                    requiredErrMsg = "Password is required."
                                    minLength ={8}
                                    minLengthErrMsg = "Min of 8 characters required"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Continue for Free</button>
               </form>
           </div>
       )
   }
}

export default SignupForm;