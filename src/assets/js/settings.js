import {getPartOfDayGreeting} from "./greetings";

export const settings = function(changeLang, changeBgSrc, changeTags, startTags){
    console.log(startTags)

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


    // background tags

    const addTagWrapper = document.querySelector(".add-tag")
    const addTagInput = document.querySelector(".add-tag form")
    const appliedTagsWrapper = document.querySelector(".applied")
    let tags = startTags
    console.log(tags)

    const addNewTag = (text) => {
        let newTag = document.createElement('li')
        newTag.innerHTML = `<div class="icon-tag"></div> <p>${text}</p>`
        newTag.addEventListener('click', ()=>{
            tags = tags.filter(item => item !== newTag.children[1].textContent)
            changeTags(tags.join(' '))
            newTag.remove()
        })
        tags.push(text)
        changeTags(tags.join(' '))
        appliedTagsWrapper.insertBefore(newTag, appliedTagsWrapper.children[1])
    }

    addTagWrapper.addEventListener('click', (e)=>{

        if (e.target.localName === "img") {
            addTagWrapper.classList.toggle("active")
            }
        })

    popup.addEventListener('click', (e)=>{

        if (e.target.classList.contains('popup') || e.target.classList.contains('applied')) {
            addTagWrapper.classList.remove('active')
            addTagInput.children[0].value = ''
        }
    })

    addTagInput.addEventListener('submit', (e)=>{

        e.preventDefault()
        console.log('submit')
        addNewTag(addTagInput.children[0].value)
        addTagInput.children[0].value = ''
    })

    tags.forEach(tag => {
        let newTag = document.createElement('li')
        newTag.innerHTML = `<div class="icon-tag"></div> <p>${tag}</p>`
        newTag.addEventListener('click', ()=>{
            tags = tags.filter(item => item !== newTag.children[1].textContent)
            changeTags(tags.join(' '))
            newTag.remove()
        })
        appliedTagsWrapper.insertBefore(newTag, appliedTagsWrapper.children[1])
    })
}