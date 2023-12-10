//Tracks the recently spoken letters
let audio_position = [];
let visual_position = [];
let sk = score_keeper();

const characters = audio_files.map(file => {
    return file.split('/')[1].charAt(0);
})

function audio_position_tracker(index){
    audio_position.push(characters[index]);
    console.log("audio_position_tracker: " + audio_position)
    check_match(n_back_level);
}

function check_match(n_back){
    

    if (audio_position[audio_position.length - 1] == audio_position[audio_position.length - 1 - n_back]){
        console.log("sk called")
        sk.increment_total_matches();
    }
}

function clear_positions(){
    audio_position = [];
    visual_position = [];
    console.log(sk.get_total_matches());

}

function score_keeper(){
    let total_matches = 0

    return {
        increment_total_matches: function(){
            total_matches++
        },
        get_total_matches: function(){
            return total_matches
        }
    };
    
}
