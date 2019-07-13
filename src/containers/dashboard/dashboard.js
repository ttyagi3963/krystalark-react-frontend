import React , {Component, Fragment} from 'react';
import { Col, Row} from 'react-bootstrap';
import BeneficiaryList from '../beneficiary/beneficiaryList'

import './dashboard.css';


class Dashboard extends Component{
   state = {
    
   }

   componentDidMount(){}

   render(){
      
       return(
       <Fragment>
           <Col xs={12} sm={3} className="LeftSide">
            tt
           </Col>
           <Col xs={12} sm={9} className="RightSide">
               <Col xs={12} sm={3}  className="Boxes">
                   <p className="Heading">Your Beneficiarys</p>
                   <ul className="BeneficiaryList">
                        <BeneficiaryList token={this.props.token}></BeneficiaryList>
                    </ul>
               </Col>
           </Col>
           
       </Fragment>
       )
   }
}

export default Dashboard;