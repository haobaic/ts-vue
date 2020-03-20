<template>
	<div class="login">
		<LoginHeader>
			<el-form 
			:model="ruleForm" 
			label-position="left"
			label-width="0px"
			:rules="rules"
			ref="ruleForm"
			slot='container'>
				<div class="title">
					<h3 style="font-weight: bold;">账号密码登录</h3>
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
				  <!-- pwd -->
				  <el-form-item prop="pwd">
					<el-input 
					type="password" 
					v-model="ruleForm.pwd"
					auto-complete="off"
					placeholder="密码"
					>
					<i slot="prefix" class="el-icon-shopping-bag-2"></i>
				  </el-input>
				</el-form-item>
				 <!-- 登录按钮 -->
				 <el-form-item>
				 <el-button :loading="isLoading" @click.native.prevent="handleSubmit" type="primary" style="width:100%">
                       登录
				 </el-button>
				</el-form-item>
				<!-- 7天登录忘记密码 -->
				<el-form-item>
					<el-checkbox 
					v-model="ruleForm.autoLogin"
					:checked="ruleForm.autoLogin"
					>
					7天内自动登录
					</el-checkbox>
					<el-button @click="$router.push('/password')" type="text" class="forget">
						忘记密码？
				  </el-button>
				   </el-form-item>
			</el-form>
		</LoginHeader>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Provide} from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from "vuex-class";

import LoginHeader from './LoginHeader.vue'
@Component({
	components: {
		LoginHeader
	}
})
export default class Login extends Vue {
	//存储用户信息
	@Action("setUser") setUser:any;
	@Provide() isLoading:Boolean=false;//判断网络状态
	@Provide() ruleForm:{
	username:String;
	  pwd:String;
	  autoLogin:Boolean;
  }={
	username:'',
	  pwd:'',
	  autoLogin:true //是否自动登录
  }
  @Provide() rules={
	username:[
            { required: true, message: '请输入账号', trigger: 'blur' }
		  ],
		  pwd:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
  }
  handleSubmit():void{
	(this.$refs["ruleForm"] as any).validate((valid:Boolean) => {
       if(valid){
		   this.isLoading=true;
		   (this as any).$ajax.post("/api/users/login",this.ruleForm).then((res:any)=>{
			this.isLoading=false;  
			localStorage.setItem("tsToken",res.data.token)
			//存储到vuex去
			this.setUser(res.data.token)
			//登录成功跳转
			this.$router.push('/')
			console.log(res.data)
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
.forget {
  float: right;
}
</style>
