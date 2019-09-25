import Vue from 'vue'
import router from '../router'
import VueAnnouncer from 'vue-announcer'
Vue.use(VueAnnouncer, {}, router);

export default new VueAnnouncer();
