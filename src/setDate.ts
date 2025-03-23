import {
  getTime,
  formatAsLongMonth,
  formatAsLongWeekDay,
  formatAsDayWithOrdinal,
} from "./utils";
const weekDay = document.getElementById("week-day")!;
const month = document.getElementById("month")!;
const day = document.getElementById("day")!;
const year = document.getElementById("year")!;
const tenthHour = document.getElementById("tenth-hour")!;
const hour = document.getElementById("hour")!;
const tenthMinute = document.getElementById("tenth-minute")!;
const minute = document.getElementById("minute")!;
const tenthSecond = document.getElementById("tenth-second")!;
const second = document.getElementById("second")!;

export default function setDate() {
  const currentDate = new Date();
  const currentTime = getTime(currentDate, true);
  weekDay.innerText = formatAsLongWeekDay(currentDate.getDay());
}

setInterval(() => {
  setDate();
}, 1000);
