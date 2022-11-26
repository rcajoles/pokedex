import Vue from 'vue';
import axios from 'axios';
import store from './store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from './components/HomePage.vue';
import ListingPage from './components/ListingPage.vue';
import SavedPage from './components/SavedPage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';


let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/listing/:listing', component: ListingPage, name: 'listing' },
    { path: '/saved', component: SavedPage, name: 'saved' },
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/register', component: RegisterPage, name: 'register' }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  let serverData = window.server_data;

  console.log('store.state');
  console.log(store.state);
  for (const key in store.state) {
    console.log('Object.hasOwnProperty.call(store.state, key)');
    console.log(Object.hasOwnProperty.call(store.state, key));
    console.log('key: ', key);
    
    if (Object.hasOwnProperty.call(store.state, key)) {
      const vuexState = store.state[key];
      console.log('vuexState: ');
      console.log(vuexState);
      const storage = Vue.ls.get(`state.${key}`); 
      console.log('storage');
      console.log(storage);
      
      switch (key) {
        case 'user':
          if (storage && storage.hasOwnProperty('email') && !vuexState.hasOwnProperty('email')) {
            store.commit('addData', {user: storage});
          }
          break;
      
        case 'saved':
          if (storage && storage.length > 0 && !vuexState.length < 1) {
            store.commit('toggleSaved', {user: strg});
          }
          break;
          
        case 'disliked':
          if (storage && storage.length > 0 && !vuexState.length < 1) {
            store.commit('togleDisliked', {user: strg});
          }
          break;
          
        case 'listings':
          if (storage && storage.length > 0 && !vuexState.length < 1) {
            store.commit('addData', {route: 'listing', data: {listings: storage}});
          }
          break;

        case 'listing_summaries':
          if (storage && storage.length > 0 && !vuexState.length < 1) {
            store.commit('addData', {route: to.name, data: {listings: storage}});
          }
          break;
        
        case 'auth':
          if (storage && !vuexState) {
            store.commit('addData', {route: '/', data: { auth: storage } }); 
          }
          break;

        default:
          break;
      }
    }
  }
  // if (this.$store.state) {
    
  // }
  console.log('serverData: ');
  console.log(serverData);
  // console.log('TO: ');
  // console.log(to);
  // console.log('From: ');
  // console.log(from);
  // console.log('!serverData.path || to.path !== serverData.path');
  // console.log(!serverData.path || to.path !== serverData.path);
  // console.log("to.name === 'listing'");
  // console.log(to.name === 'listing');
  // console.log("store.getters.getListing(to.params.listing)");
  // console.log(store.getters.getListing(to.params.listing));
  // console.log("store.state.listing_summaries.length > 0");
  // console.log(store.state.listing_summaries);
  
  // console.log(`(
  //   to.name === 'listing'
  //     ? store.getters.getListing(to.params.listing)
  //     : store.state.listing_summaries.length > 0
  //     || to.name === 'login'
  //     || to.name === 'register'
  // )`);
  // console.log((
  //   to.name === 'listing'
  //     ? store.getters.getListing(to.params.listing)
  //     : (store.state.listing_summaries)
  //     || to.name === 'login'
  //     || to.name === 'register'
  // ));
  if (
    to.name === 'listing'
      ? store.getters.getListing(to.params.listing)
      : (store.state.listing_summaries)
      || to.name === 'login'
      || to.name === 'register'
  ) {
    next();
  }
  else if (!serverData.path || to.path !== serverData.path) {
    axios.get(`/api${to.path}`).then(({data}) => {
      store.commit('addData', {route: to.name, data});
      next();
    });

  }
  else {
    store.commit('addData', {route: to.name, data: serverData});
    serverData.saved.forEach(id => store.commit('toggleSaved', id));
    next();
  }
});

export default router;
