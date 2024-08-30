<script setup>
import { ref, onBeforeUnmount } from 'vue';
import logo from '@/assets/img/logo.jfif';

// Create a 3x3 grid initialized to false (no images shown)
const grid = ref(Array(9).fill(false));
let intervalId = null;
const maxRuns = 5;  // Maximum number of times the interval should run
const runCount = ref(0);  // Counter to track the number of runs
const matchBack = ref(1);  // Number of positions back to check for a match, default is 1 (last position)
const history = ref([]); // Array to store the history of grid positions and letters spoken
const isMatch = ref(false); // State to track if there was a match for flashing effect
const isRunning = ref(false);

const matchResults = ref([]);

const userInput = ref([false, false]);
const userResults = ref([]);
// Dynamically import the audio files for each letter of the alphabet
const letterSounds = [
  { letter: 'A', sound: new Audio(new URL('@/assets/sounds/a.mp3', import.meta.url)) },
  { letter: 'H', sound: new Audio(new URL('@/assets/sounds/h.mp3', import.meta.url)) },
  { letter: 'J', sound: new Audio(new URL('@/assets/sounds/j.mp3', import.meta.url)) },
  { letter: 'N', sound: new Audio(new URL('@/assets/sounds/n.mp3', import.meta.url)) },
  { letter: 'O', sound: new Audio(new URL('@/assets/sounds/o.mp3', import.meta.url)) },
  { letter: 'V', sound: new Audio(new URL('@/assets/sounds/v.mp3', import.meta.url)) }
];

// Function to play a random letter sound and return the letter
function playRandomLetterSound() {
  const randomIndex = Math.floor(Math.random() * letterSounds.length);
  const letterObj = letterSounds[randomIndex];
  letterObj.sound.play();
  return letterObj.letter;
}

function playRandomImage(){
  const randomIndex = Math.floor(Math.random() * 9);
  grid.value[randomIndex] = true;
  return randomIndex;
}

function matchPosition(){
  userInput.value[0] = true;
}

function matchSound(){
  userInput.value[1] = true;
}

// Function to show an image in a random position
function trialRun() {
  if (runCount.value > 0){
    userResults.value.push(userInput.value.slice())
    console.log(userInput.value.slice());
    userInput.value[0] = false;
    userInput.value[1] = false;
  }
  console.log('trialRun()');
  grid.value = Array(9).fill(false);


  let positionMatch = false;
  let audioMatch = false;

  // Play a random letter sound and get the letter
  const position = playRandomImage();
  const letter = playRandomLetterSound();

  // Determine which position back to check based on the input
  const positionToCheck = history.value.length - matchBack.value;

  if (positionToCheck >= 0) {
    const entryToCheck = history.value[positionToCheck];
    if (entryToCheck) {
      if (entryToCheck[0] === position) {
        positionMatch = true;
      }
      if (entryToCheck[1] === letter) {
        audioMatch = true;
      }
      if (positionMatch || audioMatch) {
        isMatch.value = true;
        setTimeout(() => {
          isMatch.value = false;
        }, 300);
      }
    }
  }

  // Store the grid position and corresponding letter in the history array
  history.value.push([position, letter]);
  //console.log('History:', history.value.slice());

  // Push the match result into the matchResults array
  matchResults.value.push([positionMatch, audioMatch]);
  console.log('Match Results:', matchResults.value.slice());


  // Increment the run count
  runCount.value++;

  //Handle the final run differently
  if (runCount.value >= maxRuns) {
     setTimeout(() => {
      clearGrid();
     }, 2400);
  }


}



// Function to start the interval
function startInterval() {
  if (!intervalId) {
    history.value = [];  // Clear the history array to start fresh
    matchResults.value = [];
    runCount.value = 0;  // Reset the run count
    userResults.value = [];
    isRunning.value = true;
    trialRun();
    intervalId = setInterval(trialRun, 2500);
  }
}

// Function to stop the interval and clear the grid
function clearGrid() {
  clearInterval(intervalId);
  intervalId = null;
  grid.value = Array(9).fill(false);
  isRunning.value = false;

  userResults.value.push(userInput.value.slice())
  console.log(userInput.value);
  userInput.value[0] = false;
  userInput.value[1] = false;
  console.log(userResults.value);

  //TODO: calculate the percent correct
  checkResults()
  
}

function checkResults() {
  let correct = 0
  let incorrect = 0

  for (let i = 0; i < userResults.value.length; i++){
    for (let j = 0; j < userResults.value[i].length; j++){
      //console.log(userResults.value[i][j])
      if(userResults.value[i][j] || matchResults.value[i][j]){
        if (userResults.value[i][j] && matchResults.value[i][j]) {
          ++correct
        } else {
          ++incorrect
        }
      }
    }
  }

  console.log("correct: " + correct)
  console.log("incorrect: " + incorrect)
  console.log("Total: " + (correct / (incorrect + correct)))
}


// Clear the interval when the component is destroyed
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

</script>

<template>
  <div :class="{'bg-yellow-300': isMatch}" class="flex flex-col justify-center items-center h-screen transition-colors duration-300">
    <div class="grid grid-cols-3 gap-2 w-72 h-72 mb-4">
      <div 
        v-for="(isVisible, index) in grid" 
        :key="index" 
        class="border flex justify-center items-center w-24 h-24"
      >
        <img v-if="isVisible" :src="logo" alt="Logo" class="w-16 h-16"/>
      </div>
    </div>
    <div class="mb-4">
      <label for="matchBack" class="mr-2">Check Match Back:</label>
      <input id="matchBack" type="number" min="1" max="9" v-model="matchBack"  :disabled="isRunning" class="px-2 py-1 border rounded w-16 text-center"/>
    </div>
    <div>
      <button @click="matchPosition" class="px-4 py-2 bg-blue-500 text-white rounded mr-2">POSITION</button>
      <button @click="matchSound" class="px-4 py-2 bg-blue-500 text-white rounded">SOUND</button>
    </div>
    <div>
      <button @click="startInterval" class="px-4 py-2 bg-green-500 text-white rounded mr-2">START</button>
      <button @click="clearGrid" class="px-4 py-2 bg-red-500 text-white rounded">CLEAR</button>
    </div>
  </div>
</template>
