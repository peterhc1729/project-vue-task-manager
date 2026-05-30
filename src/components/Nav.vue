<script setup>
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");

const signOut = async () => {
  try {
    loading.value = true;
    await userStore.signOut();
    router.push({ path: "/auth" }); // redirect to login page
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-btn variant="text" color="indigo" @click="signOut"> Sign out </v-btn>
</template>

<style scoped></style>
