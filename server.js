const next = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const jwtDecode = require('jwt-decode');
const { json, urlencoded } = require('body-parser');
const { createServer } = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const middlewares = (server) => {
  server.use(cookieParser());
  server.use(json());
  server.use(urlencoded({ extended: true }));
  server.use(compression());
};

const checkAccessToken = (accessToken) => {
  const data = jwtDecode(accessToken);
  return data.exp * 1000 > Date.now();
};

const isLogged = (req, res, next) => {
  if (req.cookies && req.cookies._jwt && checkAccessToken(req.cookies.login_jwt)) return res.redirect('/manage');
  next();
};

const checkAuthRoutes = [
  '/manage'
];
const checkAuth = (req, res, next) => {
  if (req.cookies && req.cookies.login_jwt) {
    if (checkAccessToken(req.cookies.login_jwt)) {
      const data = jwtDecode(req.cookies.login_jwt);
      req.user = {
        user_name: data.user_name,
        accessToken: req.cookies.login_jwt,
        id: data.id,
        role: data.role,
        email: data.email,
        phone_number: data.phone_number
      }
      return next();
    } else return res.redirect('/logout');
  } else {
    res.redirect('/');
  }
};

const routes = (server) => {
  server.get('/logout', (req, res) => {
    res.cookie('login_jwt', '');
    return res.redirect('/');
  });
  checkAuthRoutes.forEach((route) => server.get(route, checkAuth, handle));
  server.get('/', isLogged, handle);
	server.get('*', handle);
};

app.prepare().then(() => {
  const server = express();

  middlewares(server);
  routes(server);

  createServer(server).listen(4040, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:4040');
  });
});
