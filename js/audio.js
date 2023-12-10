// const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3", "audio-files/c.mp3", "audio-files/d.mp3", "audio-files/e.mp3", 
// "audio-files/f.mp3", "audio-files/g.mp3", "audio-files/h.mp3", "audio-files/i.mp3", "audio-files/j.mp3", "audio-files/k.mp3", 
// "audio-files/l.mp3", "audio-files/m.mp3", "audio-files/n.mp3", "audio-files/o.mp3", "audio-files/p.mp3", "audio-files/q.mp3", 
// "audio-files/r.mp3", "audio-files/s.mp3", "audio-files/t.mp3", "audio-files/u.mp3", "audio-files/v.mp3","audio-files/w.mp3", 
// "audio-files/x.mp3", "audio-files/y.mp3", "audio-files/z.mp3"];

const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3","audio-files/c.mp3"];
const start_stop_button = document.getElementById("start-stop");


let audio_elements = audio_files.map(file => new Audio(file));
let isPlaying = false;
let timeoutIds = []; 
let currentAudio = null;

function start_audio(){
    console.log("start_audio called");
    isPlaying = true;
    start_stop_button.textContent = "Stop";
    play_random_audio_repeatedly(3);
}

function play_random_audio_repeatedly(counter) {
    if (counter > 0 && isPlaying) { 
        console.log(counter);
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = play_random_audio();
        let timeoutId = setTimeout(() => play_random_audio_repeatedly(counter - 1), 2500);
        timeoutIds.push(timeoutId);    
    } else {
        stop_audio(); 
    }
}

function play_random_audio(){
    let randomIndex = Math.floor(Math.random() * audio_elements.length);
    let audio = audio_elements[randomIndex];
    audio_position_tracker(randomIndex);
    audio.play();
    return audio;
}


function stop_audio(){
    console.log("stop_audio called");
    isPlaying = false;
    start_stop_button.textContent = "Start";

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds = [];
    reset_audio();
}


function reset_audio(){
    audio_elements.forEach(audio => audio.currentTime=0);
}



//event listener
document.addEventListener("DOMContentLoaded", function() {
    const start_stop_button = document.getElementById("start-stop");
    start_stop_button.addEventListener("click", () => {
        console.log("button clicked");

        if (!isPlaying){
            start_audio();
        } else {
            stop_audio();
        }
    });
    
});