const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");
const dateContainer = document.querySelector(".js-date"),
    dateTitle = dateContainer.querySelector("h2");

function getTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const day = today.getDay();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    dateTitle.innerText =
        `${year}.${month<10 ? `0${month}` : month}.${date<10 ? `0${date}` : date} ${weekday[day]}`

    clockTitle.innerText =
        `${hours<10 ? `0${hours}` : hours} : ${minutes<10 ? `0${minutes}` : minutes} : ${seconds<10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();