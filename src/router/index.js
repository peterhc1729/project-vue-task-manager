import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase";

/* Lazy loading: pages are only loaded when needed,
via dynamic import (code splitting by route) */
const Dashboard = () => import("../pages/Dashboard.vue");
const Auth = () => import("../pages/Auth.vue");

const routes = [
  {
    path: "/",
    component: Dashboard,
    meta: { requiresAuth: true }, // only accessible to authenticated users
  },
  {
    path: "/auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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
