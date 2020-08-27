<template>
  <div class="box">
    <!-- 这是渲染用户信息 -->
    <el-table
      class="tab"
      ref="multipleTable"
      idx
      :data="userlist"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="55" label="#"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="120">
        <template v-slot:default="scope">
          <!-- 这是跳到编辑的 -->
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>
          <!-- 需要获取数据的id -->
          <el-button
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteUser(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      currentId: "",
    };
  },
  methods: {
    //  zuo.onclick=function(){

    //  },
    //实现分页
    async deleteUser(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/user/" + id);

        if (data.code === 1) {
          this.userlist = this.userlist.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    goto(id) {
      // 跳转路由传参
      //   this.$router.push("/user/edit/"+id + '?a=10');
      //这是跳转的到编辑的
      this.$router.push({
        name: "userEdit",
        params: { id },
        // query:{
        //     a:10,b:20
        // }
      });
    },
    //获取:data
    tt() {
      let uu = this.$refs.multipleTable;
      return uu;
    },
  },
  async created() {
    // axios({
    //     url:'http://localhost:2003/api/user',
    //     method:'get',
    //
    // })
    //获取数据的==>发起请求
    // const { data } = await this.$request.get(`/user?page=1`);
    const { data } = await fetch(`http://localhost:2003/api/user?page=1`, {
      method: "get",
    }).then((res) => res.json());
    console.log("数据", data);
    this.userlist = data;
    //实现分页==》把获取到的值传到接口
    const lis = document.querySelectorAll(".number");
    // let tab = document.querySelector(".tab");
    for (let i = 0; i < lis.length; i++) {
      lis[i].onclick = async () => {
        const {
          data,
        } = await fetch(
          `http://localhost:2003/api/user?page=${lis[i].innerText}`,
          { method: "get" }
        ).then((res) => res.json());
        this.userlist = data;
      };
      
    }
  },
};
</script>
<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
}
.el-main {
  padding-top: 6px !important;
  padding-bottom: 0px !important;
  // background-color: red;
  .el-pagination {
    text-align: center;
  }
}
</style>