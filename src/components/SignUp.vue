<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";

// receives emailRules from parent Auth.vue
defineProps({
  emailRules: {
    type: Array,
    required: true,
  },
});

const userStore = useUserStore();
const email = ref("");
const myForm = ref(null);
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

const signUp = async () => {
  // triggering Vuetify validation manually
  const { valid } = await myForm.value.validate();
  if (!valid) return; // Stops, if "@" is missing

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
    errorMessage.value = ""; // Reset previous error message on a new attempt
    successMessage.value = ""; // Reset previous success message
    loading.value = true;

    // call the signUp action from the user store with the email and password
    await userStore.signUp(email.value, password.value);

    successMessage.value =
      "Please check your email and click the confirmation link.";
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="signup-container">
    <h1 class="signup-title">Sign up</h1>

    <v-form ref="myForm" @submit.prevent="signUp" class="form">
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
          successMessage = '';
        "
      />

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        hide-details="auto"
        @focus="
          errorMessage = '';
          successMessage = '';
        "
      />

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        hide-details="auto"
        @focus="
          errorMessage = '';
          successMessage = '';
        "
      />

      <p v-if="errorMessage" class="error-text">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-text">
        {{ successMessage }}
      </p>

      <div class="btn-wrapper">
        <v-btn
          type="submit"
          class="register-btn"
          color="primary"
          :loading="loading"
        >
          Create account
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.signup-container {
  width: 100%;
}

.signup-title {
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

.success-text {
  color: rgb(var(--v-theme-secondary));
  text-align: center;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.register-btn {
  font-weight: bold !important;
  width: 12rem !important;
  max-width: 100% !important;
  padding-left: 2.5rem !important;
  padding-right: 2.5rem !important;
  height: 2.8rem !important;
  border-radius: 6px !important;
  text-transform: none !important;
}

/* xs only: mobile views (< 600px) */
@media (max-width: 599px) {
  .signup-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .register-btn {
    width: 100% !important;
  }
}
</style>
