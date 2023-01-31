import {timeAndDateModule} from "./assets/js/timeAndDate"
import {greetings} from "./assets/js/greetings";
import  {background} from "./assets/js/background";
import {weather} from "./assets/js/weather";
import {quote} from "./assets/js/ quote";


window.onload = function() {
    timeAndDateModule()
    greetings()
    background()
    weather()
    quote()
}






