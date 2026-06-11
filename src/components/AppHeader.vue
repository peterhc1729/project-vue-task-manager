<script setup>
import logo from "../assets/hept-ih-taskmanager.png";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const signOut = async () => {
  try {
    await userStore.signOut();
    router.push({ path: "/auth" });
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <header class="app-header">
    <img :src="logo" alt="Ironhack Task Manager logo" class="logo" />
    <v-btn variant="text" color="brandGold" @click="signOut">Sign out</v-btn>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
}

.logo {
  height: 10vh;
  width: auto;
}
</style>
