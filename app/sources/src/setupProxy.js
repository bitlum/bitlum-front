/**
 * Proxy setup for creat ereact app webpack dev server
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const proxy = require('http-proxy-middleware');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

module.exports = app => {
  app.use(
    proxy('/api', {
      target: 'http://host.docker.internal:3004',
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
