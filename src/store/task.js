import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async addTask(title) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title, user_id: user.id }]);
      if (error) throw error;
      await this.fetchTasks();
    },

    async updateTask(id, updatedTask) {
      const { data, error } = await supabase
        .from("tasks")
        .update(updatedTask)
        .eq("id", id);
      if (error) throw error;
      await this.fetchTasks();
    },

    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
      if (error) throw error;
      await this.fetchTasks();
    },
  },
});
