<template>
  <div class="container" v-if="!errorMessage">
    <Header :length="length"/>
    <AddItem @add-todo="addItem"/>
    <Items :todo="todo.data" @update-todo="updateTodo" @delete="deleteTodo"/>
  </div>
  <div class="container" v-else>
    <h1 style="background: #efefef">Error: {{errorMessage}}</h1>
  </div>
</template>

<script>
import Header from "@/components/Header";
import AddItem from "@/components/AddItem";
import Items from "@/components/Items";

import axios from "axios"

export default {
  name: 'App',
  components: {
    Header,
    AddItem,
    Items
  },
  data(){
    return{
      todo: [],
      length: "",
      error: false,
      errorMessage : "",
    }
  },
  methods:{
    async addItem(todo){


      try{
        await axios.post("api/todo/", todo);
        const fetched = await axios.get("api/todo/");
        this.todo = fetched.data;
        this.length = this.todo.data.length
      }catch (e) {
        this.errorMessage = e.message
      }


    },
    async updateTodo(updated, id){
      try{
        await axios.patch("api/todo/" + id, updated);
        const fetched = await axios.get("api/todo/");
        this.todo = fetched.data;
        this.length = this.todo.data.length
      }catch (e) {
        this.errorMessage = e.message
      }
    },
    async deleteTodo(id) {
      try{
        await axios.delete("api/todo/" + id);
        const fetched = await axios.get("api/todo/");
        this.todo = fetched.data;
        this.length = this.todo.data.length
      }catch (e) {
        this.errorMessage = e.message
      }
    },
  },

  async created() {
    try{
      const response = await axios.get("api/todo/");
      this.todo = response.data;
      this.length = this.todo.data.length
    }catch (e) {
      this.errorMessage = e.message
    }

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container{
  background: #252829;
  width: 100vw;
  height: 100vh;
  /*max-width: 700px;*/
  /*margin: 30px auto;*/
  overflow: auto;
  min-height: 500px;
  /*border: 1px solid steelblue;*/
  padding: 30px;
  /*border-radius: 5px;*/
}
button {
  all: unset;
  cursor: pointer;
}

</style>
