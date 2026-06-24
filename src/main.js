import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
// Imports all Vuetify directives (v-ripple, v-resize, etc.)
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "./static/main.css";
// Material Design Icons for Vuetify
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";

const brandWhite = "#fffeff";

// Vuetify UI framework instance: UI component library with custom theme colors
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
          brandWhite,
          brandBlack: "#000100",
          brandViolett: "#8883e4",
          appGreen2: "#8af361",
          brandGold: "#d9a520",
          quaternary: "#e2ffe1",
          quinary: "#10d645",
          brandSilver: "#d3d0d0",
          appOrange: "#FF5F00",
          error: "#d20101",
        },
      },
    },
  },
});

// Pinia: state management with localStorage persistence
const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

//Register plugins
app.use(pinia);
app.use(router);
app.use(vuetify);

// Vue (mounts) its reactive app to DOM node
app.mount("#app");
