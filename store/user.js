import userServices from "~/services/userServices";
import mutationTypes from "../constants/mutationTypes";

/**
 * initial state
 */
const state = () => ({
  userInfo: null
});

/**
 * initial getters
 */
const getters = {
  getUserInfo: state => state.userInfo,
  getIdOfSon: (state) =>  state.userInfo?.user_children?.[0]?.id,
};
/**
 * initial actions
 */
const actions = {
  async getUser({ commit }, payload) {
    try {
      const response = await userServices.getUser({ id: payload.id });
      const { data } = response;
      commit(mutationTypes.USER.SET_USER, data)
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async getSon({ commit }, payload) {
    try {
      const response = await userServices.getSon({ id: payload.id });
      const { data } = response;
      commit(mutationTypes.USER.SET_SON, data)
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateUser({commit}, payload) {
    try {
      const { id,email,first_name,last_name,user_profile,user_children } = payload;
      const res = await userServices.updateUser( id,email,first_name,last_name,user_profile,user_children);
      return res;
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * initial mutations
 */

const mutations = {
  [mutationTypes.USER.SET_USER](state, payload) {
    state.userInfo = payload;
  },
  [mutationTypes.USER.UPDATE_USER](state, payload) {
    state.userInfo = payload;
  }

};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};