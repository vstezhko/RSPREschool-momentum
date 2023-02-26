import i18next from 'i18next';
export const translation = async function(lang){

    await i18next.init({
        lng: localStorage.getItem('lang') || 'ru', // if you're using a language detector, do not define the lng option
        debug: true,
        resources: {
            en: {
                translation: {
                    "evening": "Good evening",
                    "night": "Good night",
                    "morning": "Good morning",
                    "afternoon": "Good afternoon",
                    "speed": "m/s",
                    "windSpeed": "Wind speed",
                    "humidity": "Humidity",
                    "enterName": "[Enter name]",
                    "Time": "Time",
                    "Date": "Date",
                    "Greetings": "Greetings",
                    "Quote": "Quote of the day",
                    "Weather": "Weather forecast",
                    "Player": "Player",
                    "TODO": "To Do list"
                }
            },
            ru: {
                translation: {
                    "evening": "Добрый вечер",
                    "night": "Доброй ночи",
                    "morning": "Доброе утро",
                    "afternoon": "Добрый день",
                    "speed": "м/с",
                    "windSpeed": "Скорость ветра",
                    "humidity": "Влажность",
                    "enterName": "[Введите имя]",
                    "Time": "Время",
                    "Date": "Дата",
                    "Greetings": "Приветствие",
                    "Quote": "Цитата дня",
                    "Weather": "Прогноз погоды",
                    "Player": "Плеер",
                    "TODO": "To Do список"
                }
            }
        }
    }
    )

        document.querySelector(".greeting-container input").placeholder = i18next.t("enterName")
}