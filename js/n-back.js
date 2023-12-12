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
    check_match(n_back_level);
}

function clear_positions(){
    audio_position = [];
    visual_position = [];
    //factor out since this is scorekeeper management.
    sk_scorecard = new Array(3);
    sk_scorecard[0] = sk.get_total_matches();
    sk_scorecard[1] = sk.get_audio_hits();
    sk_scorecard[2] = sk.get_audio_misses();
    console.log('total matches: ' + sk_scorecard[0]);
    console.log('Audio Hits: ' + sk_scorecard[1]);
    console.log('Audio Misses: ' + sk_scorecard[2]);

    // reset scoprekeeper
    sk = score_keeper();

}

// TODO: positional checking 
function check_match(n_back){
    if (audio_position[audio_position.length - 1] == audio_position[audio_position.length - 1 - n_back]){
        sk.increment_total_matches();
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
    let total_matches = 0;
    let audio_hits = 0;
    let audio_misses = 0;

    return {
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
        }
    };
    
}
