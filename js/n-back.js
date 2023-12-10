//Tracks the recently spoken letters
let audio_position = [];
let visual_position = [];

const characters = audio_files.map(file => {
    return file.split('/')[1].charAt(0);
})

function audio_position_tracker(index){
    audio_position.push(characters[index]);
    console.log("audio_position_tracker: " + audio_position)
}

function clear_positions(){
    audio_position = [];
    visual_position = [];
}