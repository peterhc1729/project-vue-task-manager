<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);
</script>

<template>
  <div>
    <h1>Sign Up</h1>

    <v-form>
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />
      <v-text-field
        label="Confirm Password"
        type="password"
        v-model="confirmPassword"
      />
      <v-btn @click="signUp" :disabled="loading">
        {{ loading ? "Loading..." : "Register" }}
      </v-btn>
    </v-form>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style></style>
