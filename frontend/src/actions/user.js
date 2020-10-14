import userService from '../userService'

function fetchStart() {
  return {
    type: 'USER_FETCHING'
  }
}

function fetchFail(payload) {
  return {
    type: 'USER_FAIL',
    payload
  }
}

function fetchSuccess(payload) {
  return {
    type: 'USER_SUCCESS',
    payload
  }
}

export function currentUserAction() {
  return dispatch => {
    dispatch(fetchStart());

    return userService.currentUser().then((data) => {
      dispatch(fetchSuccess(data))
    })
      .catch((error) => {
        dispatch(fetchFail(error))
      })
  }
}

export function loginAction(login, password) {
  return dispatch => {
    dispatch(fetchStart());

    return userService.login(login, password).then((data) => {
      dispatch(fetchSuccess(data))

      console.log('0')
    })
      .catch((error) => {
        dispatch(fetchFail(error))
      })
  }
}

export function signupAction(login, password) {
  return dispatch => {
    dispatch(fetchStart());

    return userService.signup(login, password).then((data) => {
      dispatch(fetchSuccess(data))
    })
      .catch((error) => {
        dispatch(fetchFail(error))
      })
  }
}

export function logoutAction() {
  return dispatch => {
    dispatch(fetchStart());

    return userService.logout().then((data) => {
      dispatch(fetchSuccess(null))
    })
      .catch((error) => {
        dispatch(fetchFail(error))
      })
  }
}
