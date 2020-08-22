<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <h1>用户编辑</h1>
        <!-- :model="ruleForm"属于框架 -->
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <!--  -->
            <el-input type="text" v-bind:value="ruleForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="保密" value="保密"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age" ref="search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>-->
      <el-col :span="6" style="text-align:right" class="ints">
        <input type="file" @change="gai"  ref="bian" id="uploadAvatar" />
        <img v-bind:src="imgUrl" id="avatar" ref="imgs" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        return callback(new Error("未满18岁禁止浏览"));
      } else {
        //规则通过的回调
        callback();
      }
    };
    return {
      userid: "",
      imgUrl: "../../../public/uploads/avatar.jpg",
      ruleForm: {
        username: "",
        password: "",
        gender: "",
        age: "",
      },
      rules: {
        age: [
          //设置必填属性
          { required: true, message: "年龄必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          { validator: checkAge, trigger: "change" },
        ],
        password: [
          {
            min: 6,
            max: 12,
            message: "密码长度必须为在6到12个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const { userid, ruleForm } = this;
          const { data } = await this.$request.put("/user/" + userid, {
            ...ruleForm,
          });
          //请求所有用户个人信息
          console.log("噢噢噢", data);
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async gai(e) {
      const { id } = this.$route.params;
      console.log("这是id", id);
      const data = new FormData();
      data.set("_id", id);
      data.set("avatar", e.target.files[0]);
      const result = await this.$request.post("/upload/avatar", data, {
        contentType: false,
        body: JSON.stringify({
          _id: id,
        }),
      });
      this.imgUrl = result.data.data.avatarUrl;
    },
  },
  async created() {
    const { id } = this.$route.params;
    // 发送请求获取数据
    const { data } = await this.$request.get("/user/" + id);
    this.userid = id;
    this.imgUrl = data.data.avatarUrl||'../../../public/uploads/avatar.jpg'

    console.log("运用", id);
    console.log(typeof data.data.age);
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang="scss">
.ints img{
  display: block;
  width: 225px;
  height: 200px;
}
</style>