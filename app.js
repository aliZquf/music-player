
let title = document.querySelector("#title");
let img = document.querySelector("#img");
let range = document.querySelector("#range");
let btns = document.querySelectorAll("i")
let preBtn = document.querySelector("#prev-btn")
let nextBtn = document.querySelector("#next-btn")
let playBtn = document.querySelector("#play-btn")
//////////arry for color///////////
const hex = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
]
//////////creat hex code for color///////////
let hexColor='#'
    for( let i =0; i<6; i++){
        hexColor += hex[getrandomNumber()]
    }
//////////arry of musics///////////
const musics = [
    ////for example////
    {
        name: "Love story",
        img: "cover/Love story.jpg",
        audio : new Audio("music/Love story.mp3")
    },
    {
        name : "The Witcher",
        img: "cover/The Witcher.jpg",
        audio : new Audio("music/The Witcher.mp3")
    },
    {
        name: "Fly Me to the Moon",
        img: "cover/Fly Me to the Moon.jpg",
        audio : new Audio("music/Fly Me to the Moon.mp3")
    },
    {
        name: "Jailhouse",
        img: "cover/Jailhouse.jpg",
        audio : new Audio("music/Jailhouse.mp3")
    },

]

let index = 0
loadMusic()

function update() {
    audio.addEventListener("canplay",()=>{
        range.max = audio.duration
    })
    
    audio.addEventListener("timeupdate",()=>{
        range.value = audio.currentTime

       
    })
    
    range.addEventListener("input",()=>{
        audio.currentTime = range.value
    })
   
  
}

update()

playBtn.addEventListener("click",()=>{
    if(audio.paused){
        audio.play()
        playBtn.classList.replace("fa-play","fa-pause")
        img.style.animationPlayState = "running"
       
        
    }
    else{
        audio.pause()
        playBtn.classList.replace("fa-pause","fa-play")
        img.style.animationPlayState = "paused"

     
    }
})

nextBtn.addEventListener("click",()=>{
    nextMusic()
    update()
    glowAnimation()
    playBtn.classList.replace("fa-play","fa-pause")
    img.style.animationPlayState = "running"

})
preBtn.addEventListener("click",()=>{
    prevMusic()
    update()
    glowAnimation()
    playBtn.classList.replace("fa-play","fa-pause")
    img.style.animationPlayState = "running"
})

function getrandomNumber(){
    return (Math.floor(Math.random() * hex.length))
}

function loadMusic(){
title.innerText = musics[index].name
audio = musics[index].audio
img.src = musics[index].img
update()

audio.addEventListener("ended",()=>{
    nextMusic()
    glowAnimation()
})



}

function nextMusic(){
    audio.pause()
    range.value = 0 
    audio.currentTime = 0

    if(index == musics.length - 1){
        index = 0
        
    }
    else{
       index +=1
       
    }

loadMusic()
audio.play()
}
function prevMusic(){
    audio.pause()
    range.value = 0 
    audio.currentTime = 0
    if(index == 0 ){
        index = musics.length - 1
    }else{
        index -= 1
    }
    loadMusic()
    audio.play()
}

function glowAnimation(){
    
   
    var hexColor='#'
    for( let i =0; i<6; i++){
        hexColor += hex[getrandomNumber()]
    }
    
btns.forEach(function(btn){
    btn.addEventListener("mousemove",(e)=>{
       
        e.currentTarget.style.color=hexColor
    })
    btn.addEventListener("mouseleave",(e)=>{
        e.currentTarget.style.color = "black"
    })
    
})

    img.animate([{
        boxShadow: ` 0px 0px 20px 0px ${hexColor}`},
        {
            boxShadow: `0px 0px 20px 15px ${hexColor}`}
        
    ],{
        duration: 1000,
        iterations: Infinity,
        direction:"alternate",
        playbackRate:"linear",
    }
    )
}
