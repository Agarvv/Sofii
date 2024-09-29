import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    filteredContent: {
      users: [],
      posts: [],
      videos: []
    }
  },
  mutations: {
    setContentUsers(state, content) {
      state.filteredContent.users = content;
    },
    setContentPosts(state, content) { 
      state.filteredContent.posts = content;
    },
    setContentVideos(state, content) {
      state.filteredContent.videos = content;
    }
  },
  actions: {
    filter({ commit, state }, filters) {
      
      if (filters.users.following) {
        const filteredUsers = state.filteredContent.users.filter(
          user => user.isFollowing === true
        );
        commit('setContentUsers', filteredUsers);
      }
      
      
    }
  },
  getters: {
    content: state => state.filteredContent // Esto devolverá todo el contenido filtrado
  }
});