let clock = {
  alarams: [],
};

// add to objects
let alarmButton = document.getElementById("setAlaram");
let display = document.getElementById("TimeDisplayer");

// add a alaram
alarmButton.addEventListener("click", function () {
  let time = document.getElementById("alaram-time");
  let date = document.getElementById("alaram-date");

  if (time.value == "" || date.value == "") {
    window.alert("Enter the date and time");
    return;
  } else {
    clock.alarams.push({
      time: time.value,
      date: date.value,
      snoozed: false,
      snooze: 0,
      active: false,
    });
    renderAlarams();
    time.value = "";
    date.value = "";
  }
});

// list in p tag
function renderAlarams() {
  let alaramDisplayer = document.getElementById("upcomming-alaram");
  let text = "";
  let arlarmsArray = clock.alarams;
  console.log(arlarmsArray);
  for (let i = 0; i < arlarmsArray.length; i++) {
    text +=
      `<li> Time:${arlarmsArray[i].time}` +
      "  " +
      `, Date: ${arlarmsArray[i].date}` +
      " " +
      ", Snoozed :" +
      `${arlarmsArray[i].snoozed}` +
      " " +
      `, Snooze Count: ${arlarmsArray[i].snooze} ` + 
      `, Alaram Status: ${arlarmsArray[i].active}` +
      "</li>";
  }
  alaramDisplayer.innerHTML = text;
}

// time displayer
let interval = setInterval(function () {
  let date = new Date();

  display.innerHTML = date;
  checkAlarams();
  renderAlarams();
  // active alarams
  // checkAnyActiveAlarams();
}, 1000);

//show the acitve alaram and alerts
function checkAlarams() {
  let alaramsArray = clock.alarams;
  for (let i = 0; i < alaramsArray.length; i++) {
    let time = currnetTime();
    let date = currentDay();
    if (
      time == alaramsArray[i].time &&
      date === alaramsArray[i].date &&
      alaramsArray[i].active == false &&
      alaramsArray[i].snooze < 3
    ) {
      document.getElementById("alaram-status").innerHTML = "ON";
      clock.alarams[i].active = true;
      console.log("i changed", alaramsArray[i].active);
      return;
    }
  }
}

document.getElementById("snooze-button").addEventListener("click", function () {
  checkAnyActiveAlarams();
});

function checkAnyActiveAlarams() {
  let alaramsArray = clock.alarams;
  for (let i = 0; i < alaramsArray.length; i++) {
    if (alaramsArray[i].active == true) {
      console.log("active", alaramsArray[i].time);

      if (alaramsArray[i].snoozed == false) {
        clock.alarams[i].snoozed = true;
        clock.alarams[i].time = currentTimePlus5();
        clock.alarams[i].snooze = clock.alarams[i].snooze + 1;
        clock.alarams[i].active = false;
        document.getElementById("alaram-status").innerHTML = "OFF";
      } else {
        if (alaramsArray[i].snooze >= 0 && alaramsArray[i].snooze < 3) {
          clock.alarams[i].snooze = clock.alarams[i].snooze + 1;
          clock.alarams[i].time = currentTimePlus5();
          document.getElementById("alaram-status").innerHTML = "OFF";
          clock.alarams[i].active = false;
        } else {
          clock.alarams[i].time = "";
          clock.alarams[i].date = "";
          clock.alarams[i].active = false;
          clock.alarams[i].snoozed = false;
          clock.alarams[i].snooze = 0;
          clock.alarams[i] = clock.alarams[i].splice(i, i);

          document.getElementById("alaram-status").innerHTML = "OFF";
        }
      }
    }
  }
}

function currentDay() {
  let day = new Date();
  let date = "";

  date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  return date;
}
function currnetTime() {
  let day = new Date();
  let hour = day.getHours();
  let min = day.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  let time = hour + ":" + min;

  return time;
}

function currentTimePlus5() {
  let day = new Date();
  let hour = day.getHours();
  let min = day.getMinutes() + 1;
  if (min < 10) {
    min = "0" + min;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  let time = hour + ":" + min;

  return time;
}
