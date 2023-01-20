import { createRouter, createWebHistory } from "vue-router";
import Annotation from "./components/Annotation.vue";

const routes = [
  { path: "/", name: "Annotation", component: Annotation },
];

export default createRouter({
  history: createWebHistory(),
  routes
});
