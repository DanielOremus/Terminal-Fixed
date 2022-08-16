<template>
  <div>
    <v-card class="call-create-card">
      <v-row class="call-title-label">
        <v-col cols="12" sm="12">
          <v-card-title>{{ mainTitle }}</v-card-title>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="newCallTitle"
              label="CALL TITLE"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              variant="outlined"
              v-model="newCallPriority"
              label="PRIORITY"
              :items="this.callPriorities"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              variant="outlined"
              v-model="newCallCode"
              label="CODE"
              :items="this.callCodes"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              variant="outlined"
              v-model="newCallStatus"
              label="CALL STATUS"
              :items="this.callStatuses"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="newCallLocation"
              label="LOCATION"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              variant="outlined"
              v-model="newCallRespondingUnits"
              chips
              multiple
              label="RESPONDING UNITS"
              :items="this.unitNames"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="2">
            <v-btn
              block
              height="72%"
              @click="this.newCallRespondingUnits = null"
              >CLEAR</v-btn
            >
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-textarea
              variant="outlined"
              rows="4"
              v-model="newCallDetails"
              placeholder="CALL DETAILS"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              rows="4"
              variant="outlined"
              placeholder="CALL NOTES"
              v-model="newCallNotes"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-btn :disabled="this.isAddButtonDisabled" block @click="onSet">{{
              this.btnTitle
            }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="call-render-card">
      <v-container>
        <v-row justify="center" class="call-table">
          <v-col cols="12" sm="2"> CALL TITLE </v-col>
          <v-col cols="12" sm="4"> LOCATION </v-col>
          <v-col cols="12" sm="4">RESPONDING UNITS</v-col>
          <v-col cols="12" sm="2"> D/E </v-col>
        </v-row>

        <call-card
          v-for="call in callList"
          :key="call.id"
          :call="call"
          @id="setId"
          :isDisabled="this.isDisabled"
        ></call-card>
        <v-row v-if="!this.callList.length" class="no-data-label" align="center"
          ><v-col cols="12" sm="12"
            ><v-icon icon="mdi-alert-outline"></v-icon> NO DATA</v-col
          ></v-row
        >
      </v-container>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import CallCard from "./CallCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CallList",
  components: {
    CallCard,
  },
  data() {
    return {
      newCallTitle: null,
      newCallLocation: null,
      newCallRespondingUnits: null,
      newCallDetails: null,
      newCallPriority: null,
      newCallStatus: null,
      newCallCode: null,
      newCallNotes: null,
      id: null,
      callPriorities: ["1", "2", "3"],
      callStatuses: ["Active", "Pending"],
      callCodes: ["N/A", "Code 2", "Code 2 High", "Code 3"],
    };
  },
  computed: {
    ...mapGetters("call", ["callList", "getCallById"]),
    ...mapGetters("unit", ["unitList"]),
    btnTitle() {
      return this.id ? "Save" : "Add";
    },
    isDisabled() {
      return this.id ? true : false;
    },
    isAddButtonDisabled() {
      let call = [
        this.newCallTitle,
        this.newCallLocation,
        this.newCallRespondingUnits,
        this.newCallDetails,
        this.newCallPriority,
        this.newCallStatus,
        this.newCallCode,
        this.newCallNotes,
      ];
      let isUndef = call.filter(
        (item) => item === null || item === "" || item.length === 0
      );
      if (isUndef.length) {
        isUndef = true;
      } else isUndef = false;
      return isUndef;
    },
    mainTitle() {
      if (this.id) {
        let call = this.getCallById(this.id);
        return `EDIT CALL: ${call.title}`;
      } else return "NEW CALL";
    },
    unitNames() {
      return this.unitList.map((item) => item.number);
    },
  },
  methods: {
    ...mapActions("call", ["updateCall", "loadCalls", "addCall"]),
    onSet() {
      if (!this.id) {
        let call = {
          title: this.newCallTitle,
          priority: this.newCallPriority,
          status: this.newCallStatus,
          location: this.newCallLocation,
          respondingUnits: this.newCallRespondingUnits,
          details: this.newCallDetails,
          code: this.newCallCode,
          notes: this.newCallNotes,
        };
        this.addCall(call);
      } else {
        let call = {
          id: this.id,
          title: this.newCallTitle,
          priority: this.newCallPriority,
          status: this.newCallStatus,
          location: this.newCallLocation,
          respondingUnits: this.newCallRespondingUnits,
          details: this.newCallDetails,
          code: this.newCallCode,
          notes: this.newCallNotes,
        };
        this.updateCall(call);
      }
      this.newCallTitle = null;
      this.newCallLocation = null;
      this.newCallRespondingUnits = null;
      this.newCallDetails = null;
      this.newCallPriority = null;
      this.newCallStatus = null;
      this.newCallCode = null;
      this.newCallNotes = null;
      this.id = null;
    },

    setId(id) {
      this.id = id;
      this.onChangeValues(id);
    },

    onChangeValues(id) {
      let call = this.getCallById(id);
      this.newCallTitle = call.title;
      this.newCallLocation = call.location;
      this.newCallPriority = call.priority;
      this.newCallStatus = call.status;
      this.newCallCode = call.code;
      this.newCallRespondingUnits = call.respondingUnits.split(",");
      this.newCallDetails = call.details;
      this.newCallNotes = call.notes;
    },
  },
  mounted() {
    this.loadCalls();
  },
};
</script>

<style lang="css" scoped>
.call-title-label {
  text-align: center;
}
.call-table {
  text-align: center;
}
.no-data-label {
  text-align: center;
  border-top: 1px solid rgb(84, 84, 84);
  margin-top: 12px;
}
.call-create-card {
  border: 2px solid rgb(84, 84, 84) !important;
}
.call-render-card {
  margin: 40px 0 0 0;
  border: 2px solid rgb(84, 84, 84) !important;
}
</style>
