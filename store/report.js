
import mutationTypes from "~/constants/mutationTypes";
import reportServices from "~/services/reportServices";
const state = () => ({
  chart: null,
  height: null,
  addWeight: null,
});

const getters = {
  getChart: state => state.chart,
  getHeight: state => state.height,

  
};

const actions = {
  async getChart({commit}) {
    try {
      const res = await reportServices.getChart();
      const {data} = res;
      commit(mutationTypes.CHART.GET_CHART, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async getHeight({commit}) {
    try {
      const res = await reportServices.getHeight();
      const {data} = res;
      commit(mutationTypes.CHART.GET_HEIGHT, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async addWeight({commit}, payload) {
    try {
      const {action,start_time,actutal_date,user,children,add_field} = payload;
      const res = await reportServices.addWeight(payload);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  
}

const mutations = {
  [mutationTypes.CHART.GET_CHART](state, payload) {
    state.chart = payload
  },
  [mutationTypes.CHART.GET_HEIGHT](state, payload){
    state.height = payload
  },
  [mutationTypes.CHART.ADD_CHART](state, payload){
    state.addWeight = payload
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}