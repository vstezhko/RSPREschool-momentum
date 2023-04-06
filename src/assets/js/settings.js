import i18next from "i18next";
import {getPartOfDayGreeting} from "./greetings";

export const settings = function(changeLang, changeBgSrc, changeTags, startTags, changeVisibleBlocks, visibleBlocks){
    console.log(startTags)

    const translationList = document.querySelectorAll('.settingsToTranslate')
    translationList.forEach(i => {
        i.textContent = `${i18next.t(i.classList[1])}`
    })


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

    let src = localStorage.getItem('bgSrc') || 'github'

    Array.from(backgroundSrcBtn.children).forEach(child => {
        child.id === src && child.classList.add('active')
    })

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
    let tags = Array.isArray(startTags) ? startTags : startTags.split(' ')
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

    // visible blocks

    const blockBtns = document.querySelectorAll(".blocks-visibility .block-btns")

    let localVisibleBlocks = visibleBlocks

    Object.keys(visibleBlocks).forEach(block => {
        if (!visibleBlocks[block]) {
            document.querySelector(`.${visibleBlocks[block]}`).style.display = 'none'
        }
    })
    const setBtnsSettings = (visBlocks) => {
        blockBtns.forEach(item => {
            Array.from(item.children).forEach(btn => {
                console.log(item.id, visBlocks[item.id])
                    if (visBlocks[item.id]) {
                        btn.children[0].textContent === 'on' && btn.classList.add('active')
                        btn.children[0].textContent === 'off' && btn.classList.remove('active')
                    } else {
                        btn.children[0].textContent === 'on' && btn.classList.remove('active')
                        btn.children[0].textContent === 'off' && btn.classList.add('active')
                    }
                })
        })
    }

    setBtnsSettings(localVisibleBlocks)


    blockBtns.forEach(item => item.addEventListener('click', (e)=>{
        console.log(e.target.textContent, item.id)
        localVisibleBlocks = {
            ...localVisibleBlocks,
            [item.id]: e.target.textContent === 'on' ? true : false
        }
        changeVisibleBlocks(localVisibleBlocks)
        setBtnsSettings(localVisibleBlocks)
    }))


    // to do list

    const addTODOBtn = document.querySelector('.add-todo-btn')
    const addTODOForm = document.querySelector('.add-todo form')
    const TODOList = document.querySelector('.todo-list')

    let todoList = [
        {
            id: "1",
            title: 'first todo item',
            completed: false
        }
    ]

    const todoTemplate = `<input type="checkbox">
                          <label for="q"></label>
                          <img src="assets/svg/remove.svg" alt="remove item"/>`

    addTODOBtn.addEventListener('click', ()=>addTODOForm.classList.toggle('active'))
    addTODOForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const formData = new FormData(addTODOForm);
        const todoItem = formData.get('todoItem');
        console.log(todoItem)
        todoList.push({
            id: `${Date.now()}`,
            title: todoItem,
            completed: false
        })

        addTODOForm.children[0].value=''

        renderTODO()
    })

    const checkTODO = (id) => {
        console.log(id)
        todoList.forEach(i => {
            if (i.id === id) {
                console.log(i)
                i.completed = !i.completed
                renderTODO()
            }
        })
    }

    const deleteTODO = id => {
        todoList = todoList.filter(i => i.id !== id)
        renderTODO()
    }

    const renderTODO = () => {
        TODOList.innerHTML = ''

        todoList.forEach(todo => {
            const newTODO = document.createElement('li')
            newTODO.classList.add('todo-item')
            newTODO.id = `${todo.id}`
            newTODO.innerHTML = todoTemplate
            newTODO.childNodes.forEach(node => {
                console.log(node.nodeName)
                if (node.nodeName === 'LABEL') {
                    node.innerHTML = `${todo.title}`
                    node.setAttribute('for', `${todo.id}`)
                    node.addEventListener('click', (e)=>{
                        checkTODO(newTODO.id)
                    })
                }
                if (node.nodeName === 'INPUT') {
                    node.checked = todo.completed
                    node.id = `${todo.id}`
                }
                if (node.nodeName === 'IMG') {
                    node.addEventListener('click', (e)=>{
                        console.log('delete', todo.id)
                        deleteTODO(todo.id)
                    })
                }
            })


            TODOList.appendChild(newTODO)
        })
    }

    renderTODO()

}