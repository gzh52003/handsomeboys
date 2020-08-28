<template>
  <div class="box">
    <h1>密码重置</h1>
    <!--:rules="rules"-->
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username" class="use">
        <el-input
          type="text"
          v-model="ruleForm.username"
          ref="username"
          autocomplete="off"
          width="120px"
        ></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="oldpass" class="old">
        <el-input
          type="password"
          v-model="ruleForm.oldpass"
          ref="oldpassword"
          autocomplete="off"
          width="120px"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass" class="new">
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          ref="newpass"
          autocomplete="off"
          width="120px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userid: "",
      ruleForm: {
        username: "",
        oldpass: "",
        newPass: "",
      },
    };
  },
  methods: {
    async submitForm() {
    //   const { userid } = this;
      const { username } = this.ruleForm;
      const { oldpass } = this.ruleForm;
      const { newPass } = this.ruleForm;
      const { data } = await this.$request.post("/log/", {
        username,
        oldpass,
      });
      if (data.code === 1 &&newPass!=="") {
        const { data } = await this.$request.put("/log/", {
          username,newPass,
        });
         console.log(data.code);
        if (data.code === 1) {
          alert("恭喜你修改成功!");
          this.$router.push("/login");
          
        } else {
          alert("修改失败!");
        }
      } else {
        alert("用户名或密码不存在!");
      }
      //发起请求获取原密码
      //发起请求修改原密码
      console.log(newPass);
    },
  },
};
</script>
<style lang="scss">
.old,
.new,
.use {
  width: 500px;
}
</style>