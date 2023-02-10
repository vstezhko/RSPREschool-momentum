import {timeAndDateModule} from "./assets/js/timeAndDate"
import {greetings} from "./assets/js/greetings";
import  {background} from "./assets/js/background";
import {weather} from "./assets/js/weather";
import {quote} from "./assets/js/ quote";
import {player} from "./assets/js/player";
import {translation} from "./assets/js/translation";


window.onload = function() {

    let lang = 'en'

    timeAndDateModule(lang)
    translation(lang)
    greetings()
    background()
    weather(lang)
    quote(lang)
    player()
}






