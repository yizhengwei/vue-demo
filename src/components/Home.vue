<template>
  <el-container class="home-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu  
            background-color="#D3DCE6"
            text-color="#fffff"
            :router="true">
          <!--一级菜单-->
                    <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
                         <!--一级菜单模版区域-->
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>

                        <el-menu-item :index="subItem.path + ''" v-for="subItem in item.list" :key="subItem.id">
                            <template slot="title">
                                <span>{{subItem.name}}</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>
          
        </el-menu>


      </el-aside>


      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist: [
                {
                    id: "1",
                    name: "权限管理",
                    path: "demo",
                    list: [
                        {
                            id: "2",
                            name: "aaa",
                            path: "demo"
                        }
                    ]

                },
            ]
        }
    }
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
}
.el-aside {
  background-color: #d3dce6;
  height: 800px;
}
.el-main {
  background-color: #e9eef3;
  height: 800px;
}
</style>
