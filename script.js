// Variables
let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
const ring = new Audio("audio/Alarm.mp3");
const alarmImage = document.querySelector("#alarmImage");
const alarmAudio = document.querySelector("#alarmAudio");
const videoContainer = document.querySelector("#videoContainer");

// Script for Time and Date
function updateClock() {
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

    if (hou == 0) {
        hou = 12;
    }

    if (hou > 12) {
        hou -= 12;
        pe = "PM";
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
    var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];

    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }

    for (let i = 0; i < alarmListArr.length; i++) {
        if (alarmListArr[i] == `${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`) {
            console.log("Alarm ringing...");

            // Debug statements
            console.log("Playing audio...");
            console.log("Image source:", alarmImage.src);
            console.log("Audio source:", alarmAudio.src);

            ring.play().catch(e => console.error("Error playing audio:", e));
            alarmImage.src = "images/ig.gif";
            alarmAudio.src = "audio/Alarm.mp3";
            videoContainer.style.display = "block";
            document.querySelector("#stopAlarm").style.visibility = "visible";
            break;
        }
    }
}

function initClock() {
    updateClock();
    window.setInterval(updateClock, 1000);
}

// Set Alarm section
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Add alarm
function setAlarm() {
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if (time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")) {
        alert("Please, Select Valid Input");
    } else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += 
        `<div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
    }
}

setAlarmBtn.addEventListener("click", setAlarm);

// Delete alarm
function deleteAlarm(click_id) {
    var element = document.getElementById("alarm" + click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span" + click_id).innerText);
    alarmListArr.splice(deleteIndex, 1);
    element.remove();
}

// Stop Alarm
function stopAlarm() {
    ring.pause();
    alarmImage.src = "";
    alarmAudio.pause();
    videoContainer.style.display = "none";
    document.querySelector("#stopAlarm").style.visibility = "hidden";
}

// Snooze Alarm
function snoozeAlarm() {
    ring.pause();
    alarmImage.src = "";
    alarmAudio.pause();
    videoContainer.style.display = "none";
    setTimeout(() => {
        ring.play().catch(e => console.error("Error playing audio:", e));
        alarmImage.src = "F:\projects\ENCRIPTS\task 3\script.js\images\ig.gif";
        alarmAudio.src = "F:\projects\ENCRIPTS\task 3\script.js\audio\Alarm.mp3";
        videoContainer.style.display = "block";
    }, 5000); // Snooze for 5 seconds
}
