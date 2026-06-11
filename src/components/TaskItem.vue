<script setup>
import { useTaskStore } from "../store/task.js";
import { computed, ref } from "vue";

// receiving task object from the parent component
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const isEditing = ref(false);
const isCompleted = ref(props.task.is_complete);
const taskStore = useTaskStore();
const editedTitle = ref(props.task.title);

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const editTask = async () => {
  //updateTask requires task.id and the updated task object as arguments
  await taskStore.updateTask(props.task.id, { title: editedTitle.value });
  isEditing.value = false;
};

const modifyCheckbox = async () => {
  await taskStore.updateTask(props.task.id, {
    is_complete: isCompleted.value,
  });
};

const formattedDateString = computed(() => {
  const monthsArr = [
    "JAN",
    "FEB",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];
  const yearStr = props.task.created_at.slice(0, 4);
  const monthStr = monthsArr[parseInt(props.task.created_at.slice(5, 7)) - 1];
  const dayStr = props.task.created_at.slice(8, 10);
  const dateStr = `${monthStr} ${dayStr} ${yearStr}`;
  return dateStr;
});
</script>

<template>
  <!-- A single Todo-Card -->
  <!--dynamic CSS class- is active, if isEditing is true-->
  <!-- elevation="0" -> no shadow -->
  <v-card
    class="task-card"
    :class="{ editing: isEditing, 'completed-card': isCompleted }"
    elevation="0"
  >
    <v-list-item>
      <!-- Slot to prepend content to the left of the list item -->
      <template #prepend>
        <!-- Checkbox for completed task -->
        <v-checkbox
          v-if="!isEditing"
          v-model="isCompleted"
          hide-details
          color="secondary"
          @update:modelValue="modifyCheckbox"
        />
      </template>

      <!-- Task name and date-->
      <div v-if="!isEditing">
        <v-list-item-title
          class="task-text"
          :class="{ completed: isCompleted }"
        >
          {{ task.title }}
        </v-list-item-title>

        <v-list-item-subtitle class="date">
          {{ formattedDateString }}
        </v-list-item-subtitle>
      </div>

      <!--edit mode-->
      <div v-else class="edit-container" style="width: 100%">
        <v-text-field
          class="task-input"
          v-model="editedTitle"
          label="Edit task title"
          hide-details
        />

        <div class="button-container">
          <v-btn color="primary" class="save-btn" @click="editTask">
            Save
          </v-btn>
        </div>
      </div>

      <!-- Slot to append content to the right of the list item -->
      <template #append>
        <!-- Edit button with pencil icon -->
        <v-btn v-if="!isEditing" icon variant="text" @click="isEditing = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!-- Delete button with trash icon -->
        <v-btn v-if="!isEditing" icon variant="text" @click="deleteTask()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-card>
</template>

<style scoped>
/* dynamic class (if isCompleted===true) */
.completed {
  /*Strikethrough text for completed tasks*/
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: rgb(var(--v-theme-brandGold));
}

.task-card {
  border: 2px solid rgb(var(--v-theme-brandGold)) !important;
  min-height: 6rem;
  padding: 0.5rem 0;
  margin-bottom: 0.7rem;
}
.task-card * {
  overflow: visible !important;
}

.task-card.editing {
  min-height: 6.2rem;
}

.task-card.completed-card {
  border: 2px solid rgb(var(--v-theme-quinary)) !important;
}

.task-text {
  font-style: italic;
}

:deep(.task-input input) {
  font-style: italic;
}

.v-list-item-title {
  font-size: 1.6rem;
  line-height: 1.6;
  margin-top: 0.4rem;
}

.v-checkbox {
  margin-right: 0.4rem;
}

.date {
  align-self: flex-start;
  margin: 0;
  font-size: 0.6rem;
  opacity: 0.7;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.save-btn {
  width: 7rem;
}
</style>
