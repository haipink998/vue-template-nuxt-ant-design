import mutationTypes from "../constants/mutationTypes";
import templateServices from "~/services/templateServices";
import diaryServices from "~/services/diaryServices";

const state = () => ({
  templateList: null,
  template: {}
});

const getters = {
  getTemplateList: state => state.templateList,
  readTemplate: state => state.template
};
const actions = {
  async getTemplate({ commit }) {
    try {
      const res = await templateServices.getTemplate();
      const { data } = res;
      commit(mutationTypes.TEMPLATE.GET_TEMPLATE, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async readTemplate({ commit }, payload) {
    try {
      const res = await templateServices.readTemplate({ id: payload.id });
      const { data } = res;
      commit(mutationTypes.TEMPLATE.READ_TEMPLATE, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async addTemplate({ commit }, payload) {
    try {
      const { action, start_time, user, actual_date, children } = payload;
      const res = await diaryServices.addActionSon(
        action,
        start_time,
        user,
        actual_date,
        children
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async endTemplate({ commit }, payload) {
    const { id, start_time, end_time, children, user, action } = payload;
    try {
      const res = await diaryServices.endActionSon({
        id,
        start_time,
        end_time,
        children,
        user,
        action
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async updateTemplate({commit}, payload) {
    try {
      const {id,start_time,end_time,add_field,note,user,children} = payload;
      const res = await diaryServices.updateActionSon(id,start_time,end_time,add_field,note,user,children);
      return res;
    } catch (error) {
      console.log(error)
    }
  },
  async addNightEat({commit}, payload){
    try {
      const {action, start_time, actual_date, user, children} = payload;
      const res = await diaryServices.addNightEat(action, start_time, actual_date, user, children);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async endNightEat({commit}, payload){
    try {
      const {action, start_time, end_time, actual_date, user, children} = payload;
      const res = await diaryServices.endNightEat(action, start_time, end_time, actual_date, user, children);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  [mutationTypes.TEMPLATE.GET_TEMPLATE](state, payload) {
    state.templateList = payload;
  },
  [mutationTypes.TEMPLATE.READ_TEMPLATE](state, payload) {
    state.template = payload;
  },
  [mutationTypes.TEMPLATE.ADD_TEMPLATE](state, payload) {
    state.template = payload;
  },
  [mutationTypes.TEMPLATE.END_TEMPLATE](state, payload) {
    state.template = payload;
  },
  [mutationTypes.TEMPLATE.UPDATE_TEMPLATE](state, payload) {
    state.template = payload;
  },
  [mutationTypes.TEMPLATE.ADD_NIGHTEAT](state, payload){
    state.template = payload;
  },
  [mutationTypes.TEMPLATE.END_NIGHTEAT](state, payload){
    state.template = payload
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
