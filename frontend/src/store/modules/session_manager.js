import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */

export default {
  // name: 'SessionManager',
  state: {
    // default data of user and user_token
    auth_token: null,
    user: {
      id: null,
      user_name: null,
      email: null,
    },
  },

  getters: {
    getAuthToken(state) {
      return state.auth_token;
    },
    getUserEmail(state) {
      return state.user?.email;
    },
    getUserID(state) {
      return state.user?.id;
    },
    isLoggedIn(state) {
      const loggedOut = state.auth_token == null || state.auth_token === JSON.stringify(null);
      return !loggedOut;
    },
  },

  actions: {
    registerUser({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}users`, payload)
          .then((response) => {
            commit('setUserInfo', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginUser({ commit }, payload) {
      new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}users/sign_in`, payload)
          .then((response) => {
            commit('setUserInfo', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logoutUser({ commit }, state) {
      const config = {
        headers: {
          authorization: state.auth_token,
        },
      };
      new Promise((resolve, reject) => {
        axios
          .delete(`${BASE_URL}users/sign_out`, config)
          .then(() => {
            commit('resetUserInfo');
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginUserWithToken({ commit }, payload) {
      const config = {
        headers: {
          Authorization: payload.auth_token,
        },
      };
      new Promise((resolve, reject) => {
        axios
          .get(`${BASE_URL}member-data`, config)
          .then((response) => {
            commit('setUserInfoFromToken', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },

  mutations: {
    setUserInfo(state, data) {
      state.user = data.data.user;
      state.auth_token = data.headers.authorization;
      axios.defaults.headers.common.Authorization = data.headers.authorization;
      localStorage.setItem('auth_token', data.headers.authorization);
    },
    setUserInfoFromToken(state, data) {
      state.user = data.data.user;
      state.auth_token = localStorage.getItem('auth_token');
    },
    resetUserInfo(state) {
      state.user = {
        id: null,
        username: null,
        email: null,
      };
      state.auth_token = null;
      localStorage.removeItem('auth_token');
      axios.defaults.headers.common.Authorization = null;
    },
  },
};

// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/';

// const state = {
//   auth_token: null,
//   user: {
//     id: null,
//     username: null,
//     email: null,
//   },
// };
// const getters = {
//   getAuthToken(state) {
//     return state.auth_token;
//   },
//   getUserEmail(state) {
//     return state.user?.email;
//   },
//   getUserID(state) {
//     return state.user?.id;
//   },
//   isLoggedIn(state) {
//     const loggedOut = state.auth_token == null || state.auth_token === JSON.stringify(null);
//     return !loggedOut;
//   },
// };
// const actions = {
//   registerUser({ commit }, payload) {
//     return new Promise((resolve, reject) => {
//       axios
//         .post(`${BASE_URL}users`, payload)
//         .then((response) => {
//           commit('setUserInfo', response);
//           resolve(response);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },
//   loginUser({ commit }, payload) {
//     new Promise((resolve, reject) => {
//       axios
//         .post(`${BASE_URL}users/sign_in`, payload)
//         .then((response) => {
//           commit('setUserInfo', response);
//           resolve(response);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },
//   logoutUser({ commit }) {
//     const config = {
//       headers: {
//         authorization: state.auth_token,
//       },
//     };
//     new Promise((resolve, reject) => {
//       axios
//         .delete(`${BASE_URL}users/sign_out`, config)
//         .then(() => {
//           commit('resetUserInfo');
//           resolve();
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },
//   loginUserWithToken({ commit }, payload) {
//     const config = {
//       headers: {
//         Authorization: payload.auth_token,
//       },
//     };
//     new Promise((resolve, reject) => {
//       axios
//         .get(`${BASE_URL}member-data`, config)
//         .then((response) => {
//           commit('setUserInfoFromToken', response);
//           resolve(response);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },
// };
// const mutations = {
//   setUserInfo(state, data) {
//     state.user = data.data.user;
//     state.auth_token = data.headers.authorization;
//     axios.defaults.headers.common.Authorization = data.headers.authorization;
//     localStorage.setItem('auth_token', data.headers.authorization);
//   },
//   setUserInfoFromToken(state, data) {
//     state.user = data.data.user;
//     state.auth_token = localStorage.getItem('auth_token');
//   },
//   resetUserInfo(state) {
//     state.user = {
//       id: null,
//       username: null,
//       email: null,
//     };
//     state.auth_token = null;
//     localStorage.removeItem('auth_token');
//     axios.defaults.headers.common.Authorization = null;
//   },
// };
// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// };
