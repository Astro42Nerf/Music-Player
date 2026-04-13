const API = "http://localhost:3000"

const list = document.getElementById("songList")
const audio = document.getElementById("audio")

const title = document.getElementById("title")
const artist = document.getElementById("artist")

const current = document.getElementById("current")
const duration = document.getElementById("duration")

const progress = document.getElementById("progress")

let songs = []
let index = 0

async function loadSongs(){

let res = await fetch(API + "/songs")
songs = await res.json()

renderSongs()

}

function renderSongs(){

list.innerHTML=""

songs.forEach((song,i)=>{

let li=document.createElement("li")

li.textContent = song.name + " - " + song.artist

li.onclick=()=>{

index=i
playSong()

}

list.appendChild(li)

})

}

function playSong(){

let song=songs[index]

audio.src = API + "/uploads/" + song.file

title.textContent = song.name
artist.textContent = song.artist

audio.play()

}

audio.addEventListener("timeupdate",()=>{

let cur=audio.currentTime
let dur=audio.duration

progress.value = (cur/dur)*100 || 0

current.textContent=format(cur)
duration.textContent=format(dur)

})

progress.oninput=()=>{

audio.currentTime=(progress.value/100)*audio.duration

}

function format(t){

let m=Math.floor(t/60)
let s=Math.floor(t%60)

if(s<10)s="0"+s

return m+":"+s

}

loadSongs()