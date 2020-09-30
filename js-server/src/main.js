const signUpPageElement = document.getElementsByClassName('signup-page')[0];
const loginPageElement = document.getElementsByClassName('login-page')[0];
const mainPageElement = document.getElementsByClassName('main-page')[0];
const loadingPageElement = document.getElementsByClassName('loading-page')[0];


function isCorrectEmail(email) {
  return email.length >= 5
}

function isCorrectPassword(email) {
  return email.length >= 5
}

function removeAllErrors() {
  const formElement = document.getElementsByClassName('signup-form')[0];

  const errorText = document.getElementsByClassName('signup-form__error')[0];
  errorText.textContent = '';

  const emailElement = formElement.elements['email'];
  emailElement.classList.remove('error');

  const passwordElement = formElement.elements['password'];
  passwordElement.classList.remove('error');

  const repeatPasswordElement = formElement.elements['repeatPassword'];
  repeatPasswordElement.classList.remove('error');
}

function initSignUpForm() {
  const formElement = document.getElementsByClassName('signup-form')[0];

  const errorText = document.getElementsByClassName('signup-form__error')[0];

  formElement.addEventListener('submit', (event) => {
    removeAllErrors();

    event.preventDefault();

    const emailElement = formElement.elements['email'];
    const email = emailElement.value.trim();
    const passwordElement = formElement.elements['password'];
    const password = passwordElement.value.trim();
    const repeatPasswordElement = formElement.elements['repeatPassword'];
    const repeatPassword = repeatPasswordElement.value.trim();

    if (!isCorrectEmail(email)) {
      emailElement.classList.add('error');
      errorText.textContent = 'Логин должен быть длиннее 5 символов';

      return
    }

    // if (USERS[email]) {
    //   emailElement.classList.add('error');
    //   errorText.textContent = 'Такой пользователь уже существует';
    //
    //   return
    // }

    if (!isCorrectPassword(password)) {
      passwordElement.classList.add('error');
      errorText.textContent = 'Пароль должен быть длиннее 5 символов';

      return
    }

    if (password !== repeatPassword) {
      passwordElement.classList.add('error');
      repeatPasswordElement.classList.add('error');
      errorText.textContent = 'Пароли не совпадают';

      return
    }

    signUpPageElement.hidden = true;
    loadingPageElement.hidden = false;

    UserService.signup(email, password)
      .then((result) => {
        loadingPageElement.hidden = true;
        mainPageElement.hidden = false;

        mainPageElement.getElementsByClassName('main-page__content')[0].textContent = JSON.stringify(result);
      })
      .catch((error) => {
        loadingPageElement.hidden = true;
        signUpPageElement.hidden = false;

        errorText.textContent = error.error;
      });
  });

  formElement.elements['email'].addEventListener('input', () => {
    removeAllErrors();
  });

  formElement.getElementsByClassName('signup-form__to-login')[0].addEventListener('click', () => {
    event.preventDefault();

    signUpPageElement.hidden = true;
    loginPageElement.hidden = false;
  })
}

function initLoginForm() {
  const formElement = document.getElementsByClassName('login-form')[0];

  const errorText = document.getElementsByClassName('login-form__error')[0];

  formElement.addEventListener('submit', (event) => {
    errorText.textContent = '';

    event.preventDefault();

    const emailElement = formElement.elements['email'];
    const email = emailElement.value.trim();
    const passwordElement = formElement.elements['password'];
    const password = passwordElement.value.trim();

    loginPageElement.hidden = true;
    loadingPageElement.hidden = false;

    UserService.login(email, password)
      .then((result) => {
        loadingPageElement.hidden = true;
        mainPageElement.hidden = false;

        mainPageElement.getElementsByClassName('main-page__content')[0].textContent = JSON.stringify(result);
      })
      .catch((error) => {
        loadingPageElement.hidden = true;
        loginPageElement.hidden = false;

        errorText.textContent = error.error;
      });
  });

  formElement.elements['email'].addEventListener('input', () => {
    errorText.textContent = '';
  });

  formElement.getElementsByClassName('login-form__to-signup')[0].addEventListener('click', () => {
    event.preventDefault();

    signUpPageElement.hidden = false;
    loginPageElement.hidden = true;
  })
}

function initApplication() {
  UserService.currentUser()
    .then((result) => {
      loadingPageElement.hidden = true;
      mainPageElement.hidden = false;

      mainPageElement.getElementsByClassName('main-page__content')[0].textContent = JSON.stringify(result);
    })
    .catch((error) => {
      signUpPageElement.hidden = false;
      loadingPageElement.hidden = true;
    });
}

function initMainPage() {
  mainPageElement.getElementsByClassName('main-page__unlogin')[0].addEventListener('click', () => {
    UserService.logout()
      .then(() => {
        signUpPageElement.hidden = false;
        mainPageElement.hidden = true;
      }).catch((error) => {
        console.log('logout error > ', error)
    })
  })
}

initApplication();
initSignUpForm();
initLoginForm();
initMainPage();
