import Vue from 'vue'
import Vuex from 'vuex'
import state from "./comm/state";
import actions from "./comm/actions";
import getters from "./comm/getters";
import mutations from "./comm/mutations";
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
