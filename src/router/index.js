import { createRouter, createWebHashHistory } from "vue-router";
import { supabase } from "../supabase";

/* Lazy loading: pages are only loaded when needed,
via dynamic import (code splitting by route) */
const Dashboard = () => import("../pages/Dashboard.vue");
const Auth = () => import("../pages/Auth.vue");

const router = createRouter({
  /* Hash history is required for GitHub Pages to prevent 404 errors on refresh.
   It keeps the routing client-side by appending a '#' to the URL. */
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Dashboard,
      meta: { requiresAuth: true }, // only accessible to authenticated users
    },
    {
      path: "/auth",
      component: Auth,
    },
  ],
});

/* Navigation guard: runs before every route change,
protects routes and redirects based on auth state*/
router.beforeEach(async (to, from, next) => {
  // getSession() fetches the session locally from storage
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = !!session?.user;

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Guard: route requires auth but user is not logged in -> redirect to /auth
    next("/auth");
  } else if (to.path === "/auth" && isLoggedIn) {
    // Guard: user is already logged in -> redirect to /
    next("/");
  } else {
    // Guard passed -> proceed normally
    next();
  }
});

export default router;
