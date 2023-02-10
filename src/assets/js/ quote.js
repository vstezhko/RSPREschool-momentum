export function quote(lang){

    const quote = document.querySelector('.quote')
    const author = document.querySelector('.author')
    const changeQuote = document.querySelector('.change-quote')

    changeQuote.addEventListener('click', ()=>{
        getQuotes();
    })
    async function getQuotes() {
        const quotes = 'assets/js/data.json';
        const res = await fetch(quotes);
        const allQuates = await res.json();
        const data = allQuates[lang]

        let quoteToShow = data[Math.floor(data.length*Math.random())]
        quote.textContent = quoteToShow['text']
        author.textContent = quoteToShow['author']
    }
    getQuotes();
}