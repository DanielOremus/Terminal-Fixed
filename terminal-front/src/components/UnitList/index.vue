<template>
  <div>
    <v-card id="unit-display-card">
      <v-card-title>ACTIVE UNITS</v-card-title>

      <v-container>
        <v-table id="unit-display-table" fixed-footer fixed-header>
          <tr>
            <th>UNIT NAME</th>
            <th>NAME(S)</th>
            <th>STATUS</th>
            <th>D/E</th>
          </tr>
          <tr v-for="unit in unitList" :key="unit.id">
            <unit-card :unit="unit" @openDialog="sendToDialog"></unit-card>
          </tr>
        </v-table>
      </v-container>
    </v-card>

    <v-text-field type="text" v-model="newUnit" v-on:keyup.enter="onAdd" />
    <add-unit-dialog-card
      :unitId="unitId"
      @reset="unitId = null"
    ></add-unit-dialog-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      isEditButtonClicked: false,
    };
  },
  computed: {
    ...mapGetters("unit", ["unitList"]),
  },

  methods: {
    ...mapActions("unit", ["addUnit"]),
    onAdd() {
      this.addUnit(this.newUnit);
    },
    sendToDialog(id) {
      this.unitId = id;
    },
  },
};
</script>

<style lang="css" scoped>
#unit-display-card {
  width: 50%;
  border: 2px solid rgb(84, 84, 84) !important;
  text-align: center;
}
th {
  padding-bottom: 15px;
}
</style>
