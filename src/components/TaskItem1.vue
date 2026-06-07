<script setup>
import { useTaskStore } from "../store/task.js";
import { ref } from "vue";

// receiving task object from the parent component
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const isEditing = ref(false);
const isCompleted = ref(false);
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
</script>

<template>
  <!-- A single Todo-Card -->
  <!--dynamic CSS class- is active, if isEditing is true-->
  <v-card class="task-card" :class="{ editing: isEditing }">
    <v-list-item>
      <!-- Slot to prepend content to the left of the list item -->
      <template #prepend>
        <!-- Checkbox for completed task -->
        <v-checkbox
          v-model="isCompleted"
          hide-details
          color="secondary"
          @click="modifyCheckbox"
        />
      </template>

      <!-- Task name and date-->
      <v-list-item-title v-if="!isEditing" :class="{ completed: isCompleted }">
        {{ task.title }}
      </v-list-item-title>

      <div v-else class="edit-container" style="width: 100%">
        <v-text-field
          v-model="editedTitle"
          label="Edit task title"
          hide-details
        />

        <div class="date-button-block editing-block">
          <v-list-item-subtitle class="date">
            {{ task.created_at }}
          </v-list-item-subtitle>

          <v-btn color="primary" class="submit-btn" @click="editTask">
            Submit
          </v-btn>
        </div>
      </div>

      <div v-if="!isEditing" class="date-button-block">
        <v-list-item-subtitle class="date">
          {{ task.created_at }}
        </v-list-item-subtitle>
      </div>

      <!-- Slot to append content to the right of the list item -->
      <template #append>
        <!-- Delete button with trash icon -->
        <v-btn v-if="!isEditing" icon variant="text" @click="deleteTask()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>

        <!-- Edit button with pencil icon -->
        <v-btn v-if="!isEditing" icon variant="text" @click="isEditing = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-card>
</template>

<style scoped>
.task-card {
  min-height: 6.7rem;
  margin-bottom: 0.625rem;
  padding-top: 0.4rem;
  padding-bottom: 0.5rem;
  border: 2px solid rgb(var(--v-theme-brandGold)) !important;
  box-shadow: none !important;
}

.task-card * {
  overflow: visible !important;
}

.task-card.editing :deep(.v-list-item) {
  overflow: visible;
  padding-bottom: 0.6rem;
}

.v-list-item-title {
  font-size: 1.3rem;
}

.v-list-item-subtitle {
  margin-top: -5px;
}

/*Strikethrough text for completed tasks*/
.completed {
  text-decoration: line-through;
  text-decoration-color: rgb(var(--v-theme-brandGold));
}

.underneath-textfield {
  border: 3px solid yellow;
  display: flex;
  align-items: center;

  margin-top: -7px;
  margin-bottom: 0.5rem;
  gap: 1.5rem;
}

.date-button-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  width: 100%;
}

.editing-block {
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.date {
  align-self: flex-start;
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}

.submit-btn {
  margin-top: 0.5rem;
}
</style>
