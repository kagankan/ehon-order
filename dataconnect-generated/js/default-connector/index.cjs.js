const { getDataConnect, queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'ehon-order-connect',
  location: 'asia-northeast1'
};
exports.connectorConfig = connectorConfig;

function listBooksRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'ListBooks');
}
exports.listBooksRef = listBooksRef;
exports.listBooks = function listBooks(dc) {
  return executeQuery(listBooksRef(dc));
};

