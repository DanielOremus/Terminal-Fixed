import axios from "axios";
import apiEndpoints from "../constants/apiEndpoints";
/* eslint-disable */
export default {
  namespaced: true,
  state() {
    return {
      unitList: [],
      isBtnClicked: false,
    };
  },
  getters: {
    unitList: (state) => state.unitList,
    getUnitById: (state) => (id) =>
      state.unitList.find((item) => item.id === id),
    isBtnClicked: (state) => () => state.isBtnClicked,
  },
  mutations: {
    setBtnClicked: (state, data) => {
      state.isBtnClicked = data;
    },
    setUnits(state, units) {
      state.unitList = units;
    },
    addUnitToList(state, unit) {
      state.unitList.push(unit);
    },
    updateUnit(state, data) {
      state.unitList.find((item) => item.id === data.id);
      const index = state.unitList.map((item) => item.id).indexOf(data.id);
      state.unitList.splice(index, 1, data);
    },
    deleteUnit: (state, id) => {
      state.unitList = state.unitList.filter((item) => item.id !== id);
    },
  },
  actions: {
    async loadUnits({ commit }) {
      try {
        const response = await axios.get(apiEndpoints.units.getUnits);
        commit("setUnits", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async addUnit({ commit, dispatch }, data) {
      try {
        await axios.post(apiEndpoints.units.addUnit, data);
        commit("addUnitToList", data);
        dispatch("loadUnits");
      } catch (err) {
        console.log(err);
      }
    },

    async updateUnit({ commit, dispatch }, data) {
      try {
        await axios.put(apiEndpoints.units.updateUnit(data.id), data);
        dispatch("loadUnits");
        commit("updateUnit", data);
      } catch (err) {
        console.log(err);
      }
    },

    // getUnitById({ commit }, id) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(apiEndpoints.units.getUnitById(id))
    //       .then((res) => res.data)
    //       .then((resData) => {
    //         resolve(resData);
    //       })
    //       .catch((err) => reject(err));
    //   });
    // },

    // addUnit({ commit }, data) {},
    async deleteUnit({ commit, dispatch }, id) {
      new Promise((resolve, reject) => {
        axios
          .delete(apiEndpoints.units.deleteUnit(id))
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            commit("deleteUnit", id);
            dispatch("loadUnits");
            resolve(true);
          })
          .catch((err) => {
            //Якщо погано
            reject(err);
          });
      });
    },

    setBtnClicked({ commit }, data) {
      commit("setBtnClicked", data);
    },
  },
};
