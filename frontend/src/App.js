import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import SignupPage from './components/SignupPage'
import MainPage from './components/MainPage'
import styles from './App.module.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import UserService from "./userService";
import LoginPage from "./components/LoginPage";

function PrivateRoute({user, loading, ...rest}) {
  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (!user) {
    return <Redirect
      to={{
        pathname: '/signup',
      }}
    />
  }

  return (
    <Route
      {...rest}
    />
  )
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    UserService.currentUser()
      .then((user) => {
        setUser(user)
      })
      .catch((error) => {
        console.log('error', error)
      })
      .then(() => {
        setLoading(false);
      });
  }, []);


  return (
    <BrowserRouter>
      <div className={styles.page}>

        <header>Логотип</header>

        <Switch>
          <Route path="/signup" render={(props) => (<SignupPage setUser={setUser} {...props}/>)} />
          <Route path="/login" render={(props) => (<LoginPage setUser={setUser} {...props}/>)}/>
          <PrivateRoute path="*" component={MainPage} user={user} loading={loading}/>
        </Switch>

        <footer>Мой сайт 2020</footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
