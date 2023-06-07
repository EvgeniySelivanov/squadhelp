const fs = require('fs');
const handlerLog = (error) => {
  const errMessege = error.message;
  const errCode = error.code;
  const errStack = error.stack;
  const timeErr = Date.now();

  if (fs.existsSync('./Log/log.json') === false) {
    const obj = {
      table: [],
    };
    obj.table.push(
      {
        message: errMessege,
        time: timeErr,
        code: errCode,
        stackTrace: errStack,
      });
    const logData = JSON.stringify(obj, null, 2);
    fs.writeFile('./Log/log.json', logData, function (err) {
      if (err) console.log('error', err);
    });
  }
  console.log('size log>>> ', fs.statSync('./Log/log.json').size);
  if (fs.existsSync('./Log/log.json') === true && fs.statSync('./Log/log.json').size != 0) {
    const readFile = fs.readFileSync('./Log/log.json', function (err) {
      if (err) { console.log(err); }
    });
    const obj = JSON.parse(readFile);
    obj.table.push({
      message: errMessege,
      time: timeErr,
      code: errCode,
      stackTrace: errStack,
    });
    const logData = JSON.stringify(obj, null, 2);
    fs.writeFile('./Log/log.json', logData, function (err) {
      if (err) console.log('error', err);
    });
  }
  if (fs.existsSync('./Log/log.json') === true && fs.statSync('./Log/log.json').size === 0) {
    const obj = {
      table: [],
    };
    obj.table.push(
      {
        message: errMessege,
        time: timeErr,
        code: errCode,
        stackTrace: errStack,
      });
    const logData = JSON.stringify(obj, null, 2);
    fs.writeFile('./Log/log.json', logData, function (err) {
      if (err) console.log('error', err);
    });
  }
};

module.exports = handlerLog;
