// const audio_files = ["audio-files/a.mp3", "audio-files/b.mp3", "audio-files/c.mp3", "audio-files/d.mp3", "audio-files/e.mp3", 
// "audio-files/f.mp3", "audio-files/g.mp3", "audio-files/h.mp3", "audio-files/i.mp3", "audio-files/j.mp3", "audio-files/k.mp3", 
// "audio-files/l.mp3", "audio-files/m.mp3", "audio-files/n.mp3", "audio-files/o.mp3", "audio-files/p.mp3", "audio-files/q.mp3", 
// "audio-files/r.mp3", "audio-files/s.mp3", "audio-files/t.mp3", "audio-files/u.mp3", "audio-files/v.mp3","audio-files/w.mp3", 
// "audio-files/x.mp3", "audio-files/y.mp3", "audio-files/z.mp3"];

let isPlaying = false;
let n_back_level = 1;
let audio_files = ["audio-files/a.mp3", "audio-files/b.mp3"];
let num_trials = 3;
let audio_elements = audio_files.map(file => new Audio(file));
let timeout_ids = [];



function get_is_playing(){
    return isPlaying
}

function set_is_playing(bool){
    isPlaying = bool;
}

function reset_timeout_ids(){
    timeout_ids = [];
}

function get_timeout_ids(){
    return timeout_ids;
}

function add_timeout_id(timeout_id){
    timeout_ids.push(timeout_id)
}


export {get_is_playing, set_is_playing, reset_timeout_ids, get_timeout_ids, add_timeout_id,
    n_back_level, audio_files, num_trials, audio_elements };