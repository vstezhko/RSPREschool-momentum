export const settings = function(changeLang, changeBgSrc){

    const settingsBtn = document.querySelector(".settings")
    const popup = document.querySelector(".popup")
    settingsBtn.addEventListener('click', ()=>{
        popup.classList.toggle("opened")
    })

    // language

    const langBtn = document.querySelector(".language .btn-wrapper")
    langBtn.addEventListener('click', (e)=>{
        changeLang(e.target.id)
        Array.from(langBtn.children).forEach(child => {
            child.classList.remove("active")
        })
        e.target.classList.add('active')
    })

    // background source

    const backgroundSrcBtn = document.querySelector(".background-source .btn-wrapper")
    backgroundSrcBtn.addEventListener('click', (e)=>{
        changeBgSrc(e.target.id)
        Array.from(backgroundSrcBtn.children).forEach(child => {
            child.classList.contains("active") && child.classList.remove('active')
        })
        e.target.classList.add('active')
    })

}