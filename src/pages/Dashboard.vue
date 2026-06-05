<script setup>
import { ref, onMounted } from "vue";
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
</script>

<template>
  <Nav />
  <v-container>
    <v-row justify="center">
      <!-- Column spans the full width (12 out of 12 grid columns) -->
      <v-col cols="12">
        <!-- App title-->
        <h1 class="title">MY TO-DO LIST</h1>
      </v-col>
    </v-row>

    <!-- Second line: button and filter -->
    <v-row class="mb-0">
      <!-- Button occupies 3 out of 12 grid columns (left side) -->
      <v-col cols="3">
        <v-btn class="w-100" color="primary" @click="showDialog = true"
          >Add task</v-btn
        >
      </v-col>
      <!-- Filter takes 3 out of 12 grid columns, offset by 6 columns (right side) -->
      <v-col cols="3" offset="6">
        <!-- Dropdown containing three options; "compact" makes dropdown smaller-->
        <v-select
          :items="['All', 'Completed', 'Incomplete']"
          v-model="taskFilter"
          density="compact"
        />
      </v-col>
    </v-row>

    <!--task list -->
    <!--"n2": NEGATIVE margin-top-->
    <v-row class="mt-n2">
      <v-col>
        <v-list class="task-list">
          <TaskItem
            v-for="task in taskStore.tasks"
            :key="task.id"
            :task="task"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog -->
  <v-dialog max-width="700" v-model="showDialog">
    <NewTask @closeDialog="showDialog = false" @submitTask="addTask" />
  </v-dialog>
</template>

<style>
.v-application {
  background-color: #eef0ff !important;
}

.title {
  margin-top: 1.5em;
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
}

.task-list {
  margin: 0;
  border: 1px solid cornflowerblue !important;
  background: transparent;
  padding: 0.5rem;
}
</style>
