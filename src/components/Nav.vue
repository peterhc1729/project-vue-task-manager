<script setup>
import { useRouter } from "vue-router";
import logo from "../assets/heptagon-ih-taskmanager.svg";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();

const signOut = async () => {
  try {
    await userStore.signOut();
    router.push("/auth");
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <header class="nav-bar">
    <img :src="logo" alt="Ironhack Task Manager logo" class="logo" />
    <v-btn
      variant="text"
      color="brandGold"
      class="sign-out-btn"
      @click="signOut"
    >
      Sign out
    </v-btn>
  </header>
</template>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Nav bar is scrolling along */
  position: relative;

  padding: 0.5rem 1.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/nav-bg.png");
}

.logo {
  width: auto;
}

/* xs: bis 599px */
@media (max-width: 599px) {
  .nav-bar {
    height: 4.5rem;
    padding: 0.5rem 0.7rem;
  }

  .logo {
    height: 1.6rem;
  }

  .sign-out-btn {
    font-size: 0.8rem !important;
  }
}

/* sm: 600px – 959px */
@media (min-width: 600px) and (max-width: 959px) {
  .nav-bar {
    height: 4.5rem;
  }

  .logo {
    height: 1.7rem;
  }

  .sign-out-btn {
    font-size: 1rem !important;
  }
}

/* md+: 960px+ */
@media (min-width: 960px) {
  .logo {
    height: 3rem;
    margin: 0.9rem 0;
  }

  .sign-out-btn {
    font-size: 1.2rem !important;
  }
}
</style>
