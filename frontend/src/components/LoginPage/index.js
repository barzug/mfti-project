import React, {useState} from 'react'
import styles from './index.module.css'
import Input from '../Input'
import Button from '../Button'

import UserService from '../../userService'

export default function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');


  function onChangeEmail(event) {
    setErrorText('');
    setEmail(event.target.value)
  }

  function onChangePassword(event) {
    setErrorText('');
    setPassword(event.target.value)
  }

  function onLogin(event) {
    event.preventDefault();

    UserService.login(email, password)
      .then((user) => {
        props.setUser(user);

        props.history.push('/');
      })
      .catch((error) => {
        setErrorText(error.error)
      })
  }

  function onToSignUp(event) {
    event.preventDefault();

    props.history.push('/signup');
  }

  return (
    <form className={styles.wrapper}>
      <h2>Добро пожаловать</h2>
      <div className={styles.inputs}>
        <Input name="email" type="email" placeholder="Логин" onChange={onChangeEmail} value={email}/>
        <Input name="password" type="password" placeholder="Пароль" onChange={onChangePassword} value={password}/>
      </div>
      <div className={styles.buttons}>
        <Button primary onClick={onLogin}>Войти</Button>
        <Button onClick={onToSignUp}>Нет аккаунта</Button>
      </div>
      <p className={styles.error}>{errorText}</p>
    </form>
  )
}
