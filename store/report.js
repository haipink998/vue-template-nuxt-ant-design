
import mutationTypes from "~/constants/mutationTypes";
import reportServices from "~/services/reportServices";
const state = () => ({
  chart: null
});

const getters = {
  getChart: state => state.chart,
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
  }
}

const mutations = {
  [mutationTypes.CHART.GET_CHART](state, payload) {
    state.chart = payload
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
}