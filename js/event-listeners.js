import { get_is_playing, n_back_level} from "./state-manager.js";
import {start_trial, stop_trial} from "./cues.js";
import { check_audio_hit, check_visual_hit } from "./n-back.js";

const start_stop_button = document.getElementById("start-stop");
const audio_button = document.getElementById("audio-match");
const visual_button = document.getElementById("visual-match");



function add_start_stop_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        start_stop_button.addEventListener("click", () => {
            console.log("start/stop button clicked");
    
            if (!get_is_playing()){
                start_trial();
                start_stop_button.textContent = "Stop";
            } else {
                stop_trial();
                start_stop_button.textContent = "Start";
            }
        });
        
    });
}


function add_audio_cue_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        audio_button.addEventListener("click", () => {
    
            check_audio_hit(n_back_level);
    
        });
        
    });
}

function add_visual_cue_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        visual_button.addEventListener("click", () => {
    
            check_visual_hit(n_back_level);
    
        });
        
    });
}

export {add_start_stop_listener, add_audio_cue_listener, add_visual_cue_listener};
