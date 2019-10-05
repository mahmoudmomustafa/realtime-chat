import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "tailwindcss/dist/tailwind.min.css";
import "tailwindcss/dist/utilities.min.css";
import "tailwindcss/dist/utilities.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import WOW from "wow.js";

Vue.config.productionTip = false;
window.firebase = firebase;
window.moment = moment;
window.WOW = WOW;
new WOW().init();
let app;

var firebaseConfig = {
  
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
