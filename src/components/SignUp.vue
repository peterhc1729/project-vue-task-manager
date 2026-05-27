<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)
</script>

<template>
    <div>
    <h1>Sign Up</h1>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />

    <button @click="signUp" :disabled="loading">
      {{ loading ? 'Loading...' : 'Register' }}
    </button>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>


<style></style>