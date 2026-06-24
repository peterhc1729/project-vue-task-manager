import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  // Initial state: tasks is null until fetched from Supabase
  state: () => ({
    tasks: null,
  }),

  actions: {
    // Fetches all tasks from Supabase, ordered by id (newest first)
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },

    // Adds a new task to Supabase
    async addTask(title) {
      // Get the currently logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // inserting the new task with the user's id
      const { error } = await supabase
        .from("tasks")
        .insert([{ title, user_id: user.id, is_complete: false }]);
      if (error) throw error;
      await this.fetchTasks();
    },

    // Updates an existing task by id
    async updateTask(id, updatedTask) {
      // updating solely the task with matching id
      const { error } = await supabase
        .from("tasks")
        .update(updatedTask)
        .eq("id", id);
      if (error) throw error;

      // Refreshing the task list after updating
      await this.fetchTasks();
    },

    // Deletes a task by id
    async deleteTask(id) {
      // deleting only the task with matching id
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      // Refreshing the task list after deleting
      await this.fetchTasks();
    },
  },
});
