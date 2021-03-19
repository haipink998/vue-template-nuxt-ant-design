import newsServices from "~/services/newsServices";
import mutationTypes from "../constants/mutationTypes";


const state = () => ({
  news: null,
});

const getters = {
  newsList: state => state.news
};

const actions = {
  async getNews({ commit }){
    try {
      const res = await newsServices.getNews();
      const { data } = res;
      commit(mutationTypes.USER.GET_NEWS, data);
      return data
    } catch (error) {
      console.log(data);
    }
  }
  
}
const mutations = {
  [mutationTypes.USER.GET_NEWS](state, payload){
    state.news = payload
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
}