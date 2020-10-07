import React from 'react'
import styles from './index.module.css'
import Button from '../Button'
import UserService from "../../userService";

export default function MainPage({history}) {
  function onChangeUser(event) {
    event.preventDefault();

    UserService.logout().then(() => {
      history.push('signup')
    })

  }

  return (
    <>
      <div className="main-page__content"></div>
      <Button onClick={onChangeUser}>Сменить пользователя</Button>
    </>
  )
}
