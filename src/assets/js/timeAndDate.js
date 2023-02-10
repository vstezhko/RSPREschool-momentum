// time and date

export const timeAndDateModule = function(lang){
    const time = document.querySelector('.time')
    const date = document.querySelector('.date')
    showTimeAndDate()

    function showTimeAndDate() {
        let currDate = new Date()
        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        time.textContent = currDate.toLocaleTimeString()
        date.textContent = currDate.toLocaleDateString(`${lang}-Br`, options)
        setTimeout(showTimeAndDate, 1000)
    }

}




