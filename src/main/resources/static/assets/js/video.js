
var theVideo = document.getElementById('myvideo'),
    theTxt = document.querySelector('.txt-cont');

function vidPlay(){
    theVideo.play();
    theVideo.setAttribute('controls', 'controls');
    theTxt.style.opacity = "0";
    theTxt.style.transition = "all .5s";
    the.style.display = "none";
}
theVideo.onended = function(){
    theTxt.style.opacity = "1";
    theTxt.style.transition = "all .5s";
    theTxt.style.display = "block";
    theVideo.load();
    theVideo.controls = false;
};
const video = document.getElementById('myvideo');
const header = document.getElementById('header');
const textContent = document.querySelector('.txt-video');

function vidPlay() {
    if (video.paused) {
        video.play();
        header.style.display = 'none';
        textContent.style.display = 'none';
    } else {
        video.pause();
    }
}

video.onended = function() {
    header.style.display = 'block';
    textContent.style.display = 'block';
};