import { configure } from "@storybook/vue";
import Vue from "vue";
import Vuetify from "vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Vuetify, {
  iconfont: "md"
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
