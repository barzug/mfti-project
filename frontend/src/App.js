import React from 'react';
import logo from './logo.svg';
import SignupPage from './components/SignupPage'
import MainPage from './components/MainPage'
import styles from './App.module.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.page}>

        <header>Логотип</header>

        <Switch>
          <Route path="/signup" component={SignupPage}/>
          <Route path="*" component={MainPage}/>
        </Switch>

        <footer>Мой сайт 2020</footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
