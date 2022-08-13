<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title id="edit-unit-label"> EDIT UNIT </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="UNIT NUMBER"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="NAME(S)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="DEPARTMENT"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="RANK"></v-text-field>
                </v-col>
                <v-col cols="12" id="status-selector">
                  <v-select
                    variant="outlined"
                    label="STATUS"
                    :items="[
                      'BUSY',
                      'UNAVAILABLE',
                      'AVAILABLE',
                      'EN ROUTE',
                      'ON SCENE',
                    ]"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    block
                    color="green-darken-1"
                    text
                    @click="this.$emit('reset')"
                  >
                    SAVE
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    block
                    color="red-darken-1"
                    text
                    @click="this.$emit('reset')"
                  >
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
export default {
  name: "AddUnitDialogCard",
  data() {
    return {
      dialog: false,
      unitIdData: null,
    };
  },
  props: {
    unitId: {
      type: String,
      default: null,
    },
    isEditButtonClicked: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    unitId(newValue) {
      if (newValue) {
        this.unitIdData = newValue;
        this.dialog = true;
      } else {
        this.unitIdData = null;
        this.dialog = false;
      }
      console.log(this.unitIdData);
    },
  },

  methods: {},
};
</script>

<style lang="css" scoped>
#edit-unit-label {
  text-align: center;
}
#status-selector {
  width: 100px;
}
</style>
