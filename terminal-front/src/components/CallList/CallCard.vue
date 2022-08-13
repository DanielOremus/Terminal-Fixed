<template>
  <v-row justify="center" class="call-row" align="center">
    <v-col cols="12" sm="2" class="text">
      {{ call.title }}
    </v-col>
    <v-col cols="12" sm="4" class="text">
      {{ call.location }}
    </v-col>
    <v-col cols="12" sm="4" class="text">
      {{ call.respondingUnits.join(" | ") }}
    </v-col>
    <v-col cols="12" sm="2">
      <v-btn @click="onDelete" :disabled="this.isDisabled" block>Delete</v-btn>
      <v-btn @click="this.$emit('id', this.call.id)" class="edit-btn" block
        >Edit</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";
export default {
  name: "CallCard",
  props: {
    call: {
      type: Object,
      default: () => ({}),
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions("call", ["deleteCall"]),
    onDelete() {
      alert(`Вы удалили вызов: ${this.call.title}`);
      this.deleteCall(this.call.id);
    },
  },
};
</script>

<style lang="css" scoped>
.call-container {
  padding: auto;
}
.call-row {
  margin-top: 12px;
  text-align: center;
  border-top: 1px solid rgb(84, 84, 84);
}
.text {
  line-height: 30px;
}
.edit-btn {
  margin-top: 10px;
}
</style>
