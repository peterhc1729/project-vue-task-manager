import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  // Initial state: user is null until logged in
  state: () => ({
    user: null,
  }),

  /* Getter to make the login state readable for the router,
 converting the complex user object into a simple boolean*/
  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    // Fetches the currently logged-in user from Supabase
    async fetchUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        this.user = user;
      } catch (error) {
        this.user = null;
      }
    },

    // Signs up a new user with email and password
    async signUp(email, password) {
      /* Dynamically generates the URL with '#', whether we are testing 
   locally or the app is live on GitHub Pages */
      const redirectUrl =
        window.location.origin + window.location.pathname + "#/auth";

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: redirectUrl, // Passes the hash URL to Supabase for the email link
        },
      });
      if (error) throw error;
      if (data.user) this.user = data.user;
    },

    // Signs in an existing user with email and password
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (data.user) this.user = data.user;
    },

    // Signs out the currently logged-in user
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
  },

  // Persists user to localStorage so the session survives page reloads
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
