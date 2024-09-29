
import Vue from 'vue';
import Vuex from 'vuex';
import { searchStore } from './searchStore';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search: searchStore
  }
});