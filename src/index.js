import {timeAndDateModule} from "./assets/js/timeAndDate"
import {getPartOfDayGreeting, greetings} from "./assets/js/greetings";
import  {background} from "./assets/js/background";
import {weather} from "./assets/js/weather";
import {quote} from "./assets/js/ quote";
import {player} from "./assets/js/player";
import {translation} from "./assets/js/translation";
import {settings} from "./assets/js/settings";


window.onload = function() {

    let lang = 'ru'
    let bgSrc = 'local'
    let tags = []
    tags.push(getPartOfDayGreeting())
    console.log(tags)

    const changeLang = (newLang) => {
        if(newLang === 'ru' || newLang === 'en') {
            lang = newLang

            translation(lang)
            timeAndDateModule(lang)
            weather(lang)
            quote(lang)
            greetings()
        }
    }

    const changeBgSrc = (newSrc) => {
        if(newSrc === 'unsplash' || newSrc === 'flickr' || newSrc === 'local') {
            bgSrc = newSrc
            console.log(bgSrc)
            background(bgSrc, tags)
        }
    }

    const changeTags = (newTags) => {
        tags = newTags
        console.log(tags)
        background(bgSrc, tags)
    }

    settings(changeLang, changeBgSrc, changeTags, tags)
    timeAndDateModule(lang)
    translation(lang)
    greetings()
    background(bgSrc, tags)
    weather(lang)
    quote(lang)
    player()
}






