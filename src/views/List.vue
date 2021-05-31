<template>
    <div>
        <h1>List</h1>
        <div class="row">
            <div class="input-field s6 col">
                <select ref="select" v-model="filter">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="active">Active</option>
                    <option value="outdated">Outdated</option>
                    <option value="completed">Completed</option>
                </select>
                <label>Status Filter</label>
            </div>

        </div>
        <button class="btn small red" v-if="filter" @click="filter = null"> Clear filter</button>
        <hr>
        <table v-if="tasks.length">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Open</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(task, idx) of displayTasks"
                    :key="task.id"
                >

                    <td>{{idx+1}}</td>
                    <td>{{task.title}}</td>
                    <td>{{new Date(task.date).toLocaleDateString()}}</td>
                    <td class="td">
                        <div class="text">{{task.description}}</div>
                    </td>
                    <td>{{task.status}}</td>
                    <td><router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">Open</router-link></td>
                    <td><button  class="btn  red darken-2" @click="deleteTask(task.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <p v-else>
            No tasks
        </p>
    </div>
</template>


<script>
    export default {
        data: () => ({
            filter: null
        }),
        computed: {
            tasks() {
                return this.$store.getters.tasks
            },
            displayTasks() {
                return this.tasks.filter(t => {
                    if (!this.filter) {
                        return true
                    }
                    return t.status === this.filter
                })
            }
        },
        mounted() {
          // eslint-disable-next-line no-undef
            M.FormSelect.init(this.$refs.select)
        },
      methods: {
        deleteTask(id){
          this.$store.dispatch('deleteTask', id)
        }
      }
    }
</script>

<style scoped>
    .text{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .td {
        max-width: 400px;
    }
</style>