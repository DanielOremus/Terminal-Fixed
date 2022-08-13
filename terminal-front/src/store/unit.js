import { v4 as uuidv4 } from "uuid";
export default {
  namespaced: true,
  state() {
    return {
      unitList: [
        {
          id: uuidv4(),
          number: "L-42",
          status: "BUSY",
          name: ["Mitz Cannon", "LLL"],
          rank: ["Sergeant"],
          department: "Police Dept.",
        },
        {
          id: uuidv4(),
          number: "L-45",
          status: "BUSY",
          name: ["Rudy Ramirez"],
          rank: ["Police Officer III"],
          department: "Police Dept.",
        },
      ],
    };
  },
  getters: {
    unitList: (state) => state.unitList,
    getUnitById: (state, id) => state.unitList.find((item) => item.id === id),
  },
  mutations: {
    setUnit: (state, data) => {
      const index = state.unitList.map((item) => item.id).indexOf(data.id);
      state.unitList.splice(index, 1, data);
      // getUnitById.
    },
    addUnit: (state, name) => {
      let unit = {
        id: uuidv4(),
        unitName: name,
      };
      state.unitList.push(unit);
    },
    deleteUnit: (state, id) => {
      state.unitList = state.unitList.filter((item) => item.id !== id);
    },
  },
  actions: {
    setUnit({ commit }, data) {
      commit("setUnit", data);
    },
    addUnit({ commit }, name) {
      commit("addUnit", name);
    },
    deleteUnit({ commit }, id) {
      commit("deleteUnit", id);
    },
  },
};
