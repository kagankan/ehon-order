const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'ehon-order-connect',
  location: 'asia-northeast1'
};
exports.connectorConfig = connectorConfig;

