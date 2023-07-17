/* eslint-disable global-require */
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((_req, _res, next) => {
  setTimeout(() => {
    next();
  }, 3000);
});

server.post('/api/auth', (req, res) => {
  if (req.body.phone === '79999999999') {
    res.json({
      success: true,
    });
  } else if (req.body.phone === '78888888888') {
    res.status(400).json({
      success: false,
      errorText: 'Номер указан неправильно',
    });
  } else {
    res.status(404).json({
      success: false,
      errorText: 'Пользователь не найден',
    });
  }
});

// API
server.get('/api/*', (req, res) => {
  // res.status(500).jsonp(ERROR(500));
  const data = require(`./data/${req.url.replace('/api/', '').replace(/\?.*/g, '')}.json`);
  res.json(data);
});

server.use(router);
server.listen(1234, () => {
  // eslint-disable-next-line no-console
  console.info('JSON Server is running on port 1234');
});
