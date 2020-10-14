import React from 'react'
import styles from './index.module.css'
import Button from '../Button'
import UserService from "../../userService";
import {currentUserAction, logoutAction} from "../../actions/user";
import {connect} from "react-redux";

function MainPage({history, logout}) {
  function onChangeUser(event) {
    event.preventDefault();

    logout()
  }

  return (
    <>
      <div className="main-page__content"></div>
      <Button onClick={onChangeUser}>Сменить пользователя</Button>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (...args) => dispatch(logoutAction(...args))
  }
};

export default connect(null, mapDispatchToProps)(MainPage);
