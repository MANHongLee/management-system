<template>
  <div class="userBody">
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button
            @click="showDialog"
            type="primary"
            size="small"
            style="background-color: #545c64; border-color: #545c64"
            >新增</el-button
          >
        </el-col>
        <el-col :span="12" :push='6'>
          <el-input
            style="width: 180px"
            v-model="searchVal"
            placeholder="请输入姓名"
            clearable
            prefix-icon="el-icon-search"
            size="small"
          ></el-input>
          <el-button
            type="primary"
            size="small"
            style="background-color: #545c64; border-color: #545c64"
            @click="Searched()"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :title="currentName" :visible.sync="dialogVisible" width="50%">
      <div>
        <common-form
          :formLabel="operateFormLabel"
          :form="operateForm"
          ref="form"
        ></common-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-card
      style="margin-top: 20px"
      shadow="hover"
      :body-style="{ height: '500px' }"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%" max-height="500">
            <el-table-column width="50" type="index"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="130">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="100">
            </el-table-column>
            <el-table-column prop="date" label="出生日期" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  style="color: red"
                  @click="delClick(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { getTableData } from "../../api/data";

export default {
  components: {
    CommonForm,
  },
  data() {
    return {
      currentName: "新增用户",
      dialogVisible: false,
      searchVal: "",
      operateFormLabel: [
        {
          label: "姓名",
          type: "input",
          modle: "name",
        },
        {
          label: "年龄",
          type: "input",
          modle: "age",
        },
        {
          label: "性别",
          type: "select",
          modle: "sex",
          options: ["男", "女"],
        },
        {
          label: "出生日期",
          type: "date",
          modle: "date",
        },
        {
          label: "地址",
          modle: "address",
        },
      ],
      operateForm: {
        name: "",
        age: "",
        sex: "",
        date: "",
        address: "",
      },
      tableData: [],
    };
  },
  computed: {},
  methods: {
    // getTableList() {
    //   getTableData().then((res) => {
    //     // console.log(res);
    //     const { status, data } = res;
    //     // console.log(data);
    //     // console.log(data.data.list);
    //     if (status === 200) {
    //       if (data.code === 200) {
    //         this.tableData = data.data.list;
    //       }
    //     }
    //   });
    // },

    
    //通过姓名进行列表数据搜索
    Searched() {
      const inputData = this.searchVal;
      // console.log(typeOf(input));
      console.log(inputData);
      if (inputData !== '') {
        const searchTableData = this.tableData.filter(
          (item) => item.name == inputData
        );
        console.log(searchTableData);
        this.tableData = searchTableData;
      } else {
        getTableData().then((res) => {
          const { status, data } = res;
          // console.log(data);
          // console.log(data.data.list);
          if (status === 200) {
            if (data.code === 200) {
              this.tableData = data.data.list;
            }
          }
        });
      }
    },
    delClick(item) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(item) {
      // console.log(item);
      this.dialogVisible = true;
      this.currentName = "编辑用户";
      this.operateForm = {
        name: item.name,
        age: item.age,
        sex: item.sex,
        date: item.date,
        address: item.address,
      };
    },
    submitInfo() {
      console.log(this.operateForm);
      this.dialogVisible = false;
      if (this.currentName === "新增用户") {
        this.$message({
          message: "新增成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "编辑成功！",
          type: "success",
        });
      }
    },
    showDialog() {
      this.dialogVisible = true;
      this.currentName = "新增用户";
      // console.log(this.$refs);
      // this.$emit("resetForm");
      // this.$refs.form.resetForm();
      // this.$refs.form.resetFields();
      // console.log(this.$refs);
      this.operateForm = {
        name: "",
        age: "",
        sex: "",
        date: "",
        address: "",
      };
    },
  },
  mounted() {
    // this.$options.methods.getTableList()
    // console.log(this.$options.methods.getTableList());
    getTableData().then((res) => {
      // console.log(res);
      const { status, data } = res;
      // console.log(data);
      // console.log(data.data.list);
      if (status === 200) {
        if (data.code === 200) {
          this.tableData = data.data.list;
        }
      }
    });
  },
};
</script>
<style lang="less" scoped>
.userBody {
  margin-top: 10px;
  // .top {
  //   display:flex;
  //   justify-content: center;
  //   align-items: space-between;
  // }
}
</style>