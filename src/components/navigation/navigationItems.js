import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigationItems.css';


const navItems =[
    
    { id: 'login', text: 'Login', link: '/login', auth: false},
    { id: 'signup', text: 'Signup', link: '/signup', auth: false },
    { id: 'beneficiaryList', text: 'Get Beneficiary List', link: '/getBeneficiaryList', auth: true }
]
const navigation = (props) =>[
   
    
       
                    ...navItems.filter(item => item.auth === props.isAuth).map(item => (
                            <li key={ item.id}>
                                <NavLink to ={item.link} exact>
                                    {item.text}
                                    </NavLink>
                            </li>
                    )),
                    props.isAuth && (
                        <li className="navigation-item" key="logout">
                            <button onClick={props.onLogout}>Logout</button>
                        </li>
                    )
       

 
    ]

export default navigation;