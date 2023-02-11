export const settings = function(changeLang){

    const settingsBtn = document.querySelector(".settings")
    const popup = document.querySelector(".popup")
    settingsBtn.addEventListener('click', ()=>{
        popup.classList.toggle("opened")
    })

    // language

    const langBtn = document.querySelector(".btn-wrapper")
    langBtn.addEventListener('click', (e)=>{
        changeLang(e.target.id)
        Array.from(langBtn.children).forEach(child => {
            child.classList.remove("active")
        })
        e.target.classList.add('active')
    })


}