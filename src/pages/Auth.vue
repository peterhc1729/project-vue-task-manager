<script setup>
//import heptagonIronhaeck from "@/assets/ironhaeck-heptagon.png";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import { ref } from "vue";

const authView = ref(0); // 0 = SignIn, 1 = SignUp
</script>

<template>
  <div>
    <!--<img :src="heptagonIronhaeck" alt="IronHäck Logo" />-->
  </div>
  <v-container>
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
        </v-window>

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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-window {
  overflow: visible;
  width: 100%;
}

.v-container {
  border: 4px solid greenyellow;
  display: flex;
  justify-content: center;
  width: 50vw;
  min-height: 100vh;
  align-items: center;
  margin: 0;
}

.v-card {
  height: 62vh;
  max-width: 80vw;
  width: 50%;
}

.v-card-text {
  border: 4px solid rgb(249, 244, 99);
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.auth-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.auth-btns > div {
  border: 4px solid rgb(231, 96, 12);
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
  border: 4px solid rgb(80, 15, 72);
  margin: 0;
  padding: 0;
}

:deep(.v-window) {
  padding: 0 !important;
}

:deep(.v-window-item) {
  padding: 0 !important;
}
</style>
