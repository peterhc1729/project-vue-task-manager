<template>
  <v-app>
    <section>
      <router-view class="app-main" />
    </section>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";

const router = useRouter();
const userStore = useUserStore(); //Pinia store
const { user } = storeToRefs(userStore); // user is either null (not logged in)
// or a Supabase user object

onMounted(async () => {
  try {
    await userStore.fetchUser(); // calling fetch user
    if (!user.value) {
      // redirecting them to logout if the user is not there
      router.push({ path: "/auth" }); //user not logged in
    } else {
      // continue to dashboard, if user is logged in
      router.push({ path: "/" }); // redirected to dashboard
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
