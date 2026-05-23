// Import of defineStore from Pinia to create the task store containing data and actions
import { defineStore } from "pinia";
import { supabase } from "../supabase";

// defining and exporting the task store
export const useTaskStore = defineStore("tasks", {
  // Initial state - tasks is null until fetched from Supabase
  state: () => ({
    tasks: null,
  }),
  actions: {
    // fetching all tasks from Supabase, ordered by id (newest first)
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*") // selecting all columns
        .order("id", { ascending: false }); // newest tasks first
      this.tasks = tasks;
    },

    // adding a new task to Supabase
    async addTask(title) {
      // Get the currently logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // inserting the new task with the user's id
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title, user_id: user.id }]);
      if (error) throw error;
      // refreshing the task list after adding
      await this.fetchTasks();
    },

    // Update an existing task by id
    async updateTask(id, updatedTask) {
      const { data, error } = await supabase
        .from("tasks")
        .update(updatedTask) // passing on the updated task object
        .eq("id", id); // updating solely the task with matching id
      if (error) throw error;
      // Refreshing the task list after updating
      await this.fetchTasks();
    },

    // Deleting a task by id
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id); // deleteing only the task with matching id
      if (error) throw error;
      // Refreshing the task list after deleting
      await this.fetchTasks();
    },
  },
});
