import axios from "axios";
import apiEndpoints from "../constants/apiEndpoints";
/* eslint-disable */
export default {
  namespaced: true,
  state() {
    return {
      callList: [],
    };
  },
  getters: {
    callList: (state) => state.callList,
    getCallById: (state) => (id) =>
      state.callList.find((item) => item.id === id),
  },
  mutations: {
    setCalls(state, calls) {
      state.callList = calls;
    },
    addCallToList(state, call) {
      state.callList.push(call);
    },
    updateCall(state, data) {
      state.callList.find((item) => item.id === data.id);
      const index = state.callList.map((item) => item.id).indexOf(data.id);
      state.callList.splice(index, 1, data);
    },
    deleteCall: (state, id) => {
      state.callList = state.callList.filter((item) => item.id !== id);
    },
  },
  actions: {
    async loadCalls({ commit }) {
      try {
        const response = await axios.get(apiEndpoints.calls.getCalls);
        commit("setCalls", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async addCall({ commit, dispatch }, data) {
      try {
        await axios.post(apiEndpoints.calls.addCall, data);
        commit("addCallToList", data);
        dispatch("loadCalls");
      } catch (err) {
        console.log(err);
      }
    },

    async updateCall({ commit, dispatch }, data) {
      try {
        await axios.put(apiEndpoints.calls.updateCall(data.id), data);
        commit("updateCall", data);
        dispatch("loadCalls");
      } catch (err) {
        console.log(err);
      }
    },

    async deleteCall({ commit, dispatch }, id) {
      new Promise((resolve, reject) => {
        axios
          .delete(apiEndpoints.calls.deleteCall(id))
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            commit("deleteCall", id);
            dispatch("loadCalls");
            resolve(true);
          })
          .catch((err) => {
            //Якщо погано
            reject(err);
          });
      });
    },
  },
};
