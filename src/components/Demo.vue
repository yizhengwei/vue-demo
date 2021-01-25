<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input v-model="params.info" placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAdminDig(addFrom, 'N')"
            >添加</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="info" label="姓名" width="180"></el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" size="mini">
              <span
                style="color: #1890ff"
                @click="showAdminDig2(scope.row, 'Y')"
                >编辑</span
              >
            </el-button>
            <el-button type="text" size="mini">
              <span style="color: red" @click="delAdmin(scope.row.id)"
                >删除</span
              >
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.intPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="提示" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="addFrom" label-width="90px">
        <el-form-item label="id" prop="id">
          <el-input v-model="addFrom.id"></el-input>
        </el-form-item>

        <el-form-item label="info" prop="info">
          <el-input v-model="addFrom.info"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="addDialogVisible2" width="30%">
      <el-form :model="addFrom" label-width="90px">
        <el-form-item label="id" prop="id">
          <el-input v-model="addFrom.id"></el-input>
        </el-form-item>

        <el-form-item label="info" prop="info">
          <el-input v-model="addFrom.info"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        key: "id",
        page: 1,
        intPageSize: 10,
        info: ""
      },
      total: 0,
      addDialogVisible: false, //控制对话框
      addDialogVisible2: false,
      //添加信息表单数据
      addFrom: {
        id: "",
        info: "",
      },

      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      var that = this;
      const { data: res } = await this.$http.get("/api/IMGXX/Get", {
        params: this.params,
      });
      if (!res.success) return this.$message.error(res.msg);
      that.tableData = res.response.data;
      that.total = res.response.dataCount;
      console.log(res.response.data);
    },

    //分页
    handleSizeChange(newSize) {
      this.params.intPageSize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      this.params.page = newPage;
      this.getList();
    },

    showAdminDig(row, isUserEdit) {
      let that = this;
      console.log(row);
      this.addDialogVisible = true;
    },

    showAdminDig2(row, isUserEdit) {
      let that = this;
      console.log(row);
      this.addDialogVisible2 = true;
      if (isUserEdit == "Y") {
        this.addFrom = JSON.parse(JSON.stringify(row));
      }
    },

    async add() {
      console.log(this.addFrom);
      const { data: res } = await this.$http.post(
        "/api/IMGXX/Post",
        this.addFrom
      );
      if (!res.success) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.addDialogVisible = false;
      this.getList();
    },

    //编辑用户
    async edit() {
      const { data: res } = await this.$http.put("/api/IMGXX/Put", {
        id: this.addFrom.id,
        info: this.addFrom.info,
      });
      if (!res.success) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.addDialogVisible2 = false;
      this.getList();
    },

    async delAdmin(id) {
      const confirmResult = await this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((res) => res);
      if (confirmResult != "confirm") {
        return this.$message.info("取消删除");
      }
      const { data: res } = await this.$http.delete("/api/IMGXX/Delete/" + id);
      if (!res.success) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.getList();
    },
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 15px;
}
</style>