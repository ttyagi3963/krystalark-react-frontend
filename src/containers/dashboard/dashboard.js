import React , {Component} from 'react';
import {Route} from 'react-router-dom';

import './dashboard.css';


class Dashboard extends Component{
   state = {

   }

   render(){
       console.log(this.props)
       return(
       <div>
           this is the dashboard
           
       </div>
       )
   }
}

export default Dashboard;