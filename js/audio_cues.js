import { get_is_playing, set_is_playing, audio_elements, reset_timeout_ids, get_timeout_ids, add_timeout_id } from "./state-manager.js";
import { audio_position_tracker} from './n-back.js';


function start_audio(num_trials, on_trial_end){
    console.log("start_audio called");

    play_random_audio_repeatedly(num_trials, on_trial_end);
}

function play_random_audio_repeatedly(counter, on_trial_end) {
    let currentAudio = null;
    if (counter > 0 && get_is_playing()) { 
        console.log(counter);

        currentAudio = play_random_audio();
        let timeout_id = setTimeout(() => play_random_audio_repeatedly(counter - 1, on_trial_end), 2500);
        add_timeout_id(timeout_id)  
    } else if (counter == 0 ){
        on_trial_end();
    }
}

function play_random_audio(){
    let randomIndex = Math.floor(Math.random() * audio_elements.length);
    let audio = audio_elements[randomIndex];
    audio_position_tracker(randomIndex);
    audio.play();
    return audio;
}


function stop_audio(currentAudio){
    console.log("stop_audio called");

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    if (get_timeout_ids() != undefined){
        console.log(get_timeout_ids());
        get_timeout_ids().forEach(timeoutId => clearTimeout(timeoutId));
    }

    reset_audio();
}


function reset_audio(){
    audio_elements.forEach(audio => {
        audio.pause(); 
        audio.currentTime = 0; 
    });
    reset_timeout_ids();
}

export {start_audio, stop_audio};