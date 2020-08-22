<template>
  <!-- 这是主页面 -->
  <el-container style="height:100%">
    <el-header class="header">
      <el-row>
        <!-- 左边 -->
        <el-col :span="12" class="logo" style="background-color:red;">
          <i class="el-icon-connection"></i>
          金锋后台管理系统
        </el-col>
        <!-- 右边 -->
        <el-col :span="12" class="logo1" style="background-color:green;text-align:right">
          <!-- 换成 -->
          <el-button @click="btnReg" class="btn" type="text">注册</el-button>
          <el-button @click="btnLogin" class="btn" type="text">登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- 侧边 -->
    <el-container>
      <el-aside width="200px">
        <!-- :default-active当前默认路由高亮 -->
        <!-- activeIndex==>让首页默认开始高亮 -->
        <!-- :default-openeds="openMenu"默认打开的数组==>做侧边栏默认要全部展开 -->
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ff0"
          @select="changeMenu"
          :default-openeds="openMenu"
          router
        >
          <template v-for="item in menu">
            <!-- 如果没有二级菜单就这样 -->
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>

            <el-submenu :key="item.path" :index="item.path" v-else>
              <!-- 插槽 -->
              <template v-slot:title>
                <!-- 指定的位置输入子元素 -->
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>

              <!-- 这里是能出来==>:index是跳转页面，非常方便 -->
              <el-menu-item
                :key="sub.path"
                :index="item.path+sub.path"
                v-for="sub in item.submenu"
              >{{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- :to跳到指定的路由 -->
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding:15px 0;">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      openMenu: [],
      menu: [
        {
          text: "登录",
          path: "/log",
          icon: "el-icon-s-home",
        },
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "用户列表",
              path: "/list",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-grape",
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    btnLogin() {
      //页面跳转到登录
      this.$router.push("/login");
    },
    btnReg() {
      //页面跳转到注册
      this.$router.push("/reg");
    },
    goto(path, idx) {
      console.log("啊啊", this.$router);
      this.$router.push(path);
      this.currentIndex = idx;
    },
    back() {
      //这是一个方法来的
      console.log("啊啊", this.$router);
      this.$router.back();
    },
    changeMenu(path) {
      this.activeIndex = path;
    },
  },
  components: {},
};
</script>
<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.header {
  line-height: 60px;
  color: #fff;
  background-color: rgba(84, 92, 100, 0.9);
  .logo {
    font-size: 24px;
    color: #fc0;
    i {
      font-size: 40px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .logo1 .btn {
    color: white;
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}
</style>