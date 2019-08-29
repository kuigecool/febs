<template>
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="用户姓名">
        <el-input v-model="queryParams.userName" placeholder="用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-cascader
                :options="deptTreeData"
                :show-all-levels="false"
                clearable
                :props="props"
                style="width: 91%;margin-left: -4px;"
                @change="getdeptID"
                v-model="queryParams.deptId"
              ></el-cascader>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="queryParams.position" placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="rest">刷新</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div>
      <div class="operator">
        <a-button v-hasPermission="'dict:add'" type="primary" ghost @click="add">新增</a-button>
        <a-button v-hasPermission="'dict:delete'" @click="batchDelete">删除</a-button>
        <!-- <a-dropdown v-hasPermission="'dict:export'">
          <a-menu slot="overlay">
            <a-menu-item key="export-data" @click="exportExcel">导出Excel</a-menu-item>
          </a-menu>
          <a-button>
            更多操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown> -->
      </div>
      <!-- 表格区域 -->
      <a-table
        ref="TableInfo"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
        :scroll="{ x: 900 }"
      >
        <template slot="remark" slot-scope="text, record">
          <a-popover placement="topLeft">
            <template slot="content">
              <div style="max-width: 200px">{{text}}</div>
            </template>
            <p style="width: 200px;margin-bottom: 0">{{text}}</p>
          </a-popover>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-icon
            v-hasPermission="'dict:update'"
            type="setting"
            theme="twoTone"
            twoToneColor="#4a9ff5"
            @click="edit(record)"
            title="修改字典"
          ></a-icon>&nbsp;
          <a-icon
            v-hasPermission="'user:view'"
            type="eye"
            theme="twoTone"
            twoToneColor="#42b983"
            @click="view(record)"
            title="查看"
          ></a-icon>
          <a-badge v-hasNoPermission="'dict:update'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 用户信息查看 -->
    <user-info
      :userInfoData="userInfo.data"
      :userInfoVisiable="userInfo.visiable"
      @close="handleUserInfoClose"
    ></user-info>
    <!-- 新增字典 -->
    <user-add
      @close="handleUserAddClose"
      @success="handleUserAddSuccess"
      :dictAddVisiable="dictAddVisiable"

    ></user-add>
    <!-- 修改字典 -->
    <User-edit
      ref="uesrtEdit"
      @close="handleUserEditClose"
      @success="handleUserEditSuccess"
      :UserEditVisiable="UserEditVisiable"
      :editdata="editdata"
    ></User-edit>
  </a-card>
</template>

<script>
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
import UserInfo from './UserInfo';

export default {
  name: "Enterprise",
  components: { UserAdd, UserEdit, UserInfo},
  data() {
    return {
      editdata:{},
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      paginationInfo: null,
      pagination: {
        pageSizeOptions: ["10", "20", "30", "40", "100"],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      },
      queryParams: {},
      dictAddVisiable: false,
      UserEditVisiable: false,
      userInfo: {
        visiable: false,
        data: {}
      },
      loading: false,
       props: {
        value: "value",
        label: "text",
        children: "children",
        
      },
      deptTreeData:[]
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "姓名",
          dataIndex: "userName"
        },
        {
          title: "手机号码",
          dataIndex: "userPhone"
        },
        {
          title: "身份证号",
          dataIndex: "userIdcard"
        },
        {
          title: "职位",
          dataIndex: "position"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          fixed: "right",
          width: 100
        }
      ];
    }
  },
  mounted() {
    this.fetch();
    this.getdept();
  },
  methods: {
    getdept() {
      this.$get("dept").then(res => {
        // console.log(res);
        this.deptTreeData = res.data.rows.children;
        // console.log(this.deptTreeData);
        // let data5=res.data[0];
        // console.log(data5)
        // this.datajiedao=res.data;
        // console.log(this.datajiedao);
        // alert(123);
      });
    },
    getdeptID(node) {
      // console.log(node);
      if(node){
          this.queryParams.deptId = node[node.length-1];
          // console.log(this.user.deptId);
      }
      
    },
    rest(){
      this.queryParams.deptId=null;
      this.queryParams.userName=null;
      this.queryParams.position=null;
      this.fetch()
    },
      //查看
    view(record) {
      this.userInfo.data = record;
      console.log(record)
      this.userInfo.visiable = true;
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      console.log(selectedRowKeys);
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
      if (!this.advanced) {
        this.queryParams.fieldName = "";
      }
    },
    handleUserAddSuccess() {
      this.dictAddVisiable = false;
      this.$message.success("新增用户成功");
      this.fetch();
    },
    handleUserAddClose() {
      this.dictAddVisiable = false;
    },
    add() {
      this.dictAddVisiable = true;
    },
    handleUserEditSuccess() {
      this.UserEditVisiable = false;
      this.$message.success("修改用户成功");
      this.fetch();
    },
    handleUserEditClose() {
      this.UserEditVisiable = false;
    },
      handleUserInfoClose () {
      this.userInfo.visiable = false
    },
    edit(record) {
      // this.$refs.uesrtEdit.setFormValues(record);
      this.UserEditVisiable = true;
      console.log(record);
      this.editdata=record;
    },
    // batchDelete() {
    //   if (!this.selectedRowKeys.length) {
    //     this.$message.warning("请选择需要删除的记录");
    //     return;
    //   }
    //   let that = this;
    //   this.$confirm({
    //     title: "确定删除所选中的记录?",
    //     content: "当您点击确定按钮后，这些记录将会被彻底删除",
    //     centered: true,
    //     onOk() {
    //       let dictIds = [];
    //       for (let key of that.selectedRowKeys) {
    //         dictIds.push(that.dataSource[key].dictId);
    //       }
    //       that.$delete("dict/" + dictIds.join(",")).then(() => {
    //         that.$message.success("删除成功");
    //         that.selectedRowKeys = [];
    //         that.search();
    //       });
    //     },
    //     onCancel() {
    //       that.selectedRowKeys = [];
    //     }
    //   });
    // },
    batchDelete() {
      if (!this.selectedRowKeys.length) {
        this.$message.warning("请选择需要删除的记录");
        return;
      }
      // let that = this;
      // this.$confirm({
      //   title: "确定删除所选中的记录?",
      //   content: "当您点击确定按钮后，这些记录将会被彻底删除",
      //   centered: true,
      //   onOk() {
      //     let dictIds = [];
      //     for (let key of that.selectedRowKeys) {
      //       dictIds.push(that.data2[key].region);
      //     }
      //     console.log(dictIds[0]);
      //     that.$post("adm/del",{amdId:dictIds[0]}).then(() => {
      //       that.$message.success("删除成功");
      //       that.selectedRowKeys = [];
      //       that.search();
      //     });
      //   },
      //   onCancel() {
      //     that.selectedRowKeys = [];
      //   }
      // });
      let userIds = [];
          for (let key of this.selectedRowKeys) {
            userIds.push(this.dataSource[key].id);
          }
          console.log(userIds[0]);
          this.$post("userInfoController/deleteUserInfo",{id:userIds[0]}).then(() => {
            this.$message.success("删除成功");
            this.selectedRowKeys = [];
            this.fetch();
            
          });
         
    },
    exportExcel() {
      this.$export("dict/excel", {
        ...this.queryParams
      });
    },
    search() {
      this.fetch({
        ...this.queryParams
      });
    },
    reset() {
      // 取消选中
      this.selectedRowKeys = [];
      // 重置分页
      this.$refs.TableInfo.pagination.current = this.pagination.defaultCurrent;
      if (this.paginationInfo) {
        this.paginationInfo.current = this.pagination.defaultCurrent;
        this.paginationInfo.pageSize = this.pagination.defaultPageSize;
      }
      this.paginationInfo = null;
      // 重置查询参数
      this.queryParams = {};
      this.fetch();
    },
    // close() {
    //   this.dictEditVisiable = false;
    //   this.userInfo.visiable = false;
    //   this.userInfo.data = {};
    // },
    handleTableChange(pagination, filters, sorter) {
      this.paginationInfo = pagination;
      this.fetch({
        ...this.queryParams
      });
    },
    fetch(params = {}) {
      this.loading = true;
      if (this.paginationInfo) {
        // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
        this.$refs.TableInfo.pagination.current = this.paginationInfo.current;
        this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize;
        params.pageSize = this.paginationInfo.pageSize;
        params.pageNum = this.paginationInfo.current;
      } else {
        // 如果分页信息为空，则设置为默认值
        params.pageSize = this.pagination.defaultPageSize;
        params.pageNum = this.pagination.defaultCurrent;
      }
      this.$get("userInfoController/findByPage", {
        ...params
      }).then(r => {
        let data = r.data.data;
        console.log(data);
        const pagination = { ...this.pagination };
        pagination.total = data.total;
        this.loading = false;
        this.dataSource = data.rows;
        this.pagination = pagination;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../static/less/Common";
</style>
