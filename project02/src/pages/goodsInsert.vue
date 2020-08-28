<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <h1>商品添加</h1>
        <!-- :model="ruleForm"属于框架 -->
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input type="text" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="现售价" prop="price1">
            <el-input type="text" v-model.number="ruleForm.price1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="市场价" prop="price2">
            <el-input type="text" v-model.number="ruleForm.price2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm">添加</el-button>
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
    var checkprice = (rule, value, callback) => {
      console.log("这是一个value值", value);
      if (value < 1) {
        return callback(new Error("请输入大于0的数字"));
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
        name: "",
        price1: "",
        price2: "",
      },
      rules: {
        price1: [
          //设置必填属性
          { required: true, message: "价格必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          { validator: checkprice, trigger: "change" },
        ],
        price2: [
          //设置必填属性
          { required: true, message: "价格", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          { validator: checkprice, trigger: "change" },
        ],
        // password: [
        //   {
        //     min: 6,
        //     max: 12,
        //     message: "密码长度必须为在6到12个字符",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  methods: {
    //添加商品数据
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          //获取填写的数据
          const { ruleForm } = this;
          console.log("通天塔", this.ruleForm);
          //换接口，换成插入到数据库
          const { data } = await this.$request.put("/insertGoods/", {
            ...ruleForm,
          });
          //请求所有用户个人信息，返回来的数据
          console.log("噢噢噢", data);
          if (data.code === 1) {
            // this.ruleForm.password= "";
            //  this.ruleForm.gender= "";
            //  this.ruleForm.age= "";
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
      const { name } = this.ruleForm;
      console.log("用户名", name);
      //   const { id } = this.$route.params;
      //   console.log("这是id", id);
      const data = new FormData();
      data.set("name", name);
      data.set("avatar", e.target.files[0]);
      const result = await this.$request.post("/insertgoodsPic/avatar", data, {
        contentType: false,
        body: JSON.stringify({
          name: name,
        }),
      });
      console.log("这是一个返回的数据", result);
      this.imgUrl = result.data.data.avatarUrl;
    },
  },
  async created() {
    //直接获取地址栏上的id
    const { id } = this.$route.params;
    // 发送请求获取数据
    const { data } = await this.$request.get("/user/" + id);
    // this.userid = id;
    this.imgUrl = data.data.avatarUrl || "/uploads/avatar.jpg";
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