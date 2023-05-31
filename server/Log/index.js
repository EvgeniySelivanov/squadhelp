const fs = require('fs');
const handlerLog = (err) => {
  const timeErr = Date.now();
  const obj = {
    message: err.message,
    time: timeErr,
    code: err.code,
    stackTrace: err.stack,
  };
  const logData = JSON.stringify(obj);
  fs.appendFile('./Log/log.json', logData, function (err) {
    if (err) console.log('error', err);
  });
};
module.exports = handlerLog;
