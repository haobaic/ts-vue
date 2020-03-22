<template>
  <el-dialog
  title="编辑课程"
  :visible.sync="dislogVisible"
  :show-close="false"
  :close-on-click-modal="false"
  >
  <el-form ref="ruleForm" :rules="rules" :model="form" size="small" class="form-box" label-width="100px">
    <el-form-item label="课程名称" prop="title">
      <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <el-form-item label="课程等级" prop="level">
       <el-select v-model="form.level" placeholder="请选择课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
    </el-form-item>
     <el-form-item label="报名人数" prop="count">
        <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>
      <el-form-item  label="上线时间" prop="date">
         <el-date-picker
      v-model="form.date"
       value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="技术栈" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="小程序" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
      <span class="dialog-footer">
      <el-button @click="$emit('closeDialog')" size="small">取消</el-button>
      <el-button @click="submitForm('ruleForm')" type="primary" size="small">确定</el-button>
    </span>
  </el-form>
</el-dialog>
</template>
  
  <script lang="ts">
import { Component, Vue,Prop,Provide } from "vue-property-decorator";

@Component
export default class EditDialog extends Vue {
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
  @Prop(Boolean) dislogVisible!:boolean; 
  @Prop(Object) form!:{
    title:String,
    type:String,
    level:String,
    count:String,
    date:String
    _id:String
  }
    @Provide() rules: any = {
    title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
    level: [{ required: true, message: "请选择课程等级", trigger: "change" }],
    count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        trigger: "change"
      }
    ],
    type: [
      {
        required: true,
        message: "请选择技术栈",
        trigger: "change"
      }
    ]
  };

    created() {
    console.log(this.dislogVisible,this.form)
  }
  submitForm(format:any){
    (this.$refs[format] as any).validate((valid:boolean)=>{
      if(valid){
        (this as any).$ajax.post(`/api/profiles/edit/${this.form._id}`).then((res)=>{
          this.$emit("closeDialog");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
        })
      }
    })
  }
}
</script>
 <style lang="scss" scoped>
.form-box {
  overflow: hidden;
  .el-input,
  .el-select {
    width: 200px !important;
  }
  .dialog-footer{
    float: right;
  }
}
</style>