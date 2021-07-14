<template>
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
              <button @click="changeStateIndex(index)">作業中</button>
            </td>
            <td v-else>
              <button @click="changeStateIndex(index)">完了</button>
            </td>
            <td><button @click="deleteTodoIndex(index)">削除</button></td>
          </template>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['todos', 'showState'],
  methods: {
    deleteTodoIndex(index) {
      this.$emit('deleteTodoIndex', index)
    },
    changeStateIndex(index) {
      this.$emit('changeStateIndex', index)
    }
  }
}
</script>

<style scoped>
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
</style>
