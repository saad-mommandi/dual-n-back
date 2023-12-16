import {audio_files} from "./audio.js";

//Tracks the recently spoken letters
let audio_position = [];
let visual_position = [];
let sk = score_keeper();
//array to store results from the scorekeeper after the trial is complete
let sk_scorecard;

const characters = audio_files.map(file => {
    return file.split('/')[1].charAt(0);
})

function audio_position_tracker(index){
    audio_position.push(characters[index]);
    console.log("audio_position_tracker: " + audio_position)
    check_match(n_back_level, 'audio');
}

function visual_position_tracker(index){
    visual_position.push(index)
    console.log("visual_position_tracker: " + visual_position)
    check_match(n_back_level, 'visual');
}

function clear_positions(){
    audio_position = [];
    visual_position = [];
    //factor out since this is scorekeeper management.
    sk_scorecard = new Array(7);
    sk_scorecard[0] = sk.get_visual_matches();
    sk_scorecard[1] = sk.get_audio_matches();
    sk_scorecard[2] = sk.get_total_matches();
    sk_scorecard[3] = sk.get_audio_hits();
    sk_scorecard[4] = sk.get_audio_misses();
    sk_scorecard[5] = sk.get_visual_hits();
    sk_scorecard[6] = sk.get_visual_misses();
    console.log('visual matches: ' + sk_scorecard[0]);
    console.log('audio matches: ' + sk_scorecard[1]);
    console.log('total matches: ' + sk_scorecard[2]);
    console.log('Audio Hits: ' + sk_scorecard[3]);
    console.log('Audio Misses: ' + sk_scorecard[4]);
    console.log('Visual Hits: ' + sk_scorecard[5]);
    console.log('Visual Misses: ' + sk_scorecard[6]);

    // reset scoprekeeper
    sk = score_keeper();

}

// TODO: positional checking 
// Checks for a general audio match
function check_match(n_back, cue_type){
    if ((cue_type == 'audio') && (audio_position[audio_position.length - 1] == audio_position[audio_position.length - 1 - n_back])){
        sk.increment_audio_match();
    }
    if ((cue_type == 'visual') && (visual_position[visual_position.length - 1] == visual_position[visual_position.length - 1 - n_back])){
        sk.increment_visual_match();
    }
}

function check_visual_hit(n_back){
    if (visual_position[visual_position.length - 1] == visual_position[visual_position.length - 1 - n_back]){
        sk.increment_visual_hits();
    } else {
        sk.increment_visual_misses();
    }
}

function check_audio_hit(n_back){
    if (audio_position[audio_position.length - 1] == audio_position[audio_position.length - 1 - n_back]){
        sk.increment_audio_hits();
    } else {
        sk.increment_audio_misses();
    }
}

//TODO: Keep this as an enclosure or build out a traditional class?
function score_keeper(){
    let audio_matches = 0;
    let visual_matches = 0;
    let total_matches = 0;
    let audio_hits = 0;
    let audio_misses = 0;
    let visual_hits = 0;
    let visual_misses = 0;

    return {
        increment_audio_match: function(){
            audio_matches++;
        },
        get_audio_matches: function(){
            return audio_matches;
        },
        increment_visual_match: function(){
            visual_matches++;
        },
        get_visual_matches: function(){
            return visual_matches;
        },
        increment_total_matches: function(){
            total_matches++;
        },
        get_total_matches: function(){
            return total_matches;
        },
        increment_audio_hits: function(){
             audio_hits++;
        },
        increment_audio_misses: function(){
            audio_misses++;
       },
        get_audio_hits: function(){
            return audio_hits;
        },
        get_audio_misses: function(){
            return audio_misses;
        },
        increment_visual_hits: function(){
            visual_hits++;
       },
       increment_visual_misses: function(){
           visual_misses++;
      },
       get_visual_hits: function(){
           return visual_hits;
       },
       get_visual_misses: function(){
           return visual_misses;
       }
    };
    
}

export {audio_position_tracker}
