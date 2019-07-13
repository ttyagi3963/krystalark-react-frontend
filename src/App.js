import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MainNavigation from './components/navigation/mainNavigation';
import {Route, Switch, withRouter } from 'react-router-dom';
import LoginForm from './containers/login/loginForm';
import SignupForm from './containers/signup/signup';
import Dashboard from './containers/dashboard/dashboard';
import CreateBeneficiary from './containers/beneficiary/createBeneficiary/createBeneficiary';
import BeneficiaryList from './containers/beneficiary/beneficiaryList';
import BeneficiaryInfo from './containers/beneficiary/beneficiaryInfo/beneficiaryInfo';
import Relationship from './containers/messages/relationship/relationship';
import MessageType from './containers/messages/messageType/messageType';
import MessageSendWhen from './containers/messages/schedule/scheduleWhen'
import RecordVideo from './containers/messages/recordVideo/recordVideo'
import WrittenMessage from './containers/messages/writtenMessage/writtenMessage'

import './App.css';


class App extends Component{
  state = {
    isAuth: false
  }
  componentDidMount(){
    const token = localStorage.getItem('token');    
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) { 
      this.props.history.push('/login')
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();      
      return;
    }

    const userId = localStorage.getItem('userId');
    // const remainingMilliseconds =
    //   new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    // this.setAutoLogout(remainingMilliseconds);
  }


  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    this.props.history.push('/login')
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  handleMessageStates =(step, data) =>{
    switch(step){
      case 'relationship': 
              this.setState({"relationship":data}, function(){
                console.log(this.state)
              })
      break;
      case 'messageType': 
              this.setState({"messageType":data}, function(){
                console.log(this.state)
              })
      break;

      case 'messageDeliveryWhen': 
              this.setState({"messageDeliveryWhen":data}, function(){
                console.log(this.state)
              })
      break;

      case 'messageFrequency': 
        this.setState({"messageFrequency":data}, function(){
          console.log(this.state)
        })
      break;

      case 'messageFrequencyDate': 
        this.setState({"messageFrequencyDate":data}, function(){
          console.log(this.state)
        })
      break
    }
   

  }
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

             <Route 
                path="/createMessage/relationship" 
                exact
                render = { props => (<Relationship {...props} token={this.state.token} storeMessageStates={this.handleMessageStates}></Relationship>)}></Route>

              <Route 
                path="/createMessage/messageType" 
                exact
                render = { props => (<MessageType {...props} token={this.state.token} storeMessageStates={this.handleMessageStates}></MessageType>)}></Route>

              <Route 
                path="/createMessage/when" 
                exact
                render = { props => (<MessageSendWhen {...props} token={this.state.token} storeMessageStates={this.handleMessageStates}></MessageSendWhen>)}></Route>

              <Route 
                path="/message/recordvideo" 
                exact
                render = { props => (<RecordVideo {...props} token={this.state.token} storeMessageStates={this.handleMessageStates}></RecordVideo>)}></Route>

              <Route 
                path="/message/writtenMessage" 
                exact
                render = { props => (<WrittenMessage {...props} token={this.state.token} storeMessageStates={this.handleMessageStates}></WrittenMessage>)}></Route>

        </Switch>
      )
  }
  
    return(
      
        <Container>        
          <MainNavigation 
              isAuth={this.state.isAuth} 
              onLogout={this.logoutHandler}
              />

          <Row>
                       
                {routes}
           
          </Row>
          </Container>    
      
    )
  }
}


export default withRouter(App);
