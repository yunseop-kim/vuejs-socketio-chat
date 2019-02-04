import Vue from 'vue'
import App from './App.vue'
import VueChatScroll from 'vue-chat-scroll'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueChatScroll)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.0.16:3000/chat'
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
