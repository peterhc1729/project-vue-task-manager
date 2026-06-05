<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const signIn = async () => {
  //if either email input field or password field is empty
  if (!email.value || !password.value) {
    errorMessage.value = "Please enter your email and password.";
    return;
  }

  try {
    loading.value = true;
    await userStore.signIn(email.value, password.value);
    router.push({ path: "/" }); // redirect to dashboard
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Vuetify utility: padding 32px on ALL sides of the div element-->
    <h1>Sign In</h1>

    <v-form>
      <!-- "v-model" links the input field to the ref variable -->
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />

      <p v-if="errorMessage">{{ errorMessage }}</p>

      <!--Button not active, if loading.value === true -->
      <v-btn
        class="w-100 mb-6"
        color="primary"
        @click="signIn"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Sign in" }}
      </v-btn>
    </v-form>
  </div>
</template>

<style></style>
