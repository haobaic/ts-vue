<template>
    <div class="layout">
        <!-- 头部 -->
        <LayoutHeader></LayoutHeader>
        <!-- 内容 -->
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import LayoutHeader from './LayoutHeader.vue'
  @Component({
    components:{
        LayoutHeader
      }
  })
  export default class Layout extends Vue {
    
  }
  </script>
  <style scoped lang="scss">
  .layout{
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: #f5f7f9;
  }
  </style>