import Vue from 'vue'
import App from './App.vue'
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '0c3b5aa083f840f9e7068e3e2456b0f3',
  plugin: ['AMap.Scale','AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
