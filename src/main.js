import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.scss";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
