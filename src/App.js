import React, {Component} from 'react';
import MainNavigation from './components/navigation/mainNavigation';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import LoginForm from './containers/login/loginForm';
import SignupForm from './containers/signup/signup';
import Dashboard from './containers/dashboard/dashboard';
import CreateBeneficiary from './containers/beneficiary/createBeneficiary/createBeneficiary';
import BeneficiaryList from './containers/beneficiary/beneficiaryList';
import BeneficiaryInfo from './containers/beneficiary/beneficiaryInfo/beneficiaryInfo';

import './App.css';

class App extends Component{
  state = {
    isAuth: false
  }
  componentDidMount(){
    const token = localStorage.getItem('token');    
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) { 
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();      
      return;
    }

    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    // this.setAutoLogout(remainingMilliseconds);
  }


  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };


  render(){
    
    let routes = (
      <Switch>
          {/* user clicked on login */}
          <Route path="/login" exact component = {LoginForm}/>

          {/* user clicked on signup */}
          <Route path="/signup" exact component = {SignupForm}/>

        
      </Switch>
    )
  if (this.state.isAuth){
      routes =(
        <Switch>
            <Route 
            path="/dashboard" 
            exact
            render = {props =>(
                    <Dashboard {...props} token={this.state.token} userId={this.state.userId}></Dashboard>
            )} 
            
            />
            <Route 
                path="/getBeneficiaryList" 
                exact 
                render = { props => (<BeneficiaryList token={this.state.token}></BeneficiaryList>)}>
             </Route>

             <Route 
                path="/createBeneficiary" 
                exact 
                render = { props => (<CreateBeneficiary token={this.state.token}></CreateBeneficiary>)}>
             </Route>
             <Route 
                path="/beneficiary/:bId" 
                exact
                render = { props => (<BeneficiaryInfo {...props} token={this.state.token}></BeneficiaryInfo>)}>
             </Route>
        </Switch>
      )
  }
  
    return(
      
        <div className="container">        
          <MainNavigation 
              isAuth={this.state.isAuth} 
              onLogout={this.logoutHandler}
              />

          <div className="row">
            <div className="MainContent">              
                {routes}
            </div>
          </div>

        </div>
      
    )
  }
}


export default withRouter(App);
