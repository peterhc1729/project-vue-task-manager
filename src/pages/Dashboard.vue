<template>
  <v-app>
    <!-- Vuetify v-app-Wrapper, ALWAYS required on the outside-->
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
          <v-btn color="primary">Add Task</v-btn>
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
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import TaskItem from "../components/TaskItem.vue";

// Current value of dropdown; "All" as default
const taskFilter = ref("All");
</script>

<style>
.v-application {
  background-color: #eef0ff !important;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
  color: #3d3d6b !important;
}
</style>
