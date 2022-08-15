<template>
  <td>{{ unit.number }}</td>
  <td>{{ unit.name }}</td>
  <td id="selector-td">
    <v-select
      @update:modelValue="this.onSet"
      v-model="status"
      variant="plain"
      :items="this.statuses"
    >
    </v-select>
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
    return {
      status: this.unit.status,
      statuses: ["BUSY", "UNAVAILABLE", "AVAILABLE", "EN ROUTE", "ON SCENE"],
    };
  },
  methods: {
    ...mapActions("unit", ["setUnit", "deleteUnit", "loadUnits"]),
    onSet(status) {
      console.log(status);
      let data = {
        ...this.unit,
        status: status,
      };
      this.setUnit(data);
    },
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
#selector-td {
  width: 20%;
  padding-right: 10px;
}
</style>
