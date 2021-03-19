import diaryServices from "~/services/diaryServices";
import mutationTypes from "../constants/mutationTypes";


const state = () => ({
  diaryList: null,
  diaryListSon: [],
  Action: null,
});

const getters = {
  getDiaryList: state => state.diaryList,
  diaryListSon: state => state.diaryListSon,
  diaryReadTable: state => state.Action,
};

const actions = {
  async getDiary({ commit }) {
    try {
      const res = await diaryServices.getDiary();
      const { data } = res;
      commit(mutationTypes.USER.GET_DIARY, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async getDiarySon({ commit }, payload) {
    try {
      const res = await diaryServices.getDiarySon({ id: payload.id});
      const { data } = res;
      commit(mutationTypes.USER.GET_DIARY_SON, data);
      return data;
    } catch (error) {
      console.log(error)
    }
  },
  async readDiary({ commit }, payload) {
    try {
      const res = await diaryServices.readDiary({ id: payload.id});
      const { data } = res;
      commit(mutationTypes.TABLE.GET_TABLE, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async addAction({ commit }, payload) {
    try {
      const { action, start_time, user, actual_date } = payload;
      const res = await diaryServices.addAction(action, start_time, user, actual_date );
      return res;
    } catch (error) {
      console.log(error)
    }
  },
  async endAction({commit}, payload) {
    try {
      const { nextDiary } = payload;
      const res = await diaryServices.endAction({
        id: nextDiary.id,
        user_id: nextDiary.user,
        start_time: nextDiary.start_time,
        action: nextDiary.action,
        end_time: nextDiary.end_time
        
      });
      return res;
    } catch (error) {
      console.log(error)
    }
  },
  async updateAction({commit}, payload) {
    try {
      const { id,start_time,end_time,add_field,add_field_right,note,user,action } = payload;
      const res = await diaryServices.updateAction(id,start_time,end_time,add_field,add_field_right,note,user,action);
      return res;
    } catch (error) {
      console.log(error)
    }
  }
  
}
const mutations = {
  [mutationTypes.USER.GET_DIARY](state, payload) {
    state.diaryList = payload;
  },
  [mutationTypes.USER.GET_DIARY_SON](state, payload){
    state.diaryListSon = payload
  },
  [mutationTypes.TABLE.ADD_ACTION](state, payload){
    state.Action = payload
  },
  [mutationTypes.TABLE.END_ACTION](state, payload){
    state.Action = payload
  },
  [mutationTypes.TABLE.ADD_ACTION_SON](state, payload){
    state.Action = payload
  },
  [mutationTypes.TABLE.GET_TABLE](state, payload){
    state.Action = payload
  },
  [mutationTypes.TABLE.UPDATE_ACTION](state, payload){
    state.Action = payload
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
}