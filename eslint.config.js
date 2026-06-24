import globals from "globals";
import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

/* This configuration defines Vue rules, browser environment settings, 
and custom rule overrides.*/

export default [
  /* Vue recommended configuration preset.
   Provides best-practice rules for Vue 3 projects,
   including template syntax and component structure checks.
   */
  ...vue.configs["flat/recommended"],
  prettier,

  //Project-specific ESLint configuration overrides
  {
    languageOptions: {
      /* Enables ES module syntax (import/export),
       required for Vite + Vue projects.*/
      sourceType: "module",

      /* defining browser global variables (e.g. window, document, localStorage);
       prevents ESLint from flagging browser globals as undefined.*/
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      // Warns when variables are declared but never used;

      "no-unused-vars": "warn",

      /*Encourages multi-word component names; 
      helps avoid conflicts with native HTML elements;
    Set to "warn" to enforce consistency without being too strict 
       */
      "vue/multi-word-component-names": "warn",
    },
  },
];
