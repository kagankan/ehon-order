const { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'ehon-order-connect',
  location: 'asia-northeast1'
};
exports.connectorConfig = connectorConfig;

function createBookRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateBook', inputVars);
}
exports.createBookRef = createBookRef;
exports.createBook = function createBook(dcOrVars, vars) {
  return executeMutation(createBookRef(dcOrVars, vars));
};

function updateBookRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateBook', inputVars);
}
exports.updateBookRef = updateBookRef;
exports.updateBook = function updateBook(dcOrVars, vars) {
  return executeMutation(updateBookRef(dcOrVars, vars));
};

function deleteBookRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteBook', inputVars);
}
exports.deleteBookRef = deleteBookRef;
exports.deleteBook = function deleteBook(dcOrVars, vars) {
  return executeMutation(deleteBookRef(dcOrVars, vars));
};

function createStockLogRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateStockLog', inputVars);
}
exports.createStockLogRef = createStockLogRef;
exports.createStockLog = function createStockLog(dcOrVars, vars) {
  return executeMutation(createStockLogRef(dcOrVars, vars));
};

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

function getBookByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetBookById', inputVars);
}
exports.getBookByIdRef = getBookByIdRef;
exports.getBookById = function getBookById(dcOrVars, vars) {
  return executeQuery(getBookByIdRef(dcOrVars, vars));
};

function listStockLogsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'ListStockLogs');
}
exports.listStockLogsRef = listStockLogsRef;
exports.listStockLogs = function listStockLogs(dc) {
  return executeQuery(listStockLogsRef(dc));
};

