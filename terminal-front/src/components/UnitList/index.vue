<template>
  <div>
    <v-card id="unit-display-card">
      <v-card-title>ACTIVE UNITS</v-card-title>
      <br />
      <v-table id="unit-display-table">
        <tr>
          <th>UNIT NAME</th>
          <th>NAME(S)</th>
          <th>STATUS</th>
          <th>D/E</th>
        </tr>
        <tr v-for="unit in unitList" :key="unit.id">
          <unit-card :unit="unit" @openDialog="sendIdToDialog"></unit-card>
        </tr>
        <tr v-if="!unitList.length">
          <td colspan="4">
            <v-icon icon="mdi-alert-outline"></v-icon> NO DATA
          </td>
        </tr>
      </v-table>
    </v-card>
    <add-unit-dialog-card
      :unitId="unitId"
      @reset="onReset"
      :isAddClicked="isClicked"
    ></add-unit-dialog-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UnitCard from "./UnitCard.vue";
import AddUnitDialogCard from "./AddUnitDialogCard.vue";
/* eslint-disable */
export default {
  name: "UnitList",
  components: {
    UnitCard,
    AddUnitDialogCard,
  },
  data() {
    return {
      newUnit: null,
      unitId: null,
      isClicked: false,
    };
  },
  computed: {
    ...mapGetters("unit", ["unitList"]),
  },

  methods: {
    ...mapActions("unit", ["loadUnits"]),
    sendIdToDialog(id) {
      this.unitId = id;
    },
    sendEventToDialog() {
      this.isClicked = true;
    },
    onReset() {
      this.unitId = null;
      this.isClicked = false;
    },
  },
  mounted() {
    this.loadUnits();
  },
};
</script>

<style lang="css" scoped>
#unit-display-card {
  border: 2px solid rgb(84, 84, 84) !important;
  text-align: center;
}
th {
  padding-bottom: 15px;
  width: 100vh;
}
td {
  border-top: 1px solid rgb(84, 84, 84);
  vertical-align: middle;
  height: 50px;
}

#add-unit-btn {
  justify-content: center;
  text-align: center;
}
#unit-display-table {
  table-layout: fixed;
}
</style>
