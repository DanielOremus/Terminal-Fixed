import { v4 as uuidv4 } from "uuid";
export default {
  namespaced: true,
  state() {
    return {
      callList: [
        {
          id: uuidv4(),
          title: "Robbery",
          location: "Idlewood, Panoptican Ave.",
          respondingUnits: ["L-41", "L-25", "D-100"],
          status: "Active",
          priority: "3",
          details: "Dabee dabee dabee",
          code: "Code 2",
          notes: "N/A",
        },
      ],
    };
  },
  getters: {
    callList: (state) => state.callList,
    getCallById: (state) => (id) =>
      state.callList.find((item) => item.id === id),
  },
  mutations: {
    setCall: (state, data) => {
      if (state.callList.find((item) => item.id === data.id)) {
        const index = state.callList.map((item) => item.id).indexOf(data.id);
        state.callList.splice(index, 1, data);
      } else {
        let call = {
          ...data,
          id: uuidv4(),
        };
        state.callList.push(call);
      }
    },
    deleteCall: (state, id) => {
      state.callList = state.callList.filter((item) => item.id !== id);
    },
  },
  actions: {
    setCall({ commit }, data) {
      commit("setCall", data);
    },
    deleteCall({ commit }, id) {
      commit("deleteCall", id);
    },
  },
};
