// time and date

const time = document.querySelector('.time')
const date = document.querySelector('.date')
showTimeAndDate()

function showTimeAndDate() {
    let currDate = new Date()
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    time.textContent = currDate.toLocaleTimeString()
    date.textContent = currDate.toLocaleDateString('en-Br', options)
    setTimeout(showTimeAndDate, 1000)
}

// greetings

const greetingTime = document.querySelector('.greeting-container .greeting')
const greetingName = document.querySelector('.greeting-container input')





