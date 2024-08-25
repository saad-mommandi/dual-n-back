<script>
export default {
  data(){
    return {
      data: 'john day',
      status: 'inactive',
      tasks: ['task1', 'apples', 'gym'],
      link: 'https://www.google.com'
    }
  },

  methods: {
    toggleStatus(){
      if (this.status == 'active') {
        this.status = 'inactive'
      } else {
        this.status = 'active'
      }
    }
  }
}
</script>

<template>
  <h1>{{ data }}</h1>
  <p v-if="status === 'active'">USER IS ACTIVE</p>
  <p v-else-if="status === 'inactive'">USER IS INACTIVE</p>
  <p v-else>USER IS IN THE MATRIX</p>

  <h3>TASKS</h3>
  <ul>
    <li v-for=" task in tasks" :key="task">{{task}}</li>
  </ul>

  <a v-bind:href="link">Googley</a>

  <button v-on:click="toggleStatus">Change Status</button>
</template>


<style scoped>

</style>