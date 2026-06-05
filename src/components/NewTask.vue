<script setup>
import { ref } from "vue";

const taskTitle = ref("");
const emit = defineEmits(["closeDialog", "submitTask"]);

const submitTask = () => {
  emit("submitTask", taskTitle.value);
  emit("closeDialog");
};
</script>

<template>
  <div class="new-task">
    <v-form>
      <!-- Input field, two-way-synchronization of "taskTitle through "v-model"-->
      <v-text-field label="Type in your task" v-model="taskTitle" />
      <div class="btn-wrapper">
        <!--emit(eventName:string, data:any)-->
        <v-btn @click="submitTask" color="primary">Submit task</v-btn>
      </div>

      <!--"X"-Button to close dialog window-->
      <v-btn icon @click="emit('closeDialog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped>
.new-task {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
}
</style>
