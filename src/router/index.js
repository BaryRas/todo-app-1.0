import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MainTodos from "../views/MainTodos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/main-todos/:categorie/:id",
    name: "MainTodos",
    component: MainTodos,
  },
  {
    path: "*", // catch all wrong path
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }; // to.hash ==> hash: '#data' we were setup
    }
    return { x: 0, y: 0 };
  },
});

export default router;
