const fs = require('fs');
const archiving = () => {
  let time = 0;
  setInterval(() => {
    time = new Date;
    // console.log(time);
    if (time.getHours() === 1 && time.getMinutes() === 0 && time.getSeconds() === 0 && fs.existsSync('./Log/log.json') === true) {
      const readFile = fs.readFileSync('./Log/log.json', 'utf-8');
      const errTodayObj = JSON.parse(readFile);
      const archArr = errTodayObj.table;
      archArr.map((elem) => { return delete elem.stackTrace; });
      const obj = {
        table: archArr,
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
