import {timeAndDateModule} from "./assets/js/timeAndDate"
import {greetings} from "./assets/js/greetings";
import  {background} from "./assets/js/background";
import {weather} from "./assets/js/weather";
import {quote} from "./assets/js/ quote";
import {player} from "./assets/js/player";
import {translation} from "./assets/js/translation";
import {settings} from "./assets/js/settings";


window.onload = function() {

    let lang = 'ru'
    let bgSrc = 'local'

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
            background(bgSrc)
        }
    }

    settings(changeLang, changeBgSrc)
    timeAndDateModule(lang)
    translation(lang)
    greetings()
    background(bgSrc)
    weather(lang)
    quote(lang)
    player()
}






