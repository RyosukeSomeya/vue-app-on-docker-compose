<template>
  <div class="container">
    <h1>TodoList</h1>
    <!-- TodoFilter -->
    <div class="todo-list">
      <!-- Todo-display -->
      <!-- TodoInput -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showState: 'all',
      todos: [],
      newTodo: '',
    }
  },
  methods: {
      addTodo() {
          this.todos.push({
              comment: this.newTodo,
              state: 'wip'
          });
          this.newTodo = '';
      },
      deleteTodo(index) {
        this.todos.splice(index, 1);
      },
      changeState(index) {
          if (this.todos[index].state === 'wip') {
              this.todos[index].state = 'done'
          } else {
              this.todos[index].state = 'wip'
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 60%;
  margin: 0 auto;
}
.select-state {
  margin-bottom: 2rem;
}
</style>
