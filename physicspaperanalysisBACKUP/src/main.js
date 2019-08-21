import Vue from 'vue'
import App from './App.vue'
import router from './router'
require('../node_modules/bootstrap/dist/css/bootstrap.css')

// Need to add icon to main.js rewritting the name in camel-case as given at
// https://fontawesome.com/icons/trash-alt?style=solid
// In the component e.g. List.vue icon="icon name"
// A bit of guessing is needed here, I can not find the exact names to use for each icon
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

// Don't forget to also add the icon name here
library.add(faEdit)
library.add(faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')