// const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3", "audio-files/c.mp3", "audio-files/d.mp3", "audio-files/e.mp3", 
// "audio-files/f.mp3", "audio-files/g.mp3", "audio-files/h.mp3", "audio-files/i.mp3", "audio-files/j.mp3", "audio-files/k.mp3", 
// "audio-files/l.mp3", "audio-files/m.mp3", "audio-files/n.mp3", "audio-files/o.mp3", "audio-files/p.mp3", "audio-files/q.mp3", 
// "audio-files/r.mp3", "audio-files/s.mp3", "audio-files/t.mp3", "audio-files/u.mp3", "audio-files/v.mp3","audio-files/w.mp3", 
// "audio-files/x.mp3", "audio-files/y.mp3", "audio-files/z.mp3"];

import { get_is_playing,set_is_playing,audio_files } from './state-manager.js';
import { audio_position_tracker, visual_position_tracker, clear_positions} from './n-back.js';

//export const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3"];
const start_stop_button = document.getElementById("start-stop");


let audio_elements = audio_files.map(file => new Audio(file));
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
    if (counter > 0 && get_is_playing()) {
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
    let grid_position =  document.getElementById('cell_' + randomIndex).firstElementChild;
    grid_position.style.backgroundColor = "blue";
    setTimeout(() => {grid_position.style.backgroundColor = "white";} ,2000);    
}

function stop_visual(){
    console.log("stop_visual called");
}

function start_audio(){
    console.log("start_audio called");

    //TODO: factor out as these are application flag related and not "start_audio() related"
    set_is_playing(true);
    start_stop_button.textContent = "Stop";
    //-----
    play_random_audio_repeatedly(num_trials);
}

function play_random_audio_repeatedly(counter) {
    if (counter > 0 && get_is_playing()) { 
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
    set_is_playing(false);
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


export {start_trial, stop_trial};