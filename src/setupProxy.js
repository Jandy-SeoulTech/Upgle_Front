const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/posts',
    createProxyMiddleware({
      target: 'http://localhost:4002',
      changeOrigin: true,
    }),
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.64.247.1:8080',
      changeOrigin: true,
    }),
  );
};
