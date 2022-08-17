export default {
  units: {
    getUnits: `${process.env.VUE_APP_API_URL}/units`,
    addUnit: `${process.env.VUE_APP_API_URL}/units`,
    updateUnit: (id) => `${process.env.VUE_APP_API_URL}/units/${id}`,
    getUnitById: (id) => `${process.env.VUE_APP_API_URL}/units/${id}`,
    deleteUnit: (id) => `${process.env.VUE_APP_API_URL}/units/${id}`,
  },
  calls: {
    getCalls: `${process.env.VUE_APP_API_URL}/calls`,
    addCall: `${process.env.VUE_APP_API_URL}/calls`,
    updateCall: (id) => `${process.env.VUE_APP_API_URL}/calls/${id}`,
    getCallById: (id) => `${process.env.VUE_APP_API_URL}/calls/${id}`,
    deleteCall: (id) => `${process.env.VUE_APP_API_URL}/calls/${id}`,
  },
};
