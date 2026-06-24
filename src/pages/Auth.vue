<script setup>
import adLarge from "../assets/adLg.png";
import adMd from "../assets/adMd.png";
import wallPaperSm from "../assets/wallpaper-Sm.png";
import AppHeader from "../components/AppHeader.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import { ref } from "vue";

const authView = ref(0); // 0 = SignIn, 1 = SignUp

// Rules for the email input v-text-field
const emailRules = [
  // Rule 1: Check if the field is not empty
  (value) => {
    if (value) return true;
    return "E-mail is required.";
  },
  // Rule 2: Check for the "@" symbol
  (value) => {
    if (value?.includes("@")) return true;
    return 'E-mail must contain an "@" symbol.';
  },
];
</script>

<template>
  <div class="page-layout">
    <header class="app-header mobile-only-header">
      <AppHeader />
    </header>

    <div class="auth-side stripes-bg">
      <v-card class="rounded-lg">
        <v-card-text>
          <v-window v-model="authView">
            <v-window-item :value="0">
              <SignIn :email-rules="emailRules" />
            </v-window-item>

            <v-window-item :value="1">
              <SignUp :email-rules="emailRules" />
            </v-window-item>
          </v-window>

          <div class="auth-btns">
            <div v-if="authView === 0">
              Not registered yet?
              <a href="#" class="auth-link" @click.prevent="authView = 1"
                >Sign up here</a
              >
            </div>

            <div v-else>
              Already have an account?
              <a href="#" class="auth-link" @click.prevent="authView = 0"
                >Sign in</a
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="hero-image">
      <picture>
        <source media="(max-width: 959px)" :srcset="wallPaperSm" />
        <source media="(max-width: 1279px)" :srcset="adMd" />
        <img :src="adLarge" alt="Ironhaeck Task Manager Ad" />
      </picture>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4.5rem;
  background-color: white;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 0 1.5rem;
}

.mobile-only-header {
  /* not visible with desktop viewport */
  display: none !important;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: stretch;
}

/* lg: desktop view (default) */
.auth-side {
  width: 27vw;
  min-width: 290px;
  flex-shrink: 1;
  border-right: solid 1.6px rgb(var(--v-theme-brandGold));
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0;
}

:deep(.v-card) {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 360px;
  box-shadow: none !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: max-content !important;
}

.v-card-text {
  padding: 1.2rem 1.7rem !important;
  height: auto;
  width: 100%;
}

.hero-image {
  /* fills out the entire remaining space */
  flex-grow: 1;

  width: 73vw;
  height: auto;
  overflow: hidden;
}

.hero-image picture {
  display: block;
  width: 100%;
  height: 100%;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 35% center;
}

:deep(h1) {
  margin-bottom: 0.5rem !important;
}

:deep(.v-input) {
  width: 100% !important;
}

/* Removes gap for last field to pull buttons closer */
:deep(.v-input:last-of-type) {
  margin-bottom: 0px !important;
}

.v-window {
  overflow: visible;
  width: 100%;
}

.auth-btns {
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
  gap: 0.5rem;
  font-size: 1rem;
}

.auth-link {
  color: rgb(var(--v-theme-brandGold));
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}

:deep(.btn-wrapper) {
  display: flex !important;
  justify-content: center !important;
  width: 100% !important;
  margin-top: 0rem !important;
}

/* Error messages (if emailRules criteria not considered)*/
:deep(.v-input__details) {
  padding-top: 7px !important;

  /* prevents Vuetify from blocking space unnecessarily */
  min-height: auto !important;
}

:deep(.v-messages) {
  text-align: center !important;
  width: 100%;
}

/* md: view for middle-sized devices (960px – 1279px) */
@media (min-width: 960px) and (max-width: 1279px) {
  .auth-side {
    padding-top: 5rem;
  }

  .hero-image img {
    object-position: left center;
  }

  :deep(.v-card) {
    max-width: 320px !important;
  }
}

/* sm + xs: mobile views (< 960px) */
@media (max-width: 959px) {
  .mobile-only-header {
    display: flex !important;
  }

  .page-layout {
    position: relative;
    padding-top: 0;
  }

  .hero-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
  }

  .auth-side {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 100dvh;
    border-right: none;
    padding-top: 10rem;
    background: transparent;
    align-items: flex-start;
  }

  :deep(.v-card) {
    background: rgba(255, 255, 255, 0.89) !important;
    padding-bottom: 1.5rem;
  }

  :deep(.v-card-text) {
    height: auto !important;
    padding-bottom: 0 !important;
  }
}

/* xs only: (< 600px) */
@media (max-width: 599px) {
  :deep(h1) {
    width: 100% !important;
    text-align: left;
  }

  :deep(.v-input input),
  :deep(.v-input .v-label) {
    font-size: 0.9rem !important;
  }

  :deep(.v-btn) {
    max-width: 100% !important;
  }
}
</style>
