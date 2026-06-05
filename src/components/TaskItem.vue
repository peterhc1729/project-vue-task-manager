<script setup>
import { ref } from "vue";

// receiving task object from the parent component
defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const isCompleted = ref(false);
</script>

<template>
  <!-- A single Todo-Card -->
  <v-card class="task-card">
    <v-list-item>
      <!-- Slot to prepend content to the left of the list item -->
      <template #prepend>
        <!-- Checkbox for completed task -->
        <v-checkbox v-model="isCompleted" hide-details color="secondary" />
      </template>

      <!-- Task name and date-->
      <v-list-item-title :class="{ completed: isCompleted }">
        {{ task.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ task.created_at }}
      </v-list-item-subtitle>

      <!-- Slot to append content to the right of the list item -->
      <template #append>
        <!-- Delete button with trash icon -->
        <v-btn icon variant="text">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <!-- Edit button with pencil icon -->
        <v-btn icon variant="text">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-card>
</template>

<style>
/* distance between cards */
.task-card {
  margin-bottom: 0.625rem;
}

/*Strikethrough text for completed tasks*/
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
