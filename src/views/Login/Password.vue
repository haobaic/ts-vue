<template>
  <div class="password">
    <LoginHeader>
      <el-form
        slot="container"
        :model="ruleForm"
        label-position="left"
        label-width="0px"
        :rules="rules"
        ref="ruleForm"
      >
        <div class="title">
          <h3 style="font-weight: bold;">找回密码</h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
            placeholder="账号"
          >
            <i slot="prefix" class="el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email">
          <el-input
            type="text"
            v-model="ruleForm.email"
            auto-complete="off"
            placeholder="邮箱"
          >
            <i slot="prefix" class="el-icon-suitcase"></i>
          </el-input>
        </el-form-item>
        <!--确定按钮 -->
        <el-form-item>
          <el-button
            :loading="isLoading"
            @click.native.prevent="handleSubmit"
            type="primary"
            style="width:100%"
          >
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import LoginHeader from './LoginHeader.vue';
@Component({
  components: {
    LoginHeader,
  },
})
export default class Password extends Vue {
  @Provide() isLoading: Boolean = false; //是否发起网络请求
  @Provide() ruleForm: { username: String; email: String } = {
    username: '',
    email: '',
  };
  @Provide() rules = {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    email:[
      {
        required: true,
        message: '请输入邮箱地址',
        trigger: 'blur',
      },{
		  type:"email",
		  message: '请输入正确邮箱地址',
        trigger: 'blur,change',
	  }
    ],
  };
  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid:Boolean) => {
       if(valid){
    	   this.isLoading=true;
    	   (this as any).$ajax.post("/api/users/findPwd",this.ruleForm).then((res:any)=>{
			this.isLoading=false;
			this.$message({
				message:res.data.msg,
				type:"success"
			})
			this.$router.push('/login')
    		console.log(res.data.msg)
    	   }).catch(()=>{
    		this.isLoading=false;
    	   })
       }
    })
  }
}
</script>
<style scoped lang="scss">
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
</style>
