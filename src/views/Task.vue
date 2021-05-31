<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">

            <h1>{{task.title}}</h1>
            <form @submit.prevent="submitHandler">
                <div class="chips" ref="chips"></div>
                <div class="input-field">
                    <textarea id="description" v-model="description" class="materialize-textarea"></textarea>
                    <label for="description">Description</label>
                    <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}} / 2048</span>
                </div>
                <input type="text" class="datepicker" ref="datepicker">
                <div v-if="task.status !== 'completed'">
                    <button class="btn" type="submit">Update task</button>
                    <button class="btn blue" type="submit" @click="completeTask">Complete task</button>
                </div>

            </form>
        </div>
        <p v-else>task not found</p>
    </div>

</template>


<script>
    export default {
        computed: {
            task(){
                return this.$store.getters.taskById(+this.$route.params.id)
            }
        },

        mounted() {
          // eslint-disable-next-line no-undef
            this.chips = M.Chips.init(this.$refs.chips,{
                placeholder: 'Task Tags',
                data: this.task.tags
            });
          // eslint-disable-next-line no-undef
            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                defaultDate: new Date(this.task.date),
                setDefaultDate: true,

            });
            setTimeout(() => {
              // eslint-disable-next-line no-undef
                M.updateTextFields();
            }, 0)
            this.description = this.task.description;
        },

        data: ()=> ({
            description: '',
            chips: null,
            date: null
        }),

        methods:{
            submitHandler(){
                this.$store.dispatch('updateTask', {
                    id: this.task.id,
                    description: this.description,
                    tags: this.chips.chipsData,
                    date: this.date.date
                });
                this.$router.push('/list')
            },
            completeTask(){
                this.$store.dispatch('completeTask', this.task.id);
                this.$router.push('/list')
            }
        },
        unmounted() {
            if (this.date && this.date.destroy){
                this.date.destroy()
            }
            if (this.chips && this.chips.destroy){
                this.chips.destroy()
            }
        }
    }
</script>

<style scoped>

</style>