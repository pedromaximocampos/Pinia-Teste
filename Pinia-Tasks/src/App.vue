<template>
  <main>
    <header>
      <img src="./assets/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>

    </header>
    <div class="task-form">
      <task-form></task-form>
    </div>
    <div class="favoriteNav">
      <nav>
        <button class="buttonFilter" @click="OnlyFavorite">Favorites</button>
        <button class="buttonFilter" @click="allTasks">All tasks</button>
      </nav>
    </div>

    <div class="loading" v-if="taskStore.isLoading">
      Loading Tasks ...
    </div>
    <div class="task-list" >
      <p>You have {{ taskStore.totalCount }} left to do, and {{taskStore.favNum}} {{ taskStore.favNum === 1 ? "is":"are" }} favorite!</p>
      <div v-if="!filter" v-for="task in taskStore.tasks" :key="task.id">

        <task-details  :task="task"></task-details>
      </div>

      <div v-else v-for="task in taskStore.favs">

        <task-details  :task="task"></task-details>
      </div>
    </div>
    <div class="favoriteNav">
    <button @click="taskStore.$reset" class="buttonFilter" >Reset Tasks</button>
    </div>
  </main>
</template>


<script setup>
import taskDetails from "./components/taskDetails.vue";
import TaskForm from "@/components/TaskForm.vue";
import { useTaskStore } from "@/store/TaskStore.js";
import {ref} from "vue";

const taskStore = useTaskStore();

taskStore.getTasks()

const filter = ref(false)

function OnlyFavorite(){
  filter.value = true;
}
function allTasks(){
  filter.value = false;
}

</script>

<style scoped>
.favoriteNav{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px auto;
  max-width: 640px;
}
.buttonFilter{
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 20px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 13px;
  font-weight: bolder;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 20px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
  margin: 5px;

}

.buttonFilter:hover {
    background: #F6F9FE;
    color: #174ea6;
}

.buttonFilter:active {
    box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
    outline: none;
}

</style>
