<script setup>
import taskManagerAd from "../assets/ihtm-ad.png";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import { ref } from "vue";

const authView = ref(0); // 0 = SignIn, 1 = SignUp
</script>

<template>
  <div class="page-layout">
    <!--left side of page for SignIn and SignOut-->
    <div class="auth-side">
      <v-card>
        <!-- v-card-text adds default padding-->
        <v-card-text>
          <!--v-window always shows one slide (v-window-item), 
      depending on the value of v-model.-->
          <v-window v-model="authView">
            <v-window-item :value="0">
              <SignIn />
            </v-window-item>

            <v-window-item :value="1">
              <SignUp />
            </v-window-item>

            <div class="auth-btns">
              <div v-if="authView === 0">
                Not registered yet?
                <!--".prevent" stops the browser from jumping to the top-->
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
          </v-window>
        </v-card-text>
      </v-card>
    </div>

    <!-- Right half: App ad graphic-->
    <div class="hero-image">
      <img :src="taskManagerAd" alt="Ironhaeck Task Manager Ad" />
    </div>
  </div>
</template>

<style scoped>
.v-window {
  overflow: visible;
  width: 100%;
}

.auth-side {
  border-right: solid 1.5px rgb(var(--v-theme-brandGold));
  display: flex;
  justify-content: flex-start;
  width: 28vw;
  min-height: 100vh;
  padding-top: 6rem;
  margin: 0;
}

.v-card {
  width: 100%;
  max-width: 420px;
  height: 89vh;
  box-shadow: none !important;
}

.v-card-text {
  border: 2px solid crimson;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 2rem;
  height: 100%;
  width: 94%;
}

.auth-btns {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.auth-btns > div {
  padding: 0;
  margin: 0;
}

.auth-link {
  color: rgb(var(--v-theme-brandGold));
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}

.v-window-item {
  margin: 0;
  padding: 0;
}

:deep(.v-window) {
  padding: 0 !important;
}

:deep(.v-window-item) {
  padding: 0 !important;
}

.page-layout {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  align-items: stretch;
}

.hero-image {
  width: 72vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.hero-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
