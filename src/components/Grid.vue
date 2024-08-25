<script setup>
import { ref, onBeforeUnmount } from 'vue';
import logo from '@/assets/img/logo.jfif';

// Create a 3x3 grid initialized to false (no images shown)
const grid = ref(Array(9).fill(false));
let intervalId = null;
const maxRuns = 5;  // Maximum number of times the interval should run
const runCount = ref(0);  // Counter to track the number of runs
const matchBack = ref(1);  // Number of positions back to check for a match, default is 1 (last position)

// Array to store the history of grid positions and letters spoken
const history = ref([]);

// State to track if there was a match for flashing effect
const isMatch = ref(false);

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

// Function to show an image in a random position
function showRandomImage() {
  grid.value = Array(9).fill(false);

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * 9);
    grid.value[randomIndex] = true;
    
    // Play a random letter sound and get the letter
    const letter = playRandomLetterSound();

    // Determine which position back to check based on the input
    const positionToCheck = history.value.length - matchBack.value;
    if (positionToCheck >= 0) {
      const entryToCheck = history.value[positionToCheck];
      if (entryToCheck && (entryToCheck[0] === randomIndex || entryToCheck[1] === letter)) {
        isMatch.value = true;
        setTimeout(() => {
          isMatch.value = false;
        }, 300);  // Reset the match state after 300ms for the flash effect
      }
    }

    // Store the grid position and corresponding letter in the history array
    history.value.push([randomIndex, letter]);
    console.log('History:', history.value);

    // Increment the run count
    runCount.value++;

    // Handle the final run differently
    if (runCount.value >= maxRuns) {
      setTimeout(() => {
        clearGrid();  // Clear the grid after a short delay to show the last image
      }, 2000);  // Adjust this delay as needed to allow the final image to be visible
    }

  }, 100);  // Adjust this timeout duration as needed for the desired flash effect
}

// Function to start the interval
function startInterval() {
  if (!intervalId) {
    history.value = [];  // Clear the history array to start fresh
    runCount.value = 0;  // Reset the run count
    intervalId = setInterval(showRandomImage, 2500);
  }
}

// Function to stop the interval and clear the grid
function clearGrid() {
  clearInterval(intervalId);
  intervalId = null;
  grid.value = Array(9).fill(false);
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
      <input id="matchBack" type="number" min="1" v-model="matchBack" class="px-2 py-1 border rounded w-16 text-center"/>
    </div>
    <div>
      <button @click="startInterval" class="px-4 py-2 bg-green-500 text-white rounded mr-2">START</button>
      <button @click="clearGrid" class="px-4 py-2 bg-red-500 text-white rounded">CLEAR</button>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
