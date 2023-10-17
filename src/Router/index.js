import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../Views/HomeView.vue";
import JobResultsView from "../Views/JobResultsView.vue";
import JobView from "../Views/JobView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobView",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
