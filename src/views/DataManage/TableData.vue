<template>
  <div class="table-data">
    <div class="search-box">
      <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%" :height="tHeight" class="table-box">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column  label="课程名称" prop="title"></el-table-column>
      <el-table-column  label="课程等级" prop="level" width="120"></el-table-column>
      <el-table-column  label="技术栈" prop="type" width="120"></el-table-column>
       <el-table-column  label="报名人数" prop="count" width="120"></el-table-column>
      <el-table-column  label="上线日期" prop="date" width="160"></el-table-column>
      <el-table-column v-if="getUser.key!='visitor'" label="操作" width="160">
         <template slot-scope="scope">
           <el-button @click="handleEdit(scope.$index,scope.row)" size="mini">编辑</el-button>
           <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pages" ref="page-box">
      <el-pagination
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="size"
      :page-sizes="[5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    <EditDialog :dislogVisible="dislogVisible" :form="formData" @closeDialog="closeDialog" />
  </div>
</template>
  
  <script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import EditDialog from "./EditDialog.vue";
@Component({
  components: {
    EditDialog
  }
})
export default class TableData extends Vue {
  @Getter("user") getUser: any;
  @Provide() searchVal: String = "";//搜索信息
  @Provide() tHeight: number = document.body.offsetHeight - 270;
  @Provide() tableData: any = []; //表格数据
  @Provide() page: Number = 1; //当前page
  @Provide() size: Number = 5; //请求数据的个数 默认5
  @Provide() total: Number = 0; //总条数
  @Provide() dislogVisible:boolean=false;//是否展示编辑变量
  @Provide() formData:object={
    title:"",
    type:"",
    level:"",
    count:"",
    date:""
  }
  created() {
    this.loadData()
  }
  //关闭弹窗
  closeDialog(){
      this.dislogVisible=false;
  }
  //点击编辑
  handleEdit(index:number,row:any){
    // console.log(index,row)
    this.dislogVisible=true;
    this.formData=row;
  }
  //点击删除
  handleDelete(index:number,row:any){
    (this as any).$ajax.delete(`/api/profiles/delete/${row._id}`).then((res)=>{
      this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.tableData.splice(index, 1);
    })
  }
  //分页  每页几条数据
  handleSizeChange(val:number):void{
     this.size=val;
     this.page=1;
     this.searchVal?this.loadSearchData():this.loadData();
  }
  //页码
  handleCurrentChange(val:number):void{
     this.page=val;
     this.searchVal?this.loadSearchData():this.loadData();
  }
  //搜索
  handleSearch():void{
     //点击搜索
     this.page=1;
     this.searchVal?this.loadSearchData():this.loadData();
  }
  loadSearchData():void{
    (this as any).$ajax(`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`).then((res:any)=>{
      console.log(res)
      this.tableData=res.data.datas.list;
      this.total=res.data.datas.total
    })
  }
  loadData(){
    (this as any).$ajax(`/api/profiles/loadMore/${this.page}/${this.size}`).then((res:any)=>{
      console.log(res)
      this.tableData=res.data.data.list;
      this.total=res.data.data.total
    })
  }
}
</script>
  <style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
    
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
