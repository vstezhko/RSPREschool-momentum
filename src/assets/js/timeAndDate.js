// time and date

let timeout

export const timeAndDateModule = function(lang){
    clearTimeout(timeout)

    const time = document.querySelector('.time')
    const date = document.querySelector('.date')
    showTimeAndDate(lang)

    function showTimeAndDate(lang) {
        let currDate = new Date()
        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        time.textContent = currDate.toLocaleTimeString()
        date.textContent = currDate.toLocaleDateString(`${lang}-Br`, options)
        timeout = setTimeout(()=>showTimeAndDate(lang), 1000)
    }

}




