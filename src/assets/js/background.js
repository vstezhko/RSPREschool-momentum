import {getPartOfDayGreeting} from "./greetings";


export const background = function (bgSrc, tags){
    console.log(bgSrc,tags)

    const changeBgBtns = document.querySelectorAll('.slider-icon')

    const images = ['01','02','03','04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    let index = Math.round(Math.random()*19)
    const body = document.querySelector('body')

    const changeBgImg = async (src) => {
        console.log(tags)

        switch (src) {
            case 'github':

                try {
                    const img = new Image()
                    img.src = `https://github.com/vstezhko/stage1-tasks/blob/assets/images/${getPartOfDayGreeting()}/${images[index]}.jpg?raw=true`
                    img.onload = () => {
                        body.style.backgroundImage = `url(${img.src})`
                    }
                } catch {
                    console.log('CATCH')
                    body.style.backgroundImage = `url(../assets/img/${getPartOfDayGreeting()}/${images[index]}.webp)`
                    throw new Error('no available image link')
                }

                break
            case 'unsplash':
                try {
                    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags || getPartOfDayGreeting()}&client_id=NIef7jSPD2FJ-EH95HzmCbxiF-i-FrsXvGf7NDmi2zs`;
                    const res =  await fetch(url)
                    const data = await res.json()

                    const img = new Image()
                    img.src = data.urls.regular
                    img.onload = () => {
                        body.style.backgroundImage = `url(${img.src})`
                    }
                } catch {
                    console.log('CATCH')
                    body.style.backgroundImage = `url(../assets/img/${getPartOfDayGreeting()}/${images[index]}.webp)`
                    throw new Error('no available image link')
                }
                break
            case 'flickr':
                try {
                    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b1555909a2026432c45153f7bbaac1ce&tags=${tags || getPartOfDayGreeting()}&extras=url_l&format=json&nojsoncallback=1`
                    const res =  await fetch(url)
                    const data = await res.json()
                    console.log('data', data)
                    const img = new Image()
                    img.src = data.photos.photo[Math.round(Math.random()*(data.photos.photo.length-1))].url_l
                    img.onload = () => {
                        body.style.backgroundImage = `url(${img.src})`
                    }
                } catch {
                    console.log('CATCH')
                    body.style.backgroundImage = `url(../assets/img/${getPartOfDayGreeting()}/${images[index]}.webp)`
                    throw new Error('no available image link')
                }
                break
        }
    }

    const handleClick = function (e) {

        if (bgSrc !== 'github') {
            changeBgImg(bgSrc)
            return
        }

        if (e.target.id === 'next') {
            if (index < 19) {
                index ++
            } else {
                index = 0
            }
        }

        if (e.target.id === 'prev') {
            if (index > 0) {
                index --
            } else {
                index = 19
            }
        }

        changeBgImg(bgSrc)
    }

    changeBgImg(bgSrc)

    changeBgBtns.forEach(btn => {
        btn.onclick = (e) => {
            handleClick(e)
        };
    })
}
