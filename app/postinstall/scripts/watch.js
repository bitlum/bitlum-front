const fs = require('fs-extra');
const paths = require('../config/paths');

function copyPublicFolder() {
  fs.copySync(paths.appPublic, '/opt/app/dist', {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

copyPublicFolder();

module.exports = () => require('../config/webpack.config')('development');
