<template>
  <div>
    <h1>免费注册</h1>
    <el-form status-icon label-width="100px">
      <el-form-item label="用户名" prop="username" class="yong">
        <el-input @blur="use" type="text" v-model="ruleForm.username" ref="use"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="mi">
        <el-input type="password" v-model="ruleForm.password" ref="pas"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">注册</el-button>
        <a class="regs">免费注册</a>
        <a class="regs" @click="you">已有账号？</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canReg: true,
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async use() {
      const username = this.$refs.use.value;
      if (username !== "") {
        const result = await fetch(
          `http://localhost:2003/api/reg/check?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          return res.json();
        });
        console.log("result=", result);
        if (result.code === 0) {
          alert("亲,你重名了");
          //重名了
          this.canReg = false;
        } else if (result.code === 1) {
          console.log("没有重名");
          this.canReg = true;
        }
      }
    },
    you() {
      this.$router.push("/login");
    },
    async submitForm() {
      //获取username和password
      const username = this.$refs.use.value;
      const password = this.$refs.pas.value;
      if (username !== "") {
        const result = await fetch(`http://localhost:2003/api/reg`, {
          method: "post",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          return res.json();
        });
        console.log("result", result);
        if (result.code === 1) {
          alert("恭喜你注册成功");
          this.$router.push("/login");
        }
      } else {
        alert("亲,请输入用户名");
      }
    },
  },
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
  background-color: gray;
  text-align: center;
  line-height: 39px;
}
.regs {
  margin-left: 10px;
  color: blue;
}
</style>