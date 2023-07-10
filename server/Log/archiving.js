const fs = require('fs');

const archiving = () => {
  let time = 0;
  setInterval(() => {
    time = new Date();
    // console.log(time);
    if (
      time.getHours() === 18 &&
      time.getMinutes() === 29 &&
      time.getSeconds() === 20 &&
      fs.existsSync('./Log/log.json') === true
    ) {
      const readFile = fs.readFileSync('./Log/log.json', 'utf-8');
      const errTodayObj = JSON.parse(readFile);
      const archArr = errTodayObj.table;
      console.log('archArr>>>>>>', archArr);
      const archHistoryToday = archArr.map((elem) => {
        delete elem.stackTrace;
        return elem;
      });
      console.log('archHistoryToday>>>>>>', archHistoryToday);
      const obj = {
        table: archHistoryToday,
      };
      const logData = JSON.stringify(obj, null, 2);
      fs.writeFile(`./Log/archLog${Date.now()}.json`, logData, function (err) {
        if (err) console.log('error', err);
      });
      fs.unlink('./Log/log.json', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    }
  }, 1000);
};
module.exports = archiving;
