<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);

const signUp = async () => {
  //if either email input field or password field is empty
  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  try {
    loading.value = true;
    // call the signUp action from the user store with the email and password
    await userStore.signUp(email.value, password.value);
    errorMessage.value =
      "Please check your email and click the confirmation link.";
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Sign Up</h1>

    <v-form>
      <!-- "v-model" links the input field to the ref variable -->
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />
      <v-text-field
        label="Confirm Password"
        type="password"
        v-model="confirmPassword"
      />
      <p v-if="errorMessage">{{ errorMessage }}</p>

      <!--Button not active, if loading.value === true -->
      <v-btn
        class="w-100 mb-6"
        color="primary"
        @click="signUp"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Create account" }}
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped></style>
