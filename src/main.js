import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// // prevent dragging of ghost image
// document.addEventListener("dragstart", function( event ) {
//   event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
// }, false);