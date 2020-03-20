<template>
    <div class="home">
      TableData
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue, Provide } from 'vue-property-decorator';
  
  @Component
  export default class TableData extends Vue {
    @Provide() searchVal:String="";
    @Provide() tHeight:number=document.body.offsetHeight-270;
    @Provide() tableData:any=[]; //表格数据
    @Provide() page:Number=1; //当前page
    @Provide() size:Number=5;//请求数据的个数 默认5
    @Provide() total:Number=0;//总条数
  }
  </script>
  <style scoped lang="scss">
  
  </style>