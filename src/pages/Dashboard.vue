<script setup>
import { ref } from "vue";
import Nav from "../components/Nav.vue";
import TaskItem from "../components/TaskItem.vue";
import NewTask from "../components/NewTask.vue";

// Current value of dropdown; "All" as default
const taskFilter = ref("All");
const showDialog = ref(false);
const addTask = async (taskTitle) => {
  console.log(taskTitle);
};
</script>

<template>
  <Nav />
  <v-container>
    <v-row justify="center">
      <!-- Column spans the full width (12 out of 12 grid columns) -->
      <v-col cols="12">
        <!-- App title-->
        <h1 class="title">TODO LIST</h1>
      </v-col>
    </v-row>

    <!-- Second line: button and filter -->
    <v-row>
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

    <!-- Third line: task list -->
    <v-row>
      <v-col>
        <v-list>
          <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
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
</style>
