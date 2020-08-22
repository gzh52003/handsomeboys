<template>
  <div>
    <h1>登录获取更多...</h1>
    <!-- <el-form status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
    <el-form status-icon label-width="100px">
      <el-form-item label="用户名" prop="username" class="yong">
        <el-input type="text" v-model="ruleForm.username" ref="use"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="mi">
        <el-input type="password" v-model="ruleForm.password" ref="pas"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="yan" class="zheng">
        <!-- <el-row :gutter="20"> -->
        <el-col :span="19" class="cols">
          <el-input type="text" v-model="ruleForm.yan" ref="yans"></el-input>
        </el-col>
        <el-col :span="4">
          <div @click="getVcode()" ref="code" class="grid-content bg-purple yan">9527</div>
        </el-col>
        <!-- </el-row> -->
      </el-form-item>
      <el-form-item>
        <label for="mdl">
          <input type="checkbox" ref="qi" checked />
          7天免登陆
        </label>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button> -->
        <el-button type="primary" @click="submitForm()">登录</el-button>

        <!-- 这里用来vue绑定事件 -->
        <a @click="regg" class="regs">免费注册</a>
        <a class="wang">忘记密码？</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("用户名不能为空"));
    //   }
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        username: "",
        password: "",
        yan: "",
        age: "",
      },
      // rules: {
      //   pass: [{ validator: validatePass, trigger: "blur" }],
      //   // checkPass: [{ validator: validatePass2, trigger: "blur" }],
      //   age: [{ validator: checkAge, trigger: "blur" }],
      // },
    };
  },
  methods: {
    //跳到注册
    regg(){
      this.$router.push("/reg");
    },
    async getVcode() {
      //获取验证码
      const result = await fetch(`http://localhost:2003/api/vcode`, {
       method:'post', 
       credentials: 'include',
      // headers: {'Accept': 'application/json'}
      }).then((res) => res.json())
      console.log(result);

      if (result.code === 1) {
        // svgVcode.innerHTML = result.data;
        this.$refs.code.innerHTML = result.data;
      }
    },
    // async submitForm(formName) {
    async submitForm() {
      //获取username和password
      const username = this.$refs.use.value;
      const password = this.$refs.pas.value;
      //框的验证码
      const vcode = this.$refs.yans.value;
      console.log(vcode);
      //七天
      const mdl = this.$refs.qi.checked;
      //发起请求
      // const result = await this.$request.get(
      //   `/log?username=${username}&password=${password}`
      // )
      // 暂时用这个
      const result = await fetch(
        `http://localhost:2003/api/log?username=${username}&password=${password}&vcode=${vcode}&mdl=${mdl}`
      ).then((res) => res.json());
      console.log(result);
      if (result.code === 0) {
        // username.className = password.className = 'form-control is-invalid';
        alert("登录失败");
        console.log(123);
      } 
      // else if (result.code === 10) {
      //   alert("亲,请正确填写验证码");
      // }
       else {
        //登录成功,存token以字符串
        //登录的时候，把所有的信息存到cookie
        localStorage.setItem("currentUser", JSON.stringify(result.data));
        // location.href = "manage/index.html";
         this.$router.push("/home");
      }
      console.log(result);
      console.log(username, password);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
  created() {
    console.log(888);
    this.getVcode();
  },
  // watch:{
  //   "yan": this.getVcode()
  // },
};
</script>
<style lang="scss">
.yong,
.mi {
  width: 600px;
}
.zheng {
  width: 500px;
}
.yan {
  height: 39px;
  width: 93px;
  // overflow: hidden;
  background-color: gray;
  text-align: center;
  line-height: 39px;
}
.regs {
  margin-left: 10px;
  color: blue;
}
</style>