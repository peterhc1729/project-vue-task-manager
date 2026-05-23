import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Auth from "../pages/Auth.vue";

// Define the routes for the app
const routes = [
  {
    // Root route - displays the Dashboard after login
    path: "/",
    component: Dashboard,
  },
  {
    // Auth route - displays the Sign In / Sign Up forms
    path: "/auth",
    component: Auth,
  },
];

// Create the router instance with HTML5 history mode
const router = createRouter({
  // createWebHistory enables clean URLs without # (e.g. /auth instead of /#/auth)
  history: createWebHistory(),
  routes,
});

// Export the router so it can be registered in main.js
export default router;
