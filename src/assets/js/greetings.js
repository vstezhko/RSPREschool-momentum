// greetings


export const getPartOfDayGreeting = () => {
    const date = new Date()
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
export const greetings = function(){
    const greetingTime = document.querySelector('.greeting-container .greeting')
    const greetingName = document.querySelector('.greeting-container input')

    greetingName.addEventListener('input', (e)=>{
        localStorage.setItem("name", e.target.value)
        console.log(localStorage.getItem('name'))
    })


    greetingTime.textContent = `Good ${getPartOfDayGreeting()}`
    greetingName.value = localStorage.getItem('name')

}

