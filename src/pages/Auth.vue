<script setup>
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import { ref } from "vue";

const authView = ref(0); // 0 = SignIn, 1 = SignUp
</script>

<template>
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

        <div>
          <div v-if="authView === 0">
            Not registered yet?
            <v-btn variant="text" color="" @click="authView = 1">
              Sign up here
            </v-btn>
          </div>

          <div v-else>
            Already have an account?
            <v-btn variant="text" @click="authView = 0"> Sign in </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card {
  height: 70vh;
  max-width: 80vw;
  width: 100%;
}
</style>
