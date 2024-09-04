<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import logo from '@/assets/img/logo.jfif';

// Create a 3x3 grid initialized to false (no images shown)
const grid = ref(Array(9).fill(false));
let intervalId = null;
const maxRuns = 19;  // Maximum number of times the interval should run
const numOfTrials = ref(20);
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

function resetAudio() {
  letterSounds.forEach(letterObj => {
    letterObj.sound.pause();
    letterObj.sound.currentTime = 0;  // Reset audio to the start
  });
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
  if (runCount.value >= numOfTrials.value) {
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
    resetAudio();
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


onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

// Clear the interval when the component is destroyed
onBeforeUnmount(() => {
  clearInterval(intervalId);
  window.removeEventListener('keydown', handleKeydown);
});

function handleKeydown(event) {
  if (event.key === 'f') {
    matchPosition();
  } else if (event.key === 'j') {
    matchSound();
  }
}

</script>
<template>
  <div class="flex h-screen bg-slate-500 text-gray-50 transition-colors duration-150">
    
    <!-- Left Column (empty) -->
    <div class="flex-1">
      <!-- Left column is intentionally left empty -->
    </div>

    <!-- Middle Column (Grid + Controls) -->
    <div class="flex-1 flex flex-col justify-center items-center">
      <!-- Grid Layout -->
      <div class="grid grid-cols-3 gap-0 w-96 h-96 mb-4">
        <div 
          v-for="(isVisible, index) in grid" 
          :key="index" 
          class="border rounded flex justify-center items-center w-32 h-32 border-gray-400 bg-gray-100"
        >
          <img v-if="isVisible" :src="logo" alt="Logo" class="w-16 h-16 transition-opacity duration-300 transform"/>
        </div>
      </div>

      <!-- Input Fields (N-Back and Number of Trials) -->
      <div class="mb-4">
        <label for="matchBack" class="mr-2">N-Back Level:</label>
        <input 
          id="matchBack" 
          type="number" 
          min="1" 
          max="9" 
          v-model="matchBack"  
          :disabled="isRunning" 
          class="mr-4 px-2 py-1 border rounded w-16 text-center bg-gray-100 text-gray-800 border-gray-400"
        />
    
        <label for="numOfTrials" class="mr-2">Number of trials:</label>
        <input 
          id="numOfTrials" 
          type="number" 
          min="1" 
          max="9" 
          v-model="numOfTrials"  
          :disabled="isRunning" 
          class="px-2 py-1 border rounded w-16 text-center bg-gray-100 text-gray-800 border-gray-400"
        />
      </div>

      <!-- Start and Clear Buttons -->
      <div class="mb-8">
        <button 
          @click="startInterval" 
          v-bind:class="[
            'px-4 py-2 bg-green-600 text-white rounded mr-2',
            isRunning ? 'hidden' : 'active:scale-95'
          ]">
          START
        </button>
        <button 
          @click="clearGrid"  
          v-bind:class="[
            'px-4 py-2 bg-red-600 text-white rounded',
            isRunning ? 'active:scale-95' : 'hidden'
          ]">
          CLEAR
        </button>
      </div>

      <!-- Position and Sound Buttons -->
      <div>
        <button 
          @click="matchPosition" 
          v-bind:disabled="!isRunning" 
          :class="[
            'px-4 py-2 rounded mr-2 w-36', 
            isRunning ? 'bg-blue-600 text-white active:scale-95 active:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          ]"
        >
          POSITION
        </button>

        <button 
          @click="matchSound" 
          v-bind:disabled="!isRunning" 
          :class="[
            'px-4 py-2 rounded mr-2 w-36', 
            isRunning ? 'bg-blue-600 text-white active:scale-95 active:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          ]"
        >
          SOUND
        </button>
      </div>
    </div>

    <!-- Right Column (Text List) -->
    <div class="flex-1 flex flex-col justify-center items-center">
      <ul class="list-disc text-left">
        <li>First Item</li>
        <li>Second Item</li>
        <li>Third Item</li>
        <li>Fourth Item</li>
      </ul>
    </div>

  </div>
</template>
