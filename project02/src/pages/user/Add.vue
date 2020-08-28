<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <h1>用户添加</h1>
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
            <el-input type="text" @change="yong" v-model="ruleForm.username"></el-input>
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
            <el-button type="success" @click="submitForm">增加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" style="text-align:right" class="ints">
        <input type="file" @change="gai" ref="bian" id="uploadAvatar" />
        <img v-bind:src="imgUrl" id="avatar" ref="imgs" v-if="imgUrl" />
        <!-- <img  v-bind:src="./avatar.jpg" id="avatar" ref="imgs" v-else> -->
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
      //这里直接获取地址栏的id，也就是数据库对应的id，不然不能修改
      userid: "",
      imgUrl: "/uploads/avatar.jpg",
      ruleForm: {
        canReg: true,
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
    //验证是否重名
    async yong() {
      const username = this.ruleForm.username;
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
          this.canReg = false;
        } else if (result.code === 1) {
          this.canReg = true;
        }
      }
    },
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          //获取填写的数据
          console.log(8880);
          const { ruleForm } = this;
          //换接口，换成插入到数据库
          const { data } = await this.$request.put("/insert/", {
            ...ruleForm,
          });
          //请求所有用户个人信息
          console.log("噢噢噢", data);
          if (data.code === 1) {
            // this.ruleForm.password= "";
            //  this.ruleForm.gender= "";
            //  this.ruleForm.age= "";  
            //插入成功先不跳转 
          //  this.$router.push({
          //    name:'userlist',
          //  });           
           this.$message({
              type: "success",
              message: "插入成功",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async gai(e) {
      //用来做修改的我唯一标识
      const { username } = this.ruleForm;
      console.log("用户名", username);
      //   const { id } = this.$route.params;
      //   console.log("这是id", id);
      const data = new FormData();
      data.set("username", username);
      data.set("avatar", e.target.files[0]);
      const result = await this.$request.post("/insertPic/avatar", data, {
        contentType: false,
        body: JSON.stringify({
          username: username,
        }),
      });
      console.log("这是一个返回的数据",result);
      this.imgUrl = result.data.data.avatarUrl;
    },
  },
  async created() {
    //直接获取地址栏上的id
    const { id } = this.$route.params;
    // 发送请求获取数据
    const { data } = await this.$request.get("/user/" + id);
    // this.userid = id;
    this.imgUrl = data.data.avatarUrl||"/uploads/avatar.jpg"
    console.log("图片的路径", typeof this.imgUrl);
    // console.log("运用", id);
    // console.log(typeof data.data.age);
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang="scss">
.ints img {
  display: block;
  width: 225px;
  height: 200px;
}
</style>