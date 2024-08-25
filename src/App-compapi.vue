<script setup>
import {ref} from 'vue';

const name = ref("Jorn")
const status = ref("active")
const tasks = ref(['t1', 'apples','go shopping'])
const link = ref('https://www.google.com')
// form inputs are attached to a part of your state
const newTask = ref('')

const toggleStatus = () => {
  if (status.value == 'active') {
    status.value = 'inactive'
  } else {
    status.value = 'active'
  }
}

const addTask = () => {
  if (newTask.value.trim() !== ''){
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

const deleteTask = (index) => {
  tasks.value.splice(index, 1)
}

</script>

<template>
  <h1>{{ data }}</h1>
  <p v-if="status === 'active'">USER IS ACTIVE</p>
  <p v-else-if="status === 'inactive'">USER IS INACTIVE</p>
  <p v-else>USER IS IN THE MATRIX</p>

  <br>
  <form v-on:submit.prevent="addTask">
    <label for="newTask"></label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <h3>TASKS</h3>
  <ul>
    <li v-for=" (task, index) in tasks" :key="task">
      <span>{{task}}</span>
      <button v-on:click="deleteTask(index)">X</button>
    </li>
  </ul>

  <a v-bind:href="link">Googley</a>

  <button v-on:click="toggleStatus">Change Status</button>
</template>

<style scoped>

</style>