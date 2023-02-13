import { showConfetti, days, formattedDays } from "./script.js"
const times = [
    0,
    50,
    95,
    105,
    150,
    195,
    205,
    250,
    300,
    305,
    350,
    1440
];

const START_HOUR = 8;
const timeFormat = {
    HOURS: 0,
    MINUTES: 1,
    SECONDS: 2,
    RAW_SECONDS: 3,
    RAW_MINUTES: 4
}

let startDate = new Date();
startDate.setHours(START_HOUR);
startDate.setMinutes(0);
startDate.setSeconds(-14);
startDate = startDate.getTime();

export function getTime() {
    let currentDate = new Date().getTime()
    let time = currentDate - startDate;
    var nextTargetIndex = getIndex(get(timeFormat.RAW_MINUTES, time));
    
    setTimer(nextTargetIndex,currentDate);
    
    let currentDay = (new Date().getDay() - 1);
    
    // If the current day is out the class days length then consider current day as the first day in the class
    let currentDayLastClass;

    if(formattedDays.length < currentDay) currentDayLastClass = formattedDays[currentDay];
    else currentDayLastClass = 0;

    if(currentDayLastClass < nextTargetIndex){ // If next hour does't exist
        nextTargetIndex = -1;
        currentDay++;
        if(formattedDays.length < currentDay) // If next day is not valid
            currentDay = 0;
    }

    subject.innerHTML = `A ${days[currentDay][nextTargetIndex+2]}`;
    setTimeout(getTime, 1000);
    
}

function fixed(time) {
    time = Math.floor(time);
    if (time < 10) return "0" + time;
    return time;
}

function getIndex(raw) {
    for (var i = 0; i < times.length; i++) {
        if (raw < times[i]) 
        return i-1;
    }
    return -1;
}

function setTimer(nextTargetIndex,currentDate){
    let nextTarget = times[nextTargetIndex+1];
    let nextDate =  new Date(startDate + nextTarget*60000) // Add start time (08:00) and the minutes until the next class
    nextDate = nextDate.getTime();
    nextDate = Math.max(nextDate,currentDate) - Math.min(nextDate,currentDate); // Next date is now the difference between current time and next class time

    timer.innerHTML = `${get(timeFormat.HOURS, nextDate)}:${get(timeFormat.MINUTES,nextDate)}:${get(timeFormat.SECONDS,nextDate)}`;
    
    if(Math.floor(nextDate/1000) === 0) showConfetti();
}

function get(format, time) {
    switch (format) {
        case timeFormat.HOURS:
            return fixed(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        case timeFormat.MINUTES:
            return fixed(time % (1000 * 60 * 60) / (1000 * 60));
        case timeFormat.SECONDS:
            return fixed(time % (1000 * 60) / 1000);
        case timeFormat.RAW_SECONDS:
            return Math.floor(time / 1000);
        case timeFormat.RAW_MINUTES:
            return Math.floor(time / (1000 * 60));
        default:
            return time;
    }
}