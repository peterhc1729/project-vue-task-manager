<script setup>
import { ref } from "vue";

const taskTitle = ref("");
const emit = defineEmits(["closeDialog", "submitTask"]);

const submitTask = () => {
  if (!taskTitle.value.trim()) return; // no empty tasks get submitted

  // Send task title to Dashboard.vue, which then calls addTask
  emit("submitTask", taskTitle.value);

  taskTitle.value = "";

  // Tell parent to close the dialog window
  emit("closeDialog");
};
</script>

<template>
  <div class="new-task">
    <v-form @submit.prevent="submitTask">
      <v-text-field
        v-model="taskTitle"
        label="Type in your task"
        base-color="brandGold"
        hide-details
      />
      <div class="btn-wrapper">
        <v-btn color="primary" class="save-btn" type="submit">Save task</v-btn>
      </div>
      <v-btn
        icon
        size="small"
        variant="text"
        class="close-btn"
        @click="emit('closeDialog')"
      >
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped>
.new-task {
  background-color: white;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 12px;

  /* Anchor for .close-btn absolute positioning */
  position: relative;
  border: 2px solid rgb(var(--v-theme-brandGold)) !important;
}

.close-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
}

.btn-wrapper {
  display: flex;
  justify-content: center;

  /* gap between Input and Button */
  margin-top: 1.5rem;
}

.save-btn {
  font-weight: bold !important;
  width: 10rem;
  border-radius: 6px !important;
}

/* xs only: mobile views (< 600px) */
@media (max-width: 599px) {
  .new-task {
    padding: 3rem 1.2rem 1.5rem 1.2rem;
  }

  .close-btn {
    top: 0.4rem;
    right: 0.4rem;
  }

  .save-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
