import React, {Component} from 'react';
import TopNavigation from './components/navigation/navigation';
import { Route } from 'react-router-dom';
import LoginForm from './containers/login/loginForm';
import SignupForm from './containers/signup/signup';
import './App.css';

class App extends Component{
  state = {
    isLoggedIn: false
  }
  render(){
    return(
      
        <div className="container">        
          <TopNavigation currentState={this.state}/>

          <div className="row">
            <div className="MainContent">

               {/* user clicked on login */}
               <Route path="/login" exact component = {LoginForm}/>

                {/* user clicked on signup */}
               <Route path="/signup" exact component = {SignupForm}/>

            </div>
          </div>

        </div>
      
    )
  }
}


export default App;
