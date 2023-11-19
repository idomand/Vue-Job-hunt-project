import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/index.css";
import App from "@/App.vue";
import router from "./Router";
//=================
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//=================

library.add(faAngleDown);
library.add(faSearch);
library.add(faAngleUp);

const pinia = createPinia();
createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
