const frmt = {
    HOURS: 0,
    MINUTES: 1,
    SECONDS: 2,
    RAW_SECONDS: 3,
    RAW_MINUTES: 4
}

let timer;
let subject;
let date;
let target;
let START_HOUR = 8;
let times = [0,                                  50,                     95,                  105,           150,                  195,                 205,        250,    300, 305,350];
//let times = [0,                                  1,                      2,                    3,             4,                    5,                    6,                 7];
let days = [
    ["","ITALIANO","INFORMATICA","RICREAZIONE","INFORMATICA","ECONOMIA AZIENDALE","RICREAZIONE","DIRITTO","DIRITTO",""],
    ["","ECONOMIA AZIENDALE","ECONOMIA AZIENDALE","RICREAZIONE","ITALIANO","INGLESE","RICREAZIONE","RELIGIONE","MATEMATICA","RICREAZIONE","MATEMATICA",""],
    ["","DIRITTO","ECONOMIA AZIENDALE","RICREAZIONE","ECONOMIA AZIENDALE","MOTORIA","RICREAZIONE","INGLESE","INFORMATICA","RICREAZIONE","INFORMATICA",""],
    ["","ITALIANO","DIRITTO","RICREAZIONE","MOTORIA","ECONOMIA","RICREAZIONE","MATEMATICA","INGLESE",""],
    ["","DIRITTO","ITALIANO","RICREAZIONE","ITALIANO","ITALIANO","RICREAZIONE","ECONOMIA AZIENDALE","INFORMATICA",""]
];

function getIndex(raw) {
  console.log(raw)
    for (var i = 0; i < times.length; i++) {
        if (raw < times[i]) 
        return i-1;
    }
    return -1;
}

window.onload = function() {
    target = new Date();
    target.setHours(START_HOUR);
    target.setMinutes(0);
    target.setSeconds(-9);
    target = target.getTime();
    timer = document.getElementById("timer");
    subject = document.getElementById("subject");
    getTime();
}

function getTime() {
    date = new Date();
    
    //get time since beginning 08:00
    let time = date.getTime() - target;
    var i = getIndex(get(frmt.RAW_MINUTES, time));
    
    // get subtime since the hour
    let diff = times[i+1];
    let sub =  new Date(target + diff*60000).getTime() 
    date = date.getTime();
    sub =  Math.max(sub,date) - Math.min(sub,date);
    timer.innerHTML = get(frmt.HOURS, sub) + ":" + get(frmt.MINUTES, sub) + ":" + get(frmt.SECONDS,sub)
    let day = (new Date().getDay() - 1) % 7; 
    subject.innerHTML = "A " + days[day][i+2]
    setTimeout(getTime, 1000);
}

function fixed(time) {
    time = Math.floor(time);
    if (time < 10) return "0" + time;
    return time;
}

function get(sfrmt, time) {
    switch (sfrmt) {
        case frmt.HOURS:
            return fixed(time / (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        case frmt.MINUTES:
            return fixed(time % (1000 * 60 * 60) / (1000 * 60));
        case frmt.SECONDS:
            return fixed(time % (1000 * 60) / 1000);
        case frmt.RAW_SECONDS:
            return Math.floor(time / 1000);
        case frmt.RAW_MINUTES:
            return Math.floor(time / (1000 * 60));
        default:
            return time;
    }
}