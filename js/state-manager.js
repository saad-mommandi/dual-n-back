let isPlaying = false;

function get_is_playing(){
    return isPlaying
}

function set_is_playing(bool){
    isPlaying = bool;
}

export {get_is_playing, set_is_playing};