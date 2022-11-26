import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import router from './router';
import axios from 'axios';
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': window.csrf_token
};

axios.defaults.withCredentials = true;
axios.defaults['Access-Control-Allow-Origin'] = '*';

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    saved: [],
    disliked: [],
    listing_summaries: [],
    listings: [],
    auth: false
  },
  mutations: {
    toggleSaved(state, id) {
      let index = state.saved.findIndex(saved => saved === id);
      if (index === -1) {
        state.saved.push(id);
      } else {
        state.saved.splice(index, 1);
      }

      // Vue.ls.set('foo', 'boo');
      // ls.get('foo');
      Vue.ls.set('state.saved', state.saved);
    },
    toggleDisliked(state, id) {
      let index = state.disliked.findIndex(disliked => disliked === id);
      if (index === -1) {
        state.disliked.push(id);
      } else {
        state.disliked.splice(index, 1);
      }
      Vue.ls.set('state.disliked', state.disliked);
    },
    addData(state, { route, data }) {
      console.log('data: ');
      console.log(data);
      console.log('state: ');
      console.log(state);
      console.log('route: ');
      console.log(route);
      if (data && data.hasOwnProperty('auth')) {
        state.auth = data.auth;
        Vue.ls.set('state.auth', data.auth);
        
      }
      
      if (data && data.hasOwnProperty('token')) {
        state.token = data.token;
        Vue.ls.set('state.token', data.token);
      }

      if (data && data.hasOwnProperty('user')) {
        state.user = data.user;
        Vue.ls.set('state.user', data.user);
      }

      if (data && data.hasOwnProperty('saved')) {
        state.saved = data.saved;
        Vue.ls.set('state.saved', data.saved)
      }

      if (route === 'listing') {
        state.listings.push(data.listings );
        Vue.ls.set('state.listings', state.listings);
      } else {
        console.log('check state: ');
        console.log(Vue.ls.get('state.listing_summaries'));
        if (data && data.hasOwnProperty('listings') && data.listings) {
          state.listing_summaries = data.listings;
          Vue.ls.set('state.listing_summaries', state.listing_summaries);
        }
      }
    }
  },
  getters: {
    getListing(state) {
      return id => state.listings.find(listing => id == listing.id);
    }
  },
  actions: {
    toggleSaved({ commit, state }, id) {
      if (state.auth) {
        axios.post('/api/user/toggle_saved', { id }).then(
          () => commit('toggleSaved', id)
        );
      } else {
        router.push('/login');
      }
    },
    toggleDisliked({ commit, state }, id) {
      if (state.auth) {
        axios.post('/api/user/toggle_disliked', { id }).then(
          () => commit('toggleDisliked', id)
        );
      } else {
        router.push('/login');
      }
    }
  },
});
