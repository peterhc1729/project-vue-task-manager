<script setup>
import { ref } from "vue";

const taskTitle = ref("");
const emit = defineEmits(["closeDialog", "submitTask"]);

const submitTask = () => {
  emit("submitTask", taskTitle.value); //sending taskTitle to Dashboard.vue, which then
  // calls addTask
  emit("closeDialog"); //telling parent to close dialog window
};
</script>

<template>
  <div class="new-task">
    <v-form>
      <!-- Input field, two-way-synchronization of "taskTitle through "v-model"-->
      <v-text-field
        label="Type in your task"
        v-model="taskTitle"
        base-color="brandGold"
      />
      <div class="btn-wrapper">
        <!--emit(eventName:string, data:any)-->
        <v-btn @click="submitTask" color="primary">Submit task</v-btn>
      </div>

      <!--"X"-Button to close dialog window-->
      <v-btn
        icon
        size="x-small"
        variant="text"
        @click="emit('closeDialog')"
        class="close-btn"
      >
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped>
.new-task {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  position: relative; /* ← Anchor for absolute positioning */
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
