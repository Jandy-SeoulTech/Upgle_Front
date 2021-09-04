const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.64.247.1:4000',
      changeOrigin: true,
    }),
  );
};
