import React from 'react'
import styles from './index.module.css'
import Input from '../Input'
import Button from '../Button'

import UserService from '../../userService'

function isCorrectEmail(email) {
  return email.length >= 5
}

function isCorrectPassword(email) {
  return email.length >= 5
}

export default class SignupPage extends React.Component{
  state = {
    email: '',
    password: '',
    repeatPassword: '',
    emailError: false,
    passwordError: false,
    repeatPasswordError: false,
    errorText: ''
  };

  render() {
    const {
      email,
      password,
      repeatPassword,
      errorText,
      emailError,
      passwordError,
      repeatPasswordError,
    } = this.state;

    return (
      <form className={styles.wrapper}>
        <h2>Добро пожаловать</h2>
        <div className={styles.inputs}>
          <Input name="email" type="email" placeholder="Логин" onChange={this.onChangeEmail} value={email} error={emailError}/>
          <Input name="password" type="password" placeholder="Пароль" onChange={this.onChangePassword} value={password} error={passwordError}/>
          <Input name="repeatPassword" type="password" placeholder="Повторите пароль" onChange={this.onChangeRepeatPassword} value={repeatPassword} error={repeatPasswordError}/>
        </div>
        <div className={styles.buttons}>
          <Button primary onClick={this.onSignUp}>Регистрация</Button>
          <Button onClick={this.onToLogin}>Уже зареган</Button>
        </div>
        <p className={styles.error}>{errorText}</p>
      </form>
    )
  }

  onSignUp = (event) => {
    event.preventDefault();

    const {
      email,
      password,
      repeatPassword,
    } = this.state;

    if (!isCorrectEmail(email)) {
      this.setState({
        emailError: true,
        errorText: 'Логин должен быть длиннее 5 символов'
      });

      return
    }

    if (!isCorrectPassword(password)) {
      this.setState({
        passwordError: true,
        errorText: 'Пароль должен быть длиннее 5 символов'
      });

      return
    }

    if (password !== repeatPassword) {
      this.setState({
        passwordError: true,
        repeatPasswordError: true,
        errorText: 'Пароли не совпадают'
      });

      return
    }


    UserService.signup(email, password)
      .then((user) => {
        this.props.setUser(user);


        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({errorText: error.error})
      })

  };

  onChangeEmail = (event) => {
    this.resetAllErrors();
    this.setState({email: event.target.value})
  };

  onChangePassword = (event) => {
    this.resetAllErrors();
    this.setState({password:  event.target.value})
  };

  onChangeRepeatPassword = (event) => {
    this.resetAllErrors();
    this.setState({repeatPassword:  event.target.value})
  };

  resetAllErrors = (event) => {
    this.setState({
      emailError: false,
      passwordError: false,
      repeatPasswordError: false,
      errorText: ''
    })
  };

  onToLogin = (event) => {
    event.preventDefault();

    this.props.history.push('/login');
  }
}
