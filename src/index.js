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

    settings(changeLang)
    timeAndDateModule(lang)
    translation(lang)
    greetings()
    background()
    weather(lang)
    quote(lang)
    player()
}






