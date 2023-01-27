// greetings
export const greetings = function(){
    const date = new Date()
    const greetingTime = document.querySelector('.greeting-container .greeting')
    const greetingName = document.querySelector('.greeting-container input')

    greetingName.addEventListener('input', (e)=>{
        localStorage.setItem("name", e.target.value)
        console.log(localStorage.getItem('name'))
    })

    export const getPartOfDayGreeting = (date) => {
        const hour = date.getHours()
        if (hour >= 18) {
            return 'evening'
        } else if (hour >= 12) {
            return 'afternoon'
        } else if (hour >= 6) {
            return 'morning'
        } else {
            return 'night'
        }
    }

    greetingTime.textContent = `Good ${getPartOfDayGreeting(date)}`
    greetingName.value = localStorage.getItem('name')

}

