import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../Views/HomeView.vue";
import JobResultsView from "../Views/JobResultsView.vue";
import JobView from "../Views/JobView.vue";
import TeamView from "../Views/TeamView.vue";

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
  {
    path: "/teams",
    name: "TeamView",
    component: TeamView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
