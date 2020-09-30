const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.static('src'));
app.use(body.json());
app.use(cookie());

const users = {};
const ids = {};

app.post('/signup', function (req, res) {
  const login = req.body.login;
  const password = req.body.password;
  if (
    !login || !password ||
    !login.match(/@/) ||
    !password.match(/^\S{4,}$/)
  ) {
    return res.status(400).json({ error: 'Невалидные данные пользователя' });
  }
  if (users[login]) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }

  const id = uuidv4();
  ids[id] = login;
  users[login] = { password };

  res.cookie('cookie', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  res.json({ id });
});

app.post('/signin', function (req, res) {
  const login = req.body.login;
  const password = req.body.password;

  if (!password || !login) {
    return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
  }
  if (!users[login] || users[login].password !== password) {
    return res.status(400).json({ error: 'Неверный E-Mail и/или пароль' });
  }

  const id = uuidv4();
  ids[id] = login;

  res.cookie('cookie', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  res.status(201).json({ id });
});

app.get('/currentUser', function (req, res) {
  const id = req.cookies['cookie'];
  const login = ids[id];
  if (!login || !users[login]) {
    return res.status(401).end();
  }

  res.json({ id });
});

app.delete('/signout', function (req, res) {
  res.cookie('cookie', null, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  res.status(200).json({});
});



app.listen(process.env.PORT || 8080, () => {
  console.log('Server started')
});
