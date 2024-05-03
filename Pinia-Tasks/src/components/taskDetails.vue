<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="Icons">
      <i class="material-icons" @click="deleteTask(task.id)">delete</i>
      <i class="material-icons" @click="toggleFav(task.id)"
      :class="{active: task.isFavorite}">favorite</i>
    </div>
  </div>
</template>

<script setup>
import {useTaskStore} from "@/store/TaskStore.js";

const {task} = defineProps({task: {type: Object, required: true}})
const taskStore = useTaskStore();
const deleteTask = (id) => {
  taskStore.removeTask(id)
}

const toggleFav = (id) => {
  taskStore.toggleFavorite(id)
}
</script>
<style scoped>

</style>