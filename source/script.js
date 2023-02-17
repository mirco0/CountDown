import { getTime } from "./clock.js";

let timer;
let subject;

export let days = [
    ["","DIRITTO","INFORMATICA","RICREAZIONE","INFORMATICA","ITALIANO","RICREAZIONE","ITALIANO","INGLESE","ITALIANO"],
    ["","STORIA","DIRITTO","RICREAZIONE","ECONOMIA AZIENDALE","ECONOMIA AZIENDALE","RICREAZIONE","MOTORIA","INGLESE"],
    ["","ECONOMIA AZIENDALE","ECONOMIA AZIENDALE","RICREAZIONE","MATEMATICA","INGLESE","RICREAZIONE","INFORMATICA","ITALIANO"],
    ["","ITALIANO","DIRITTO","RICREAZIONE","MATEMATICA","MATEMATICA","RICREAZIONE","MOTORIA","RELIGIONE","ECONOMIA AZIENDALE"],
    ["","ECONOMIA AZIENDALE","ECONOMIA AZIENDALE","RICREAZIONE","INFORMATICA","INFORMATICA","RICREAZIONE","DIRITTO","DIRITTO"]
];

export let formattedDays = new Array();

var tab,countdown,tableBody,viewing;


countdown = document.getElementById("countdown");
countdown.onclick = toggleTable;

tab = document.getElementById("tab");
timer = document.getElementById("timer");
subject = document.getElementById("subject");

window.onload = function() {
    formatDays();

    viewing = (new Date().getDay() - 1) % 7;
    if(viewing > days.length-1) viewing = 0;
    createTable(formattedDays).onclick = toggleTable;
    
    getTime();
}

function formatDays(){
    days.forEach(day => formattedDays.push(day.filter( sub => sub!="" && sub!="RICREAZIONE" && sub!="USCITA")));
}

function createTable(tableData) {
    var table = document.createElement('table');
    table.id = "table";
    tab.classList.add("unselectable");
    tab.classList.add("hide");
    tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData,i) {
        var row = document.createElement('tr');
        if(i != viewing && isMobile())
            row.className = "hide";
        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    tab.appendChild(table);
    return table;
}

function toggleTable(){
    tab.classList.add("fade");
    tab.classList.toggle("hide")
    countdown.classList.toggle("hide")
}

export function showConfetti(){
    startConfetti();
    setTimeout(stopConfetti,5000);
}

window.back = function back(){
    tableBody.children[viewing].classList.add('hide');
    if(viewing > 0) 
        viewing--;
    tableBody.children[viewing].classList.remove('hide');
}

window.next = function next(){
    tableBody.children[viewing].classList.add('hide');
    if(viewing+1 < tableBody.children.length)
        viewing++;
    tableBody.children[viewing].classList.remove('hide');
}

function isMobile(){
    //use the same code used in css for consistency
    return window.matchMedia("only screen and (max-width:600px)").matches;
}