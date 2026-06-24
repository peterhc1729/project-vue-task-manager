<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

// receives emailRules from parent Auth.vue
defineProps({
  emailRules: {
    type: Array,
    required: true,
  },
});

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const myForm = ref(null);
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const signIn = async () => {
  // triggering Vuetify validation manually
  const { valid } = await myForm.value.validate();
  if (!valid) return; // Stops, if "@" is missing

  // if either email input field or password field is empty
  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }
  try {
    // Reset previous error message on a new attempt
    errorMessage.value = "";
    loading.value = true;
    await userStore.signIn(email.value, password.value);

    // redirect to dashboard
    router.push({ path: "/" });
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="signin-container">
    <h1 class="signin-title">Sign in</h1>

    <v-form ref="myForm" @submit.prevent="signIn" class="form">
      <v-text-field
        v-model="email"
        label="E-mail"
        type="email"
        :rules="emailRules"
        base-color="brandGold"
        validate-on="submit"
        hide-details="auto"
        @focus="
          myForm.resetValidation();
          errorMessage = '';
        "
      />

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        hide-details="auto"
        @focus="errorMessage = ''"
      />

      <p v-if="errorMessage" class="error-text">
        {{ errorMessage }}
      </p>

      <div class="btn-wrapper">
        <v-btn
          type="submit"
          class="login-btn"
          color="primary"
          :loading="loading"
        >
          Log in
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.signin-container {
  width: 100%;
}

.signin-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.error-text {
  color: rgb(var(--v-theme-error));
  text-align: center;
  font-size: 0.9rem;
  margin: 0;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.login-btn {
  font-weight: bold !important;
  width: 12rem !important;
  max-width: 100% !important;
  padding-left: 2.3rem !important;
  padding-right: 2.3rem !important;
  height: 2.8rem !important;
  border-radius: 6px !important;
  text-transform: none !important;
}

/* xs only: mobile views (< 600px) */
@media (max-width: 599px) {
  .signin-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .login-btn {
    width: 100% !important;
  }
}
</style>
