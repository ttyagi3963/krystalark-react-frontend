import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigationItems.css';


const navItems =[
    
    { id: '1', text: 'Login', link: '/login', auth: false},
    { id: '2', text: 'Signup', link: '/signup', auth: false },
    { id: '3', text: 'Dashboard', link: '/dashboard', auth: true },
    { id: '4', text: 'Get Beneficiary List', link: '/getBeneficiaryList', auth: true },
    { id: '5', text: 'Create Beneficiary', link: '/createBeneficiary', auth: true },
    { id: '6', text: 'Create Message', link: '/createMessage/relationship', auth: true }
    
]
const navigation = (props) =>[
   
    
       
                    ...navItems.filter(item => item.auth === props.isAuth).map(item => (
                            <li key={ item.id} style={{display:'inline-block'}}>
                                <NavLink to ={item.link} exact key={item.id}>
                                    {item.text}
                                    </NavLink>
                            </li>
                    )),
                    props.isAuth && (
                        <li className="navigation-item" key={7} style={{display:'inline-block'}}>
                            <button onClick={props.onLogout}>Logout</button>
                        </li>
                    )
       

 
    ]

export default navigation;