import { set_is_playing, get_is_playing,num_trials} from './state-manager.js';
import { start_visual, stop_visual} from './visual_cues.js';
import { start_audio, stop_audio } from './audio_cues.js';
import { clear_positions } from './n-back.js';


let n_back_level = 1;

function start_trial(){
    set_is_playing(true);

    const on_trial_end = () => {
        if (get_is_playing()) {
            stop_trial();
            console.log("ontrialend called")
        }
    };


    start_audio(num_trials, on_trial_end);
    start_visual(num_trials, on_trial_end);
}

function stop_trial(){
    set_is_playing(false);
    stop_audio();
    stop_visual();
    clear_positions();
}



export {start_trial, stop_trial};