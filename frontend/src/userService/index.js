import http from '../utils/http'

const UserService = {
  signup(login, password) {
    return http('signup', 'POST', {login, password})
  },
  login(login, password) {
    console.log('login');

    return http('signin', 'POST', {login, password})
  },
  logout() {
    return http('signout', 'DELETE')
  },
  currentUser() {
    return http('currentUser', 'GET')
  }
};

export default UserService;
