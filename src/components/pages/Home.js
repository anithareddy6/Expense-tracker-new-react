import React, {Fragment} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import AddExpense from './AddExpense';

import './Home.css'
const Home = () => {
    const history = useHistory();
   
    return (
        <Fragment>
        <div className='home-container'>
            <div>Welcome To Expense Tracker</div>
            {/* <div>You Profile Is incomplete. <NavLink to='./updateProfile'>Complete Now</NavLink></div> */}
        </div>
        <AddExpense/>
        </Fragment>
    )
}
export default Home;