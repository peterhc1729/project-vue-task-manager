import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
// Import of all Vuetify directives (e.g. v-ripple, v-resize, etc.)
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "./static/main.css";
// Import of Material Design Icons for Vuetify icons
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const brandWhite = "#fffeff";

// Initialize Vuetify with all components and directives

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          background: brandWhite,
          surface: brandWhite,
          primary: "#5fffaf",
          secondary: "#18714b",
          tertiary: "#0e2d93",
          brandWhite: brandWhite,
          brandBlack: "#000100",
          brandViolett: "#8883e4",
          appGreen2: "#8af361",
          brandGold: "#d9a520",
          quaternary: "#e2ffe1",
          brandSilver: "#d3d0d0",
          appOrange: "#FF5F00",
          error: "#d20101",
        },
      },
    },
  },
});

// Initializing Pinia and registering the persist plugin for localStorage support
const pinia = createPinia();
pinia.use(piniaPersist);

// registering Pinia for state management
app.use(pinia);

// registering Vue Router for navigation
app.use(router);

// register Vuetify for UI components
app.use(vuetify);

// mounting the app to the #app div in index.html
app.mount("#app");
