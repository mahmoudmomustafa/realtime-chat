import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Msg from "./views/Msg.vue";
import Auth from "./views/Auth.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "*",
      redirect: "/auth",
    },
    {
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/chat",
      name: "chat",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:contact",
      name: "msg",
      component: Msg,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!currentUser && requiresAuth) next("auth");
  else if (currentUser && !requiresAuth) next("chat");
  else next();
});

export default router;