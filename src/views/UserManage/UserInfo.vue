<template>
    <div class="home">
      UserInfo
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State, Getter, Mutation, Action } from "vuex-class";

  @Component
  export default class UserInfo extends Vue {
    @Getter('user') getUser:any;
    created() {
    console.log(this.getUser);
  }
  }
  </script>
  <style scoped lang="scss">
  
  </style>