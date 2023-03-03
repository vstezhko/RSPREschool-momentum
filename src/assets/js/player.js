import playlist from "../sounds/playlist";

export function player(){
    const playListNode = document.querySelector('.play-list')
    const progressBar = document.querySelector('input.progress')
    const progressTimeCurr = document.querySelector('.curr')
    const progressTimeMax = document.querySelector('.max')
    const trackName = document.querySelector('.track-name')
    const volumeBar = document.querySelector('input.volume')
    const volumeOff = document.querySelector('.volume-off')
    const volumeUp = document.querySelector('.volume-up')
    const playlistBtn = document.querySelector('.playlist')


    let isMusicOn = false
    let isSoundOn = true
    let isPlayListShown = false

    playlistBtn.addEventListener('click', ()=>{
        playlistBtn.classList.toggle('active')
        playListNode.classList.toggle('shown')
    })

    playlist.forEach((item, index) => {
        const audioItem = document.createElement('li')
        audioItem.classList.add('audio-item')
        audioItem.id = `${index}`
        audioItem.textContent = item.title
        playListNode.appendChild(audioItem)
        audioItem.addEventListener('click', (e)=>onChangeAudio(audioItem.id,e))
    })


    const playBtn = document.querySelector('.play')
    const pauseBtn = document.querySelector('.pause')
    const nextBtn = document.querySelector('.play-next')
    const prevBtn = document.querySelector('.play-prev')
    let audio = new Audio()
    audio.volume = 0.7
    let audioIndex = 0
    let currentAudio = playlist[audioIndex]
    audio.src = currentAudio.src;
    audio.currentTime = 0;
    handleProgressOnChangeAudio()

    trackName.textContent = playListNode.children[0].textContent

    function setActiveSong(){
        Array.from(playListNode.children).forEach(item => {
            if(+item.id === audioIndex) {
                item.classList.add('active')
                trackName.textContent = item.textContent
            } else {
                item.classList.remove('active')
            }
        })
    }

    function changeCurrentAudio(){
        currentAudio = playlist[audioIndex]
        audio.src = currentAudio.src;
        audio.currentTime = 0;
    }

    function onChangeAudio(id,e){
        if (audioIndex === +id && e.target.classList.contains('active')) {
            pauseAudio()
            return
        }

        audioIndex = +id
        changeCurrentAudio()
        playAudio()
    }

    function onNextAudio() {
        if (audioIndex === playlist.length - 1) {
            audioIndex = 0
        } else {
            audioIndex = +audioIndex + 1
        }
        changeCurrentAudio()
        playAudio()
    }
    function onPrevAudio() {
        if (audioIndex === 0) {
            audioIndex = playlist.length-1
        } else {
            audioIndex = +audioIndex - 1
        }
        changeCurrentAudio()
        playAudio()
    }

    nextBtn.addEventListener('click', onNextAudio)
    prevBtn.addEventListener('click', onPrevAudio)



    const playAudio = () => {
        audio.play();
        isMusicOn = true
        pauseBtn.style.display = 'block'
        playBtn.style.display = 'none'
        setActiveSong()
        const updateProgressBarTimer = setInterval(()=> {
            if (isMusicOn) {
                handleProgressOnChangeAudio()
            } else {
                clearInterval(updateProgressBarTimer)
            }

            if(Math.round(audio.currentTime)>=progressBar.max) {
                onNextAudio()
            }
        }, 500)
    }
    function pauseAudio() {
        audio.pause();
        isMusicOn = false
        playBtn.style.display = 'block'
        pauseBtn.style.display = 'none'
        Array.from(playListNode.children).forEach(item => {
            item.classList.remove('active')
        })
    }

    playBtn.addEventListener('click', playAudio)
    pauseBtn.addEventListener('click', pauseAudio)


    function handleProgressOnChangeAudio(){
        progressBar.value = Math.round(audio.currentTime)
        let duration = playlist[audioIndex].duration.split(':')
        progressBar.max = +(duration[0]*60 + +duration[1])
        progressTimeCurr.textContent = `${Math.trunc(audio.currentTime/60).toString().padStart(2, '0')}:${(audio.currentTime%60).toFixed(0).toString().padStart(2, '0')}`
        progressTimeMax.textContent = playlist[audioIndex].duration
    }

    progressBar.addEventListener('change', ()=>{
        audio.currentTime = progressBar.value
    })

    volumeBar.addEventListener('change', ()=>{
        audio.volume = volumeBar.value/100
    })

    let prevVolume

    volumeOff.addEventListener('click', ()=>{
        volumeOff.style.display = 'none'
        volumeUp.style.display = 'block'
        isSoundOn = false
        prevVolume = audio.volume
        handleVolumeProgressBar()
    })

    volumeUp.addEventListener('click', ()=>{
        volumeOff.style.display = 'block'
        volumeUp.style.display = 'none'
        isSoundOn = true
        audio.volume = prevVolume
        handleVolumeProgressBar()
    })

    function handleVolumeProgressBar(){
        if (isSoundOn) {
            volumeBar.disabled = false
            volumeBar.value = audio.volume*100
        } else {
            volumeBar.disabled = true
            audio.volume = 0
            volumeBar.value = 0
        }
        volumeBar.max = 100
    }



    handleVolumeProgressBar()
}