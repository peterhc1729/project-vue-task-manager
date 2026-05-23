// Import defineStore from Pinia to create the store with user data
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  // Initial state - user is null until logged in
  state: () => ({
    user: null,
  }),

  actions: {
    // fetching the currently logged-in user from Supabase
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },

    // signing up a new user with email and password
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error; // throw error if sign up fails
      if (user) this.user = user; // saving user to store if sign up succeeds
    },

    // persisting the user store to localStorage so the user stays logged in
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user", // key used to store the user in localStorage
          storage: localStorage,
        },
      ],
    },

    // signing in an existing user with email and password
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error; // throw error if sign in fails
      if (user) this.user = user; // saving user to store if sign in succeeds
    },

    // Sign out the currently logged-in user
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error; // throw error if sign out fails
      this.user = null; // resetting user to null after sign out
    },
  },
});
