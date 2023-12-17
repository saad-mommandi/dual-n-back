import {get_is_playing} from './state-manager.js';
import { visual_position_tracker} from './n-back.js';


function start_visual(num_trials, on_trial_end){
    console.log("start_visual called");
    play_random_visual_repeatedly(num_trials, on_trial_end);

}

function play_random_visual_repeatedly(counter, on_trial_end){
    if (counter > 0 && get_is_playing()) {
        play_random_visual();
        setTimeout(() => play_random_visual_repeatedly(counter - 1, on_trial_end), 2500);  
    } else if (counter == 0 ){
        on_trial_end();
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


export {start_visual, stop_visual};
