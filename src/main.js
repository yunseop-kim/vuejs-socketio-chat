import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://172.30.1.18:3000/chat'
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
