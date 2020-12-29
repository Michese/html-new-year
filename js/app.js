window.onload = function () {

    const wrapper = document.querySelector('.wrapper');
    const timerBlock = document.querySelector('.timer-block');
    const hours = timerBlock.querySelector('.hour');
    const seconds = timerBlock.querySelector('.second');
    const minutes = timerBlock.querySelector('.minute');
    const newYearDate2021 = new Date(2021, 0, 1);
    let currentDate = new Date();
    let intervalToNewYear2021 = Math.floor((+newYearDate2021 - +currentDate) / 1000);

    alternationOfDay = () => {
        const currentHour = currentDate.getHours();
        if(currentHour >= 0 && currentHour < 6) {
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
        if(currentDate.getHours() === 0 || currentDate.getHours() === 6 ||currentDate.getHours() === 12 || currentDate.getHours() === 18) {
            alternationOfDay();
        }
        intervalToNewYear2021 = Math.floor((+newYearDate2021 - +currentDate) / 1000);

    }, 1000);


    
    const mediaQueryMax768 = window.matchMedia('(max-width: 768px)')
    const mediaQueryMax768AndMin1200 = window.matchMedia('(min-width: 769px) and (max-width: 1200px)')
    const mediaQueryMin1201 = window.matchMedia('(min-width: 1201px)')

    function handleMediaQueryMax768(e) {
        if (e.matches) {
          console.log('mediaQueryMax768');
        //   wrapper.classList = 'wrapper morning';
        }
      };
      mediaQueryMax768.addListener(handleMediaQueryMax768);
      handleMediaQueryMax768(mediaQueryMax768);

      function handleMediaQueryMax768AndMin1200(e) {
        if (e.matches) {
          console.log('mediaQueryMax768AndMin1200');
        }
      };
      mediaQueryMax768AndMin1200.addListener(handleMediaQueryMax768AndMin1200);
      handleMediaQueryMax768AndMin1200(mediaQueryMax768AndMin1200);

      function handleMediaQueryMin1201(e) {
        if (e.matches) {
          console.log('mediaQueryMin1201');
        }
      };
      mediaQueryMin1201.addListener(handleMediaQueryMin1201);
      handleMediaQueryMin1201(mediaQueryMin1201);
}

