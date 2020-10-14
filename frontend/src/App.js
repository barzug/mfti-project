import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import SignupPage from './components/SignupPage'
import MainPage from './components/MainPage'
import PrivateRoute from './components/PrivateRoute'
import styles from './App.module.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import UserService from "./userService";
import LoginPage from "./components/LoginPage";
import {connect, Provider} from 'react-redux'
import {currentUserAction} from './actions/user'

function App({fetchUser}) {
  useEffect(() => {
    fetchUser()
  }, []);


  return (
    <BrowserRouter>
      <div className={styles.page}>

        <header>Логотип</header>

        <Switch>
          <Route path="/signup" render={(props) => (<SignupPage {...props}/>)} />
          <Route path="/login" render={(props) => (<LoginPage {...props}/>)}/>
          <PrivateRoute path="*" component={MainPage}/>
        </Switch>

        <footer>Мой сайт 2020</footer>

      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(currentUserAction())
  }
};

const WrappedApp = connect(null, mapDispatchToProps)(App);

export default WrappedApp;
