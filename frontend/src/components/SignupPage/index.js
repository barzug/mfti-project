import React from 'react'
import styles from './index.module.css'
import Input from '../Input'
import Button from '../Button'

export default class SignupPage extends React.Component{
  state = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  render() {
    const {
      email,
      password,
      repeatPassword,
    } = this.state;

    return (
      <form className={styles.wrapper}>
        <h2>Добро пожаловать</h2>
        <div className={styles.inputs}>
          <Input name="email" type="email" placeholder="Логин" onChange={this.onChangeEmail} value={email}/>
          <Input name="password" type="password" placeholder="Пароль" onChange={this.onChangePassword} value={password}/>
          <Input name="repeatPassword" type="password" placeholder="Повторите пароль" onChange={this.onChangeRepeatPassword} value={repeatPassword}/>
        </div>
        <div className={styles.buttons}>
          <Button primary onClick={this.onSignUp}>Регистрация</Button>
          <Button>Уже зареган</Button>
        </div>
        <p className={styles.error}></p>
      </form>
    )
  }

  onSignUp = (event) => {
    event.preventDefault();


    this.props.history.push('/');

    console.log('email', this.state.email);
    console.log('password', this.state.password);
  };

  onChangeEmail = (event) => {
    this.setState({email: event.target.value})
  };

  onChangePassword = (event) => {
    this.setState({password:  event.target.value})
  };

  onChangeRepeatPassword = (event) => {
    this.setState({repeatPassword:  event.target.value})
  }
}
