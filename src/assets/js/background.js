import {getPartOfDayGreeting} from "./greetings";

export const background = function (){

    const nextBtn = document.querySelector('.slide-next')
    const prevBtn = document.querySelector('.slide-prev')

    const images = ['01','02','03','04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    let index = Math.round(Math.random()*19)

    const body = document.querySelector('body')


    let nextImg

    getLinkToImage().then(data => nextImg = data)

    const setApiBackground = (node, images, index) => {
        if (nextImg) {
            node.style.backgroundImage = `url(${nextImg})`
            getLinkToImage().then(data => nextImg = data)
        } else {
            node.style.backgroundImage = `url(../assets/img/${getPartOfDayGreeting()}/${images[index]}.webp)`
        }
    }

    setApiBackground(body, images, index)

    async function getLinkToImage() {
        try {
            const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getPartOfDayGreeting()}&client_id=NIef7jSPD2FJ-EH95HzmCbxiF-i-FrsXvGf7NDmi2zs`;
            const res =  await fetch(url)
            const data = await res.json()
            // console.log(data.links.download)
            return data.urls.regular
        } catch {
            throw new Error('no available image link')
        }

    }

    nextBtn.addEventListener('click', ()=>{
        console.log('next')
            if (index < 19) {
                index ++
            } else {
                index = 0
            }
        setApiBackground(body, images, index)
        }
    )

    prevBtn.addEventListener('click', ()=>{
        console.log('prev')
            if (index > 0) {
                index --
            } else {
                index = 19
            }
        setApiBackground(body, images, index)
        }
    )
}
