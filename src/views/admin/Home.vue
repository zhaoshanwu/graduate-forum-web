<template>
  <div id="admin_home_container" class="admin_home_container">
    <el-container>
      <el-header>
        <h1>诗词论坛后台管理平台</h1>
      </el-header>
      <el-container>
        <el-aside width="201px">
            <el-col :span="12">
            <el-menu
              default-active="1"
              unique-opened
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#fff"
              text-color="#000"
              active-text-color="#4898FF">
              <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">用户一览</el-menu-item>
                  <el-menu-item index="2-2">修改用户</el-menu-item>
                  <el-menu-item index="2-3">删除用户</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>版块管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">版块一览</el-menu-item>
                  <el-menu-item index="3-2">添加版块</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-promotion"></i>
                  <span>帖子管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">帖子一览</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <!-- <charts></charts> -->
          <adminUser></adminUser>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import charts from '../admin/Charts'
import adminUser from '../admin/User'

export default {
  components: {
    charts,
    adminUser
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/admin/Home.css';

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    height: 690px;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    padding: 0;
    background-color: #E9EEF3;
    color: #333;
  }
</style>