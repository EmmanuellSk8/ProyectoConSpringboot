const video = document.getElementById('myvideo');
const header = document.getElementById('header');
const textContent = document.querySelector('.txt-video');

// Define la función vidPlay() para reproducir el video desde el segundo específico.
function vidPlay() {
    if (video.paused) {
        // Establece el segundo específico desde el cual deseas iniciar la reproducción.
        video.currentTime = 6; // Cambia 10 al segundo que desees
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