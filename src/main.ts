import { formatAsDayWithOrdinal, formatAsLongMonth, formatAsLongWeekDay } from "./utils";
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
    const date = new Date();

    const hours = date.getHours() - (date.getHours() > 12 && showAMPM ? 12 : 0);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const weekday = formatAsLongWeekDay(date.getDay());
    if (weekDayEl.innerText !== weekday) {
        weekDayEl.innerText = weekday;
    }

    const month = formatAsLongMonth(date.getMonth());
    if (monthEl.innerText !== month) {
        monthEl.innerText = month;
    }

    const day = formatAsDayWithOrdinal(date.getDate());
    if (dayEl.innerText !== day) {
        dayEl.innerText = day;
    }

    const year = String(date.getFullYear());
    if (yearEl.innerText !== year) {
        yearEl.innerText = year;
    }

    const tenthHour = String(Math.floor(hours / 10));
    if (tenthHourEl.innerText !== tenthHour) {
        tenthHourEl.innerText = tenthHour;
    }

    const hour = String(hours % 10);
    if (hourEl.innerText !== hour) {
        hourEl.innerText = hour;
    }

    const tenthMinute = String(Math.floor(minutes / 10));
    if (tenthMinuteEl.innerText !== tenthMinute) {
        tenthMinuteEl.innerText = tenthMinute;
    }

    const minute = String(minutes % 10);
    if (minuteEl.innerText !== minute) {
        minuteEl.innerText = minute;
    }

    const tenthSecond = String(Math.floor(seconds / 10));
    if (tenthSecondEl.innerText !== tenthSecond) {
        tenthSecondEl.innerText = tenthSecond;
    }

    const second = String(seconds % 10);
    if (secondsEl.innerText !== second) {
        secondsEl.innerText = second;
    }

    const ampm = date.getHours() >= 12 ? "pm" : "am";
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
}, 100);

window.addEventListener("beforeunload", () => {
    clearInterval(timer);
    toggleSecondsButton.removeEventListener("click", toggleSeconds);
    formatTimeButton.removeEventListener("click", toggleTimeFormat);
});
