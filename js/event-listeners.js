function add_start_stop_listener(){
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
}


function add_audio_cue_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        const start_stop_button = document.getElementById("audio-match");
        start_stop_button.addEventListener("click", () => {
    
            check_audio_hit(n_back_level);
    
        });
        
    });
}

function add_visual_cue_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        const start_stop_button = document.getElementById("visual-match");
        start_stop_button.addEventListener("click", () => {
    
            check_visual_hit(n_back_level);
    
        });
        
    });
}
n
export {add_start_stop_listener, add_audio_cue_listener, add_visual_cue_listener};
