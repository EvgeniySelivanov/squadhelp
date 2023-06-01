const fs = require('fs');
const archiving = () => {
  // const logDataFile = fs.readFileSync('./Log/log.json', 'utf-8');
  // // console.log('>>>>>>>>>>>>>>>>>>', typeof logDataFile);
  // const obj=JSON.parse(logDataFile);
  // console.log('obj>>>>>>>>>>>>>>>>>>', obj);
  // // const dataArchiving=()=>{
  // //   const logDataFile = fs.readFileSync('./Log/log.json');
  // //   fs.appendFile('./Log/logArch.json', logDataFile, function (err) {
  // //     if (err) console.log('error', err);
  // //   });

  // // };
  // let time = 0;
  // setInterval(() => {
  //   time = new Date;
  //   if (time.getHours() === 1 && time.getMinutes() === 0 && time.getSeconds() === 0) {
  //     console.log('archving work!!!!!!!!!!');
  //   }
  // }, 1000);
};
module.exports = archiving;
