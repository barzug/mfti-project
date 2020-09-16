const USERS = {};

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
  const signUpPageElement = document.getElementsByClassName('signup-page')[0];
  const formElement = document.getElementsByClassName('signup-form')[0];
  const mainPageElement = document.getElementsByClassName('main-page')[0];

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

    if (USERS[email]) {
      emailElement.classList.add('error');
      errorText.textContent = 'Такой пользователь уже существует';

      return
    }

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


    USERS[email] = {
      password
    };

    signUpPageElement.hidden = true;
    mainPageElement.hidden = false;

    mainPageElement.getElementsByClassName('main-page__content')[0].textContent = JSON.stringify(USERS);
  });

  formElement.elements['email'].addEventListener('input', () => {
    removeAllErrors();
  });

  mainPageElement.getElementsByClassName('main-page__back')[0].addEventListener('click', () => {
    signUpPageElement.hidden = false;
    mainPageElement.hidden = true;
  })
}

initSignUpForm();

