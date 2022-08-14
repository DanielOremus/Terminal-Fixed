<template>
  <v-row>
    <v-col cols="12" sm="12" id="add-unit-btn">
      <v-btn block @click="setBtnClicked(true)">ADD UNIT</v-btn>
    </v-col>
  </v-row>
  <div id="grid"><unit-list></unit-list> <call-list></call-list></div>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";
import UnitList from "@/components/UnitList/index.vue";
import CallList from "@/components/CallList/index.vue";

export default {
  name: "CADPage",
  components: {
    UnitList,
    CallList,
  },
  methods: {
    ...mapActions("unit", ["setBtnClicked"]),
  },
};
</script>

<style lang="css" scoped>
#grid {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
