export default {
  units: {
    getUnits: "http://localhost:3000/units",
    addUnit: "http://localhost:3000/units",
    updateUnit: (id) => `http://localhost:3000/units/${id}`,
    getUnitById: (id) => `http://localhost:3000/units/${id}`,
    deleteUnit: (id) => `http://localhost:3000/units/${id}`,
  },
  calls: {
    getCalls: "http://localhost:3000/calls",
    addCall: "http://localhost:3000/calls",
    updateCall: (id) => `http://localhost:3000/calls/${id}`,
    getCallById: (id) => `http://localhost:3000/calls/${id}`,
    deleteCall: (id) => `http://localhost:3000/calls/${id}`,
  },
};
