import {defineStore} from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
    state:() => ({
        tasks: [],
        isLoading: false,
    }),
     getters:{
        favs(){
            return this.tasks.filter(task => task.isFavorite)
        },
        favNum(){
            return this.favs.reduce((previous, current) => {
                return current.isFavorite ? previous + 1 : previous
            }, 0)
        },
        totalCount(){
            return this.tasks.length
        },

     },
     actions:{
         async getTasks(){
            this.isLoading = true;
            axios.get('http://localhost:3000/tasks')
                .then((res)=> {
                    this.tasks = res.data
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() =>{
                    this.isLoading = false
                })
        },
         async addTask(task){
             this.tasks.push(task)
             axios.post('http://localhost:3000/tasks', task)
                 .then(response => console.log(response.data))
                 .catch(error => console.log(error))
         },
         async toggleFavorite(taskId){
             const task = this.tasks.find(task => task.id === taskId)
             if(task){
                 task.isFavorite = !task.isFavorite
             }
             axios.patch(`http://localhost:3000/tasks/${taskId}`, {isFavorite: task.isFavorite})
                 .then(response => console.log(response.data))
                 .catch(error => console.log(error))
         },
         async removeTask(taskId){
            const index = this.tasks.findIndex(task => task.id === taskId);
            if (index !== -1){
                this.tasks.splice(index, 1)
            }
             axios.delete(`http://localhost:3000/tasks/${taskId}`)
                 .then(response => console.log(response.data))
                 .catch(error => console.log(error))
         }
     }
})