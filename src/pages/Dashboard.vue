<script setup>
import { computed, ref, onMounted } from "vue";
import Nav from "../components/Nav.vue";
import TaskItem from "../components/TaskItem.vue";
import NewTask from "../components/NewTask.vue";
import { useTaskStore } from "../store/task.js";

const FILTER_OPTIONS = ["All", "Completed", "Incomplete"];
// Current value of dropdown; "All" as default
const taskFilter = ref(FILTER_OPTIONS[0]);

const showDialog = ref(false);
const taskStore = useTaskStore();

const addTask = async (taskTitle) => {
  await taskStore.addTask(taskTitle);
  showDialog.value = false; // closes dialog as soon as task is saved
};

// fetching tasks from Supabase when the component mounts
onMounted(() => {
  taskStore.fetchTasks();
});

const filteredTasks = computed(() => {
  if (taskFilter.value === "Completed") {
    return taskStore.tasks.filter((task) => task.is_complete);
  } else if (taskFilter.value === "Incomplete") {
    return taskStore.tasks.filter((task) => !task.is_complete);
  }
  return taskStore.tasks;
});
</script>

<template>
  <Nav />

  <div class="stripes-bg">
    <h1 class="title">MY TO-DO LIST</h1>

    <v-container fluid>
      <div class="button-filter-block">
        <v-btn class="add-task-btn" @click="showDialog = true">
          Add new task
        </v-btn>

        <v-select
          v-model="taskFilter"
          class="dropdown-menu"
          :items="FILTER_OPTIONS"
          density="compact"
          hide-details
        />
      </div>

      <v-row class="mt-n2" no-gutters>
        <v-col
          v-for="task in filteredTasks"
          :key="task.id"
          cols="12"
          class="pa-0"
        >
          <TaskItem :task="task" />
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="showDialog"
      max-width="700"
      content-class="new-task-dialog"
    >
      <NewTask @close-dialog="showDialog = false" @submit-task="addTask" />
    </v-dialog>
  </div>
</template>

<style scoped>
.title {
  line-height: 1;
  text-align: center;
  font-weight: bold;
}

.button-filter-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  gap: 0.5rem;

  /* Wraps items into the next line on small screens to prevent layout breaking */
  flex-wrap: wrap;
}

.dropdown-menu {
  width: 12rem !important;
  min-width: 0 !important;

  /* prevents Flexbox from shrinking */
  flex-shrink: 0;

  /* prevents "space-between" from making the dropdown grow*/
  flex-grow: 0 !important;
}

:deep(.v-select__selection-text) {
  font-size: 0.9rem;
}

:deep(.new-task-dialog) {
  margin-top: 12vh;
  align-self: flex-start;
}

/* xs only: (< 600px) */
@media (max-width: 599px) {
  .title {
    font-size: 1.6rem;
    margin-top: 2rem;
    margin-bottom: 1.6rem;
  }

  :deep(.v-container) {
    padding: 0 2rem !important;
  }

  .dropdown-menu {
    width: 8.7rem !important;
  }

  .button-filter-block {
    align-items: center;
  }
}

/* sm: view for tablets (600px – 959px) */
@media (min-width: 600px) and (max-width: 959px) {
  :deep(.v-container) {
    padding: 0 10vw !important;
  }

  .title {
    font-size: 2rem;
    margin-top: 2.5rem;
    margin-bottom: 1.9rem;
  }
}

/* md: view for middle-sized devices (960px – 1279px) */
@media (min-width: 960px) and (max-width: 1279px) {
  .title {
    margin-top: 4rem;
    margin-bottom: 1.7rem;
    font-size: 2.5rem;
  }

  :deep(.v-container) {
    padding: 0 7rem !important;
  }
}

/* lg: desktop view (default) (>= 1280px) */
@media (min-width: 1280px) {
  .title {
    margin-top: 4rem;
    margin-bottom: 1.7rem;
    font-size: 2.5rem;
  }

  :deep(.v-container) {
    padding: 0 10rem !important;
  }
}
</style>
