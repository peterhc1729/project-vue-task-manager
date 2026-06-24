<script setup>
import logo from "../assets/heptagon-ih-taskmanager.svg";
</script>

<template>
  <header class="app-header">
    <img :src="logo" alt="Ironhack Task Manager logo" class="logo" />
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.logo {
  height: 2rem;
  width: auto;
}

/* xs: bis 599px */
@media (max-width: 599px) {
  .app-header {
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
}

/* sm: 600px – 959px */
@media (min-width: 600px) and (max-width: 959px) {
  .logo {
    height: 2rem;
  }
}

/* md+: 960px+ */
@media (min-width: 960px) {
  .logo {
    height: 3rem;
    margin: 0.9rem 0;
  }
}
</style>
