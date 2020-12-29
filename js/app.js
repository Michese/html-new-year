window.onload = function () {
    const timerBlock = document.querySelector('.timer-block');
    const hours = timerBlock.querySelector('.hour');
    const seconds = timerBlock.querySelector('.second');
    const minutes = timerBlock.querySelector('.minute');
    const newYearDate2021 = new Date(2021, 0, 1);
    let currentDate = new Date();
    let intervalToNewYear2021 = Math.floor((+newYearDate2021 - +currentDate) / 1000);
    timerSetIntervalId = setInterval(() => {
        hours.innerHTML = Math.floor(intervalToNewYear2021 / 3600);
        if (Math.floor((intervalToNewYear2021 % 3600) / 60) > 9) {
            minutes.innerHTML = Math.floor((intervalToNewYear2021 % 3600) / 60);
        } else {
            minutes.innerHTML = 0 + (Math.floor((intervalToNewYear2021 % 3600) / 60).toString());
        }

        if (Math.floor(intervalToNewYear2021 % 60) > 9) {
            seconds.innerHTML = Math.floor(intervalToNewYear2021 % 60);
        } else {
            seconds.innerHTML = '0' + (Math.floor(intervalToNewYear2021 % 60)).toString();
        }

        console.log('0' + (Math.floor(intervalToNewYear2021 % 60)).toString());
        currentDate = new Date();
        intervalToNewYear2021 = Math.floor((+newYearDate2021 - +currentDate) / 1000);
    }, 1000);


    const wrapper = document.querySelector('.wrapper');
    wrapper.

}

