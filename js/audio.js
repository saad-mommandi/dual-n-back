// const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3", "audio-files/c.mp3", "audio-files/d.mp3", "audio-files/e.mp3", 
// "audio-files/f.mp3", "audio-files/g.mp3", "audio-files/h.mp3", "audio-files/i.mp3", "audio-files/j.mp3", "audio-files/k.mp3", 
// "audio-files/l.mp3", "audio-files/m.mp3", "audio-files/n.mp3", "audio-files/o.mp3", "audio-files/p.mp3", "audio-files/q.mp3", 
// "audio-files/r.mp3", "audio-files/s.mp3", "audio-files/t.mp3", "audio-files/u.mp3", "audio-files/v.mp3","audio-files/w.mp3", 
// "audio-files/x.mp3", "audio-files/y.mp3", "audio-files/z.mp3"];

import {add_start_stop_listener, add_audio_cue_listener, add_visual_cue_listener} from '.event_listeners.js'

const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3"];
const start_stop_button = document.getElementById("start-stop");


let audio_elements = audio_files.map(file => new Audio(file));
let isPlaying = false;
let timeoutIds = []; 
let currentAudio = null;
// TODO: 
let n_back_level = 1;
let num_trials = 5;

function start_trial(){
    start_audio();
    start_visual();
}

function stop_trial(){
    stop_audio();
    stop_visual();
}

function start_visual(){
    console.log("start_visual called");
    play_random_visual_repeatedly(num_trials);

}

function play_random_visual_repeatedly(counter){
    if (counter > 0 && isPlaying) {
        play_random_visual();
        setTimeout(() => play_random_visual_repeatedly(counter - 1), 2500);  
    } else {
        stop_visual();
    }
}

function play_random_visual(){
    let randomIndex = Math.floor(Math.random() * 2);
    console.log('random visual index: ' + randomIndex);
    visual_position_tracker(randomIndex);
    grid_position =  document.getElementById('cell_' + randomIndex).firstElementChild;
    grid_position.style.backgroundColor = "blue";
    setTimeout(() => {grid_position.style.backgroundColor = "white";} ,2000);    
}

function stop_visual(){
    console.log("stop_visual called");
}

function start_audio(){
    console.log("start_audio called");

    //TODO: factor out as these are application flag related and not "start_audio() related"
    isPlaying = true;
    start_stop_button.textContent = "Stop";
    //-----
    play_random_audio_repeatedly(num_trials);
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
        stop_trial(); 
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
    //TODO: flag related - factor out 
    isPlaying = false;
    start_stop_button.textContent = "Start";
    //---------------------------------------------
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds = [];
    reset_audio();
    clear_positions();
}


function reset_audio(){
    audio_elements.forEach(audio => {
        audio.pause(); 
        audio.currentTime = 0; 
    });
}



//event listeners
document.addEventListener("DOMContentLoaded", function() {
    const start_stop_button = document.getElementById("start-stop");
    start_stop_button.addEventListener("click", () => {
        console.log("start/stop button clicked");

        if (!isPlaying){
            start_trial();
        } else {
            stop_trial();
        }
    });
    
});

document.addEventListener("DOMContentLoaded", function() {
    const start_stop_button = document.getElementById("audio-match");
    start_stop_button.addEventListener("click", () => {

        check_audio_hit(n_back_level);

    });
    
});

document.addEventListener("DOMContentLoaded", function() {
    const start_stop_button = document.getElementById("visual-match");
    start_stop_button.addEventListener("click", () => {

        check_visual_hit(n_back_level);

    });
    
});
