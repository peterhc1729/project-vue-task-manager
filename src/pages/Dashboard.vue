<script setup>
import { computed, ref, onMounted } from "vue";
import Nav from "../components/Nav.vue";
import TaskItem from "../components/TaskItem.vue";
import NewTask from "../components/NewTask.vue";
import { useTaskStore } from "../store/task.js";

// Current value of dropdown; "All" as default
const taskFilter = ref("All");
const showDialog = ref(false);
const taskStore = useTaskStore();

const addTask = async (taskTitle) => {
  await taskStore.addTask(taskTitle);
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

  <div class="clipboard">
    <h1 class="title">MY TO-DO LIST</h1>
    <v-container>
      <!-- Second line: button and filter menu-->
      <div class="button-filter-block">
        <v-row class="mb-0">
          <!-- Button occupies 3 out of 12 grid columns (left side) -->
          <v-col cols="3" class="add-button-col">
            <v-btn class="w-100" color="primary" @click="showDialog = true"
              >Add new task</v-btn
            >
          </v-col>
          <!-- Filter takes 3 out of 12 grid columns, offset by 6 columns (right side) -->
          <v-col cols="3" offset="6" class="filter-menu-col">
            <!-- Dropdown containing three options; "compact" makes dropdown smaller-->
            <v-select
              class="dropdown-menu"
              :items="['All', 'Completed', 'Incomplete']"
              v-model="taskFilter"
              density="compact"
            />
          </v-col>
        </v-row>
      </div>

      <!--task list -->
      <!--"n2": NEGATIVE margin-top-->
      <v-row class="mt-n2">
        <v-col>
          <v-list class="task-list">
            <TaskItem
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
            />
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- Dialog -->
  <v-dialog max-width="700" v-model="showDialog">
    <NewTask @closeDialog="showDialog = false" @submitTask="addTask" />
  </v-dialog>
</template>

<style scoped>
.clipboard {
  background-color: rgb(229, 176, 140);
  position: relative;
  border-radius: 8px 8px 0 0;
  padding: 2rem 1.5rem 2rem;
  margin: 2rem auto;
  min-height: 97vh;
  max-width: 900px;
}

.title {
  margin-top: 0.5em;
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
}

.add-button-col {
  display: flex;
  align-self: flex-end;
  margin-bottom: 1.6rem;
}

.filter-menu-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.button-filter-block {
  display: flex;
  align-self: flex-end;
}

.task-list {
  margin: 0;
  padding: 0;
  background: transparent;
}
</style>
