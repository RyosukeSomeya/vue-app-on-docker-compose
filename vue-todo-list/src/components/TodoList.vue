<template>
  <div class="container">
    <h1>TodoList</h1>
    <div class="select-state">
      <label for="all">
        <input type="radio" id="all" value="all" v-model="showState">
        すべて
      </label>
      <label for="wip">
        <input type="radio" id="wip" value="wip" v-model="showState">
        作業中
      </label>
      <label for="done">
        <input type="radio" id="done" value="done" v-model="showState">
        完了
      </label>
    </div>
    <div class="todo-list">
      <table>
        <thead>
          <tr>
            <th class="todo-it">ID</th><th class="comment-col">コメント</th><th>状態</th><th class="no-bg"></th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(todo, index) in todos" :key="index">
              <template v-if="showState === 'all' || showState === todo.state">
                <td>{{ index }}</td>
                <td>{{ todo.comment }}</td>
                <td v-if="todo.state === 'wip'">
                  <button @click="changeState(index)">作業中</button>
                </td>
                <td v-else>
                  <button @click="changeState(index)">完了</button>
                </td>
                <td><button @click="deleteTodo(index)">削除</button></td>
              </template>
            </tr>
        </tbody>
      </table>
      <div class="add-task">
        <h1>新規タスクの追加</h1>
        <input type="text" v-model="newTodo">
        <button @click="addTodo">追加</button>
      </div>
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
table {
  width: 100%;
}
th {
  color: #666;
  background-color: #ccc;
}
td {
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
}
.todo-id {
  width: 10%;
}
.comment-col {
  width: 50%;
}
.no-bg {
  background: none;
}
button {
  width: 80px;
}
input[type="text"] {
  width: 70%;
  padding: 4px;
  margin-right: 1rem;
}
</style>
