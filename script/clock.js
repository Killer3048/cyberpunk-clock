const clock = document.querySelector('.clock');
const hours = clock.querySelector('.clock__hours');
const minutes = clock.querySelector('.clock__minutes');
const seconds = clock.querySelector('.clock__seconds');
const tooltip = document.querySelector('.tooltip');
const tooltipClose = document.querySelector('.tooltip__close')
const tooltipDate = tooltip.querySelector('.tooltip__date');
const tooltipTimezone = tooltip.querySelector('.tooltip__timezone');
const tooltipCopyBtn = tooltip.querySelector('.tooltip__button:first-child');
const tooltipRefreshBtn = tooltip.querySelector('.tooltip__button:last-child');
const tooltipShow = document.querySelector('.clock__showedButton');


const addZero = value => value < 10 ? `0${value}` : value;



const updateClock = () => {
    const date = new Date();
    const hoursValue = date.getHours();
    const minutesValue = date.getMinutes();
    const secondsValue = date.getSeconds();

    hours.textContent = addZero(hoursValue);
    minutes.textContent = addZero(minutesValue);
    seconds.textContent = addZero(secondsValue);
};

const updateTooltip = () => {
    const date = new Date();
    const dateValue = date.toLocaleDateString();
    const timezoneValue = date.toLocaleTimeString();

    tooltipDate.textContent = dateValue;
    tooltipTimezone.textContent = timezoneValue;
};

const copyTime = () => {
    const date = new Date();
    const time = `${date.toLocaleDateString()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;

    navigator.clipboard.writeText(time)
        .then(() => {
            tooltipCopyBtn.textContent = 'Copied';
            setTimeout(() => {
                tooltipCopyBtn.textContent = 'Copy';
            }, 2000);
        })
        .catch(err => console.error('Could not copy time: ', err));
};

const refreshTime = () => {
    updateClock();
    updateTooltip();
};

const hideTooltip = () => {
    tooltip.style.opacity = 'hidden';
};

clock.addEventListener('mousemove', () => {
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible'
    setTimeout(hideTooltip, 1000);
});

tooltipClose.addEventListener('click', () => {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden'
    setTimeout(hideTooltip, 1000);
})

tooltipShow.addEventListener('click', () => {
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible'
    setTimeout(hideTooltip, 1000);
})


updateClock();
updateTooltip();
setInterval(updateClock, 1000);
tooltipCopyBtn.addEventListener('click', copyTime);
tooltipRefreshBtn.addEventListener('click', refreshTime);