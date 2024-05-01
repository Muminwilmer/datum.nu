const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for']
  console.log(`${ip}: Just loaded the page!`)

  const date = new Date(Date.now())

  //0 in Date
  let dayOfMonth = date.getDate();
  dayOfMonth < 10 ? dayOfMonth = "0" + dayOfMonth : null;

  //0 in Hour
  let hourOfDay = date.getHours();
  hourOfDay < 10 ? hourOfDay = "0" + hourOfDay : null;

  //0 in Minute
  let minuteOfHour = date.getMinutes();
  minuteOfHour < 10 ? minuteOfHour = "0" + minuteOfHour : null;
  
  function getMonthString(month) {
    switch (month) {
      case 0:
        return "Januari";
      case 1:
        return "Februari";
      case 2:
        return "Mars";
      case 3:
        return "April";
      case 4:
        return "Maj";
      case 5:
        return "Juni";
      case 6:
        return "Juli";
      case 7:
        return "Augusti";
      case 8:
        return "September";
      case 9:
        return "Oktober";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "N/A";
    }
  }

  function getDayString(day) {
    switch (day) {
      case 1:
        return "Måndag";
      case 2:
        return "Tisdag";
      case 3:
        return "Onsdag";
      case 4:
        return "Torsdag";
      case 5:
        return "Fredag";
      case 6:
        return "Lördag";
      case 7:
        return "Söndag";
      default:
        return "N/A";
    }
  }

  function getWeekString(date){
    // Calculate the difference in milliseconds between the target date and the input date
    const whereInYear = date-new Date(date.getFullYear(), 0, 1);
  
    // Calculate the number of weeks by dividing the difference by the number of milliseconds in a week
    const weekNumber = Math.ceil(whereInYear / (1000 * 60 * 60 * 24 * 7));
  
    return weekNumber;
  }
  res.send(`
  <style>
    html, body { height: 100%; background-color: #164792; overflow: hidden; }
    time {
      position: relative;
      top: 25%;
      left: 0;
      right: 0;
      margin: -110px 0 0 0;
      height: 220px;
      text-align: center;
      color: #1b59b7;
      font-family: Arial, serif;
      font-size: 120px;
      line-height: 165px;
      font-weight: bold;
    }
    </style>
    <div><time>Datum: ${getDayString(date.getDay())} (${dayOfMonth})</time></div>
    <div><time>Vecka: ${getWeekString(date)}</time></div>
    <div><time>Månad: ${getMonthString(date.getMonth())}</time></div>
    <div><time>År: ${date.getFullYear()}</time></div>
    `)
});

app.listen(port, () => {
  console.log(`Server is listening at port:${port}`);
});
