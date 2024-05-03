
<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="newTask" placeholder="I need to ...">
    <button>Add</button>
  </form>
</template>

<script setup>
import { useTaskStore} from "@/store/TaskStore.js";
import {ref} from "vue";

const taskStore = useTaskStore();
const newTask = ref('')

function handleSubmit(){
  if (newTask.value.length > 0){
    taskStore.addTask({
        title: newTask.value,
        isFavorite: false,
        id: Math.floor(Math.random() * taskStore.tasks.length * 100000),
        })
  }
  newTask.value = "";
}

</script>

<style scoped>

</style>