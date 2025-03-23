import { formatAsDayWithOrdinal, formatAsLongMonth, formatAsLongWeekDay, getTime } from "./utils";
import "./style.css";

const weekDayEl = document.getElementById("week-day")!;
const monthEl = document.getElementById("month")!;
const dayEl = document.getElementById("day")!;
const yearEl = document.getElementById("year")!;
const tenthHourEl = document.getElementById("tenth-hour")!;
const hourEl = document.getElementById("hour")!;
const tenthMinuteEl = document.getElementById("tenth-minute")!;
const minuteEl = document.getElementById("minute")!;
const tenthSecondEl = document.getElementById("tenth-second")!;
const secondsEl = document.getElementById("second")!;
const secondSeparatorEl = document.getElementById("second-separator")!;
const ampmEl = document.getElementById("ampm")!;
const formatTimeButton = document.getElementById("format-time")!;
const toggleSecondsButton = document.getElementById("toggle-seconds")!;

let showAMPM = true;
let showSeconds = true;

function updateDate() {
    const currentDate = new Date();
    const currentTime = getTime(currentDate, showAMPM);

    const weekday = formatAsLongWeekDay(currentDate.getDay());
    if (weekDayEl.innerText !== weekday) {
        weekDayEl.innerText = weekday;
    }

    const month = formatAsLongMonth(currentDate.getMonth());
    if (monthEl.innerText !== month) {
        monthEl.innerText = month;
    }

    const day = formatAsDayWithOrdinal(currentDate.getDate());
    if (dayEl.innerText !== day) {
        dayEl.innerText = day;
    }

    const year = currentDate.getFullYear().toString();
    if (yearEl.innerText !== year) {
        yearEl.innerText = year;
    }

    const tenthHour = currentTime[0];
    if (tenthHourEl.innerText !== tenthHour) {
        tenthHourEl.innerText = tenthHour;
    }

    const hour = currentTime[1];
    if (hourEl.innerText !== hour) {
        hourEl.innerText = hour;
    }

    const tenthMinute = currentTime[2];
    if (tenthMinuteEl.innerText !== tenthMinute) {
        tenthMinuteEl.innerText = tenthMinute;
    }

    const minute = currentTime[3];
    if (minuteEl.innerText !== minute) {
        minuteEl.innerText = minute;
    }

    const tenthSecond = currentTime[4];
    if (tenthSecondEl.innerText !== tenthSecond) {
        tenthSecondEl.innerText = tenthSecond;
    }

    const second = currentTime[5];
    if (secondsEl.innerText !== second) {
        secondsEl.innerText = second;
    }

    const ampm = currentDate.getHours() >= 12 ? "pm" : "am";
    if (ampmEl.innerText !== ampm) {
        ampmEl.innerText = ampm;
    }
}

function toggleSeconds() {
    const value = toggleSecondsButton.dataset.value;

    showSeconds = value === "true" ? false : true;

    toggleSecondsButton.setAttribute("data-value", String(showSeconds));

    toggleSecondsButton.innerText = showSeconds ? "Hide Seconds" : "Show Seconds";

    secondSeparatorEl.classList.toggle("hidden", !showSeconds);
    tenthSecondEl.classList.toggle("hidden", !showSeconds);
    secondsEl.classList.toggle("hidden", !showSeconds);

    updateDate();
}

toggleSecondsButton.addEventListener("click", toggleSeconds);

function toggleTimeFormat() {
    const value = formatTimeButton.dataset.value;

    showAMPM = value === "true" ? false : true;

    formatTimeButton.setAttribute("data-value", String(showAMPM));

    formatTimeButton.innerText = showAMPM ? "Switch to 24h" : "Switch to 12h";

    ampmEl.classList.toggle("hidden", !showAMPM);

    updateDate();
}

formatTimeButton.addEventListener("click", toggleTimeFormat);

window.onload = () => {
    updateDate();
};

const timer = setInterval(() => {
    updateDate();
}, 1000);

window.addEventListener("beforeunload", () => {
    clearInterval(timer);
    toggleSecondsButton.removeEventListener("click", toggleSeconds);
    formatTimeButton.removeEventListener("click", toggleTimeFormat);
});
