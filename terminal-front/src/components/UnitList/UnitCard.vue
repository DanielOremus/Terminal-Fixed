<template>
  <td>{{ unit.number }}</td>
  <td>{{ unit.name }}</td>
  <td id="status-td">
    {{ unit.status }}
  </td>
  <td>
    <v-btn block @click="onDelete" class="btn">DELETE</v-btn>
    <v-btn block @click="this.$emit('openDialog', this.unit.id)" class="btn"
      >EDIT</v-btn
    >
  </td>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UnitCard",
  emits: ["openDialog"],
  props: {
    unit: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("unit", ["updateUnit", "deleteUnit", "loadUnits"]),
    onDelete() {
      alert(`${this.unit.number} was deleted`);
      this.deleteUnit(this.unit.id);
    },
  },
};
</script>

<style lang="css" scoped>
td {
  border-top: 1px solid rgb(84, 84, 84);
}
.btn {
  margin: 10px 0;
}
</style>
