import React, {Fragment} from 'react';
// import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
// import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom';

import './App.css';
import MainNavigation from './components/layout/MainNavigation';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import UpdateProfile from './components/pages/UpdateProfile';
import ResetPassword from './components/pages/ResetPassword';
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from './store/themeSlice'


function App() {
  const dispatch = useDispatch()
  let isLoggedin = localStorage.getItem('token')
  // const isPremium = useSelector(state => state.theme.isActivated)
  const bgColor = useSelector(state => state.theme.bgColor)
  return (
    <Fragment>
      <div className={bgColor ? 'dark' : ''}>
      <MainNavigation/>
      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>
    {isLoggedin === null &&  <Route path='/signup'>
          <SignUp />
      </Route> }
       <Route path='/home'>
       <Home />
       </Route>
       <Route path='/login'>
       <Login />
       </Route>
       <Route path='/updateProfile'>
       <UpdateProfile />
       </Route>
       <Route path='/resetPass'>
       <ResetPassword />
       </Route>
       </Switch>
       </div>
    </Fragment>
   
  );
}

export default App;
