export default {
  units: {
    getUnits: "http://localhost:3000/units",
    addUnit: "http://localhost:3000/units",
    updateUnit: (id) => `http://localhost:3000/units/${id}`,
    getUnitById: (id) => `http://localhost:3000/units/${id}`,
    deleteUnit: (id) => `http://localhost:3000/units/${id}`,
  },
};
