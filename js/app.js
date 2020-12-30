window.onload = function () {
    snow();
    fireworks();
    fireworkActivated = false;
    snowActivated = false;
    let isNewYear = false;

    const wrapper = document.querySelector('.wrapper');
    const canvas = document.querySelector('.canvas');
    let audio = document.querySelector('.audio');
    const timerBlock = document.querySelector('.timer-block');
    const timer = timerBlock.querySelector('.timer');
    const hours = timerBlock.querySelector('.hour');
    const seconds = timerBlock.querySelector('.second');
    const minutes = timerBlock.querySelector('.minute');

    const newYearDate2021 = new Date(2021, 0, 1);
    let currentDate = new Date();
    let intervalToNewYear2021 = Math.floor((+newYearDate2021 - +currentDate) / 1000);


    
    alternationOfDay = () => {
        const currentHour = currentDate.getHours();
        
        if (isNewYear === true || currentHour >= 0 && currentHour < 6) {
            wrapper.classList = 'wrapper night';
        } else if (currentHour >= 6 && currentHour < 12) {
            wrapper.classList = 'wrapper morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            wrapper.classList = 'wrapper afternoon';
        } else {
            wrapper.classList = 'wrapper evening';
        }

    }

    alternationOfDay();

    timerSetIntervalId = setInterval(() => {
        if (intervalToNewYear2021 <= 0) {
            intervalToNewYear2021 = 0;
        }

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

        currentDate = new Date();
        if (currentDate.getHours() === 0 || currentDate.getHours() === 6 || currentDate.getHours() === 12 || currentDate.getHours() === 18) {
            alternationOfDay();
        }
        intervalToNewYear2021 = Math.floor((+newYearDate2021 - +currentDate) / 1000);

        if (intervalToNewYear2021 < 0) {
            celebrate();
        }
    }, 1000);



    const mediaQueryMax479 = window.matchMedia('(max-width: 720px)');
    const mediaQueryMax768AndMin1200 = window.matchMedia('(min-width: 721px) and (max-width: 1200px)');
    const mediaQueryMin1201 = window.matchMedia('(min-width: 1201px)');
    const img = document.querySelector('.back-img');

    function handleMediaQueryMax479(e) {
        if (e.matches) {
            console.log('mediaQueryMax479');
            img.src = 'img/back-640.png';
            celebrate();
        }
    };
    mediaQueryMax479.addListener(handleMediaQueryMax479);
    handleMediaQueryMax479(mediaQueryMax479);

    function handleMediaQueryMax768AndMin1200(e) {
        if (e.matches) {
            console.log('mediaQueryMax768AndMin1200');
            console.log(img.attributes.src);
            img.src = 'img/back-1280.png';
            celebrate();
        }
    };
    mediaQueryMax768AndMin1200.addListener(handleMediaQueryMax768AndMin1200);
    handleMediaQueryMax768AndMin1200(mediaQueryMax768AndMin1200);

    function handleMediaQueryMin1201(e) {
        if (e.matches) {
            console.log('mediaQueryMin1201');
            console.log(img.attributes.src);
            img.src = 'img/back-1920.png';
            celebrate();
        }
    };
    mediaQueryMin1201.addListener(handleMediaQueryMin1201);
    handleMediaQueryMin1201(mediaQueryMin1201);

    const card = document.querySelector('#card');

    card.addEventListener('click', () => {
        card.classList.toggle('is-opened');
    })



    //   

    setTimeout(() => {
        audio = document.querySelector('.audio');
        while (audio == null) {
            console.log(audio);
            audio = document.querySelector('.audio');
        }
        const buttonVolume = document.querySelector('.volume');
        audio.play();
        audio.volume = 0.5;

        buttonVolume.addEventListener('click', () => {
            const icon = buttonVolume.querySelector('#volume__icon');
            if (icon.classList.contains('fa-volume-up')) {
                icon.classList.remove('fa-volume-up');
                icon.classList.toggle('fa-volume-mute')
                audio.volume = 0;
            } else {
                icon.classList.remove('fa-volume-mute');
                icon.classList.toggle('fa-volume-up');
                audio.play();
                audio.volume = 0.5;
            }
        });
    }, 2000);

    //

    const buttonNewYear = document.querySelector('.new_year__block');
    buttonNewYear.addEventListener('click', function() {
        isNewYear = true;
        celebrate();
    });

    function celebrate() {
    
        if(isNewYear === true) {

            clearInterval(timerSetIntervalId);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            timer.classList.toggle('pulse');
            audio.src = "audio/audio_2.mp3";
            audio.play();
            alternationOfDay();
            if(canvas.width >= 480) {
                fireworkActivated = true;
            }
        }

        if(canvas.width >= 480) {
            snowActivated = true;
        } else {
            fireworkActivated = false;
            snowActivated = false;
        }
    }
}

