import {getPartOfDayGreeting} from "./greetings";

export const background = function (){

    const nextBtn = document.querySelector('.slide-next')
    const prevBtn = document.querySelector('.slide-prev')

    const images = ['01','02','03','04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    let index = Math.round(Math.random()*19)

    const body = document.querySelector('body')

    const setBackground = (node, images, index) => {
        node.style.backgroundImage = `url(../assets/img/${getPartOfDayGreeting()}/${images[index]}.webp)`
    }

    setBackground(body, images, index)

    nextBtn.addEventListener('click', ()=>{
        console.log('next')
            if (index < 19) {
                index ++
            } else {
                index = 0
            }

        setBackground(body, images, index)
        }
    )

    prevBtn.addEventListener('click', ()=>{
        console.log('prev')
            if (index > 0) {
                index --
            } else {
                index = 19
            }
        setBackground(body, images, index)
        }
    )



}
