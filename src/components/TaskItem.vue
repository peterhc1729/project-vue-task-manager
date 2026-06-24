<script setup>
import { useTaskStore } from "../store/task.js";
import { computed, ref } from "vue";

// Receiving task object from the parent component
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const taskStore = useTaskStore();
const isEditing = ref(false);
const showDeleteConfirm = ref(false);

//synchronizing the checkbox bidirectionally with taskStore
const isCompleted = computed({
  get: () => props.task.is_complete,
  set: (value) => taskStore.updateTask(props.task.id, { is_complete: value }),
});
const editedTitle = ref(props.task.title);

const confirmDelete = () => {
  showDeleteConfirm.value = true;
};

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  showDeleteConfirm.value = false;
};

const startEditing = () => {
  editedTitle.value = props.task.title; // always get freshest value from Store
  isEditing.value = true;
};

const editTask = async () => {
  if (!editedTitle.value.trim()) return; // prevents saving of white space

  // updateTask requires task.id and the updated task object as arguments
  await taskStore.updateTask(props.task.id, { title: editedTitle.value });
  isEditing.value = false;
};

const formattedDateString = computed(() => {
  const months = [
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
  const year = props.task.created_at.slice(0, 4);
  const month = months[parseInt(props.task.created_at.slice(5, 7)) - 1];
  const day = props.task.created_at.slice(8, 10);
  return `${month} ${day} ${year}`;
});
</script>

<template>
  <v-card
    class="task-card"
    :class="{ editing: isEditing, 'completed-card': isCompleted }"
    elevation="0"
  >
    <v-list-item>
      <template #prepend>
        <v-checkbox
          v-if="!isEditing"
          v-model="isCompleted"
          hide-details
          color="secondary"
        />
      </template>

      <div v-if="!isEditing" class="view-container">
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

      <div v-else class="edit-container">
        <v-text-field
          v-model="editedTitle"
          @keyup.enter="editTask"
          class="task-input"
          label="Edit task title"
          hide-details
        />
        <div class="button-container">
          <v-btn color="primary" class="save-btn" @click="editTask">
            Save
          </v-btn>
        </div>
      </div>

      <template #append>
        <div v-if="!isEditing" class="icon-group">
          <v-btn icon variant="text" @click="startEditing">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon variant="text" @click="confirmDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-list-item>
  </v-card>

  <v-dialog v-model="showDeleteConfirm" max-width="400" persistent>
    <v-card class="confirm-dialog-card">
      <div class="dialog-header">
        <v-card-title class="dialog-title pa-0">Delete task?</v-card-title>
      </div>

      <v-card-text class="dialog-text">
        Are you sure you want to delete this task? This action cannot be undone.
      </v-card-text>

      <v-card-actions class="dialog-actions">
        <v-btn
          variant="text"
          class="cancel-btn"
          @click="showDeleteConfirm = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          class="action-btn delete-confirm-btn"
          @click="deleteTask"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Strikethrough for completed task titles */
.completed {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: rgb(var(--v-theme-tertiary));
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
  padding: 0.8rem 0;
}

.task-card.completed-card {
  border: 2px solid rgb(var(--v-theme-quinary)) !important;
}

:deep(.v-list-item__content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 0;
}

.view-container {
  flex-grow: 1;

  /* prevents longer texts from blowing up Flexbox */
  min-width: 0;
}

.task-text {
  font-style: italic;

  /* allows text to wrap (overrides Vuetify default) */
  white-space: normal;

  /* breaks long words onto the next line */
  overflow-wrap: break-word;

  /* fallback for older browsers */
  word-break: break-word;

  text-align: start;

  /* hyphenates long words at line breaks */
  hyphens: auto;
}

:deep(.task-input input) {
  font-style: italic;
}

.edit-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  width: 7rem;
}

.confirm-dialog-card {
  border: 2px solid rgb(var(--v-theme-error)) !important;
  border-radius: 12px !important;
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  background-color: rgb(var(--v-theme-surface)) !important;
}

.dialog-header {
  display: flex;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.dialog-title {
  font-size: 1.4rem !important;
  font-weight: bold !important;
  letter-spacing: 0.05rem;
  text-align: center;
}

.dialog-text {
  font-size: 1rem !important;
  color: rgba(var(--v-theme-on-surface), 0.7) !important;
  padding: 0 !important;
  text-align: center;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.dialog-actions {
  padding: 0 !important;
  display: flex;
  justify-content: center;
  gap: 0.9rem;
}

.cancel-btn {
  text-transform: none !important;
  font-weight: bold !important;
  height: 2.4rem !important;
}

.action-btn {
  text-transform: none !important;
  font-weight: bold !important;
  padding: 0 1.5rem !important;
  height: 2.4rem !important;
  border-radius: 6px !important;
}

.delete-confirm-btn {
  box-shadow: none !important;
}

.v-list-item-title {
  font-size: 1rem;
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

.icon-group {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;

  /* prevents buttons from being squashed */
  flex-shrink: 0;
}

:deep(.icon-group .v-btn--icon) {
  width: 1.8rem;
  height: 1.8rem;
}

/* xs only: mobile views (< 600px) */
@media (max-width: 599px) {
  .task-card {
    min-height: 4.5rem;
    padding: 0.2rem 0;
  }

  .task-text {
    line-height: 1.3 !important;
  }

  .v-list-item-title {
    font-size: 1.1rem;
  }

  .icon-group {
    gap: 0.85rem;
  }

  :deep(.icon-group .v-btn--icon) {
    width: 1.5rem !important;
    height: 1.5rem !important;
    font-size: 0.8rem !important;
  }

  .confirm-dialog-card {
    padding: 1.2rem 1.2rem 0.4rem 1.2rem;
  }

  .dialog-text {
    font-size: 0.9rem !important;
    margin-bottom: 0.6rem;
  }

  .button-container {
    justify-content: center;
  }
}

/* sm: view for tablets (600px – 959px) */
@media (min-width: 600px) and (max-width: 959px) {
  .task-card {
    min-height: 4.5rem;
    padding: 0.1rem 0;
  }

  .v-list-item-title {
    font-size: 1.1rem;
  }
}

/* md: view for middle-sized devices (960px – 1279px) */
@media (min-width: 960px) and (max-width: 1279px) {
  .v-list-item-title {
    font-size: 1.4rem;
  }
}

/* lg: desktop view (default) (>= 1280px) */
@media (min-width: 1280px) {
  .task-card {
    margin-bottom: 0.8rem;
  }

  .v-list-item-title {
    font-size: 1.4rem;
  }
}
</style>
