<template>
  <div id="container">
    <v-row justify="center">
      <v-dialog
        @error="isAddClicked"
        v-model="dialog"
        persistent
        @after-leave="dialogAfterLeave"
      >
        <v-card>
          <v-card-title id="edit-unit-label">
            {{ cardTitle }}
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="UNIT NUMBER"
                    v-model="newUnitNumber"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="NAME(S)"
                    v-model="newUnitName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="DEPARTMENT"
                    v-model="newUnitDepartment"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="RANK"
                    v-model="newUnitRank"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" id="status-selector">
                  <v-select
                    v-model="newUnitStatus"
                    :items="this.statuses"
                    label="STATUS"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    block
                    color="green-darken-1"
                    text
                    :disabled="isAddButtonDisabled"
                    @click="onSet"
                  >
                    {{ btnSaveTitle }}
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn block color="red-darken-1" text @click="onClose">
                    CLOSE
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddUnitDialogCard",
  data() {
    return {
      statuses: ["BUSY", "UNAVAILABLE", "AVAILABLE", "EN ROUTE", "ON SCENE"],
      dialog: false,
      id: null,
      newUnitStatus: null,
      newUnitNumber: null,
      newUnitName: null,
      newUnitRank: null,
      newUnitDepartment: null,
      newUnit: null,
      isAddBtnClicked: false,
    };
  },
  props: {
    unitId: {
      type: Number,
      default: null,
    },
  },
  watch: {
    unitId(newValue) {
      if (newValue) {
        this.id = newValue;
        this.onChangeValues(newValue);
        this.dialog = true;
      }
    },
  },
  computed: {
    ...mapGetters("unit", ["isBtnClicked", "getUnitById"]),

    cardTitle() {
      if (this.id) {
        return `EDIT UNIT: ${this.getUnitById(this.id).number}`;
      } else return "ADD UNIT";
    },

    isAddClicked() {
      if (this.isBtnClicked()) {
        this.dialog = true;
      }
    },
    btnSaveTitle() {
      return this.id ? "SAVE" : "ADD";
    },
    isAddButtonDisabled() {
      let unit = [
        this.newUnitStatus,
        this.newUnitNumber,
        this.newUnitDepartment,
        this.newUnitName,
        this.newUnitRank,
      ];
      let isUndef = unit.filter(
        (item) => item === null || item === "" || item.length === 0
      );
      if (isUndef.length) {
        isUndef = true;
      } else isUndef = false;
      return isUndef;
    },
  },
  methods: {
    ...mapActions("unit", ["addUnit", "setBtnClicked", "updateUnit"]),

    onSet() {
      if (!this.id) {
        let unit = {
          number: this.newUnitNumber,
          rank: this.newUnitRank,
          department: this.newUnitDepartment,
          name: this.newUnitName,
          status: this.newUnitStatus,
        };
        this.addUnit(unit);
      } else {
        let unit = {
          id: this.id,
          number: this.newUnitNumber,
          rank: this.newUnitRank,
          department: this.newUnitDepartment,
          name: this.newUnitName,
          status: this.newUnitStatus,
        };
        this.updateUnit(unit);
      }
      this.dialog = false;
    },
    onClose() {
      this.dialog = false;
    },
    onChangeValues(id) {
      let unit = this.getUnitById(id);
      (this.newUnitNumber = unit.number),
        (this.newUnitName = unit.name),
        (this.newUnitRank = unit.rank),
        (this.newUnitDepartment = unit.department);
      this.newUnitStatus = unit.status;
    },
    dialogAfterLeave() {
      this.setBtnClicked(false);
      this.id = null;
      this.$emit("reset");
      this.newUnitNumber = null;
      this.newUnitDepartment = null;
      this.newUnitName = null;
      this.newUnitRank = null;
      this.newUnitStatus = null;
    },
  },
};
</script>

<style lang="css" scoped>
#edit-unit-label {
  text-align: center;
}
#status-selector {
  width: 300px;
}
#container {
  margin-top: 2.5%;
}
</style>
