import {timeAndDateModule} from "./assets/js/timeAndDate"
import {getPartOfDayGreeting, greetings} from "./assets/js/greetings";
import  {background} from "./assets/js/background";
import {weather} from "./assets/js/weather";
import {quote} from "./assets/js/ quote";
import {player} from "./assets/js/player";
import {translation} from "./assets/js/translation";
import {settings} from "./assets/js/settings";
import i18next from "i18next";


window.onload = function() {

    let lang = localStorage.getItem('lang') || 'ru'
    let bgSrc = localStorage.getItem('bgSrc') || 'github'
    let tags = localStorage.getItem('tags') || [getPartOfDayGreeting()]

    console.log(tags)


    console.log(bgSrc)
    if (bgSrc === 'github') {
        document.querySelector(".tags-wrapper").classList.add('disabled-tags')
    } else {
        document.querySelector(".tags-wrapper").classList.remove('disabled-tags')
    }


    let visibleBlocks = {
        time: true,
        date: true,
        greeting: true,
        quotes: true,
        weather: true,
        player: true,
        todo: true
    }

    const changeLang = (newLang) => {
        if(newLang === 'ru' || newLang === 'en') {
            lang = newLang

            localStorage.setItem('lang', lang)

            translation(lang)
            timeAndDateModule(lang)
            weather(lang)
            quote(lang)
            greetings()

            const translationList = document.querySelectorAll('.settingsToTranslate')
            translationList.forEach(i => {
                i.textContent = `${i18next.t(i.classList[1])}`
            })
        }
    }

    const changeBgSrc = (newSrc) => {
        if(newSrc === 'unsplash' || newSrc === 'github') {
            bgSrc = newSrc

            localStorage.setItem('bgSrc', bgSrc)

            if (bgSrc === 'github') {
                document.querySelector(".tags-wrapper").classList.add('disabled-tags')
            } else {
                document.querySelector(".tags-wrapper").classList.remove('disabled-tags')
            }

            background(bgSrc, tags)
        }
    }

    const changeTags = (newTags) => {
        tags = newTags

        localStorage.setItem('tags', tags)

        background(bgSrc, tags)
    }

    const changeVisibleBlocks = (blockSettings) => {
        visibleBlocks = blockSettings

        Object.keys(visibleBlocks).forEach(block => {
            if (!visibleBlocks[block]) {
                console.log('true', block , document.querySelector(`.${block}`))
                // console.log(document.querySelector("."+`${block}`))
                document.querySelector(`.${block}`).style.display = 'none'
            }
            else {
                console.log('false', block,  document.querySelector(`.${block}`))
                document.querySelector(`.${block}`).style.display = 'block'
            }
        })
    }
    translation(lang)
    settings(changeLang, changeBgSrc, changeTags, tags, changeVisibleBlocks, visibleBlocks)
    timeAndDateModule(lang)
    greetings()
    background(bgSrc, tags)
    weather(lang)
    quote(lang)
    player()
}






