var arr=[
    {sname:"See You Again",url:"./songs/seeyouagain.mp3",img:"./images/seeyouagain.png"},
    {sname:"Harleys in Hawaii",url:"./songs/harleysinhawaii.mp3",img:"./images/harleysinhawaii.jpeg"},
    {sname:"Watermelon Sugar",url:"./songs/watermelonsugar.mp3",img:"./images/watermelonsugar.png"},
    {sname:"Best Part",url:"./songs/bestpart.mp3",img:"./images/bestpart.jpg"},
    {sname:"iSpy",url:"./songs/ispy.mp3",img:"./images/ispy.png"}
]

var allsongs=document.querySelector('#all-songs');
var albumart=document.querySelector('#left');
var audio =new Audio();
var selectedsong=0;
var play=document.querySelector("#play");
var backward=document.querySelector("#backward");
var forward=document.querySelector("#forward");
var seekbar=document.querySelector('#seekbar');
var volumeControl=document.querySelector('#volume');
var currentTimeDisplay=document.querySelector('#current-time');
var totalTimeDisplay=document.querySelector('#tota-time');

function formatTime(seconds){
    const minutes=Math.floor(seconds/60);
    const secs=Math.floor(seconds%60);
    return `${minutes}:${secs<10 ? '0':''}${secs}`;

}

function addsongs(){
    var clutter="";
    arr.forEach(function(song,index){
        clutter +=`<div class="song-card" data-index=${index}>
                    <div class="part1">
                        <img src="${song.img}">
                        <h2>${song.sname}</h2>
                    </div>
                    <h6>3:20</h6>
                </div>`;
    })
    allsongs.innerHTML=clutter;
    audio.src=arr[selectedsong].url;
    albumart.style.backgroundImage=`url(${arr[selectedsong].img})`
    seekbar.value=0;
    currentTimeDisplay.textContent='0.00';

    //Adding event listener for song cards
    document.querySelectorAll('.song-card').forEach(card=>{
        card.addEventListener('click',function(){
            selectedsong=parseInt(this.getAttribute('data-index'));
            addsongs();
            audio.play();
        });

        if(parseInt(card.getAttribute('data-index'))===selectedsong){
            card.classList.add('active');

        }else{
            card.classList.remove('active');
        }
    });
    audio.addEventListener("loadedmetadata",function(){
        totalTimeDisplay.textContent=formatTime(audio.duration);
    })
}
addsongs();

var flag=0;
play.addEventListener('click',function(){
    if(flag===0){
        play.innerHTML=`<i class="ri-pause-fill"></i>`
        addsongs()
        audio.play()
        flag=1
    }else{
        play.innerHTML=`<i class="ri-play-fill"></i>`
        addsongs()
        audio.pause()
        flag=0
    }
});
forward.addEventListener('click',function(){
    if(selectedsong<arr.length-1){
        selectedsong++
        addsongs()
        audio.play()
    }
});
backward.addEventListener('click',function(){
    if(selectedsong>0){
        selectedsong--
        addsongs()
        audio.play()
    }
});

audio.addEventListener('timeupdate',function(){
    var value=(audio.currentTime/audio.duration)*100;
    seekbar.value=value;
    currentTimeDisplay.textContent=formatTime(audio.currentTime);
})

seekbar.addEventListener('input',function(){
    var seekTo = audio.duration*(seekbar.value/100);
    audio.currentTime=seekTo;
});

volumeControl.addEventListener("input",function(){
    audio.volume=volumeControl.value/100;
});