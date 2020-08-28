<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <h1>商品修改</h1>
        <!-- :model="ruleForm"属于框架 -->
        <!--           :rules="rules"
 -->
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="username">
            <!-- 行 -->
            <!-- <el-input type="text" v-bind="ruleForm.name" ></el-input> -->
            <el-input type="text" v-bind:value="ruleForm.name" ></el-input>
            <!-- <el-input type="text" v-model="ruleForm.name" ></el-input> -->
          </el-form-item>
          <el-form-item label="现售价" prop="password">
            <el-input type="text" v-model="ruleForm.price1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="市场价" prop="gender">
             <el-input type="text" v-model="ruleForm.price2" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品展示" prop="age"> -->
            <!-- <el-input type="file"></el-input> -->
          <!-- </el-form-item> -->
          <el-form-item>
            <el-button type="success" @click="submitForm">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
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
    // var checkAge = (rule, value, callback) => {
    //   if (value < 18) {
    //     return callback(new Error("未满18岁禁止浏览"));
    //   } else {
    //     //规则通过的回调
    //     callback();
    //   }
    // };
    return {
      userid: "",
      //默认图片失败
      imgUrl: "../../../public/uploads/avatar.jpg",
      ruleForm: {
        name: "",
        price1: "",
        price2: "",
        age: "",
      },
    //   rules: {
    //     age: [
    //       //设置必填属性
    //       { required: true, message: "年龄必填", trigger: "change" },
    //       { type: "number", message: "只能输入数字", trigger: "change" },
    //       { validator: checkAge, trigger: "change" },
    //     ],
    //     password: [
    //       {
    //         min: 6,
    //         max: 12,
    //         message: "密码长度必须为在6到12个字符",
    //         trigger: "blur",
    //       },
    //     ],
    //   },
    };
  },
  methods: {
      //这只修改的
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const { userid, ruleForm } = this;
          const { data } = await this.$request.put("/goods/" + userid, {
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
    //改图片
    async gai(e) {
      const { id } = this.$route.params;
      console.log("这是id", id);
      const data = new FormData();
      data.set("_id", id);
      data.set("avatar", e.target.files[0]);
      const result = await this.$request.post("/goodsPic/avatar", data, {
        contentType: false,
        body: JSON.stringify({
          _id: id,
        }),
      });
      this.imgUrl = result.data.data.avatarUrl;
    },
  },
  async created() {
      console.log(321);
    //   获取数据
    const { id } = this.$route.params;
    // 发送请求获取数据
    const { data } = await this.$request.get("/goods/" + id);
    console.log("请求回来的数据",data);
    this.userid = id;
    this.imgUrl = data.data.avatarUrl||data.data.imgurl
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