import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import HomePage from "./HomePage.vue";
import "./styles/custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
  },
} satisfies Theme;
