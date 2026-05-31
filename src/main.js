import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
// Import of all Vuetify directives (e.g. v-ripple, v-resize, etc.)
import * as directives from "vuetify/directives";
import "vuetify/styles";
// Import of Material Design Icons for Vuetify icons
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Initialize Vuetify with all components and directives

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#4f7cff",
        },
      },
    },
  },
});

// registering Pinia for state management
app.use(createPinia());
// registering Vue Router for navigation
app.use(router);
// register Vuetify for UI components
app.use(vuetify);

// mounting the app to the #app div in index.html
app.mount("#app");
