<template>
  <a-card :bordered="false" class="card-area">
    <div>
      <div class="operator" style="width:1100px;float:right;">
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
      <div style="width:400px;float:left;height:645px;background:#eee;">
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
          :getCurrentNode="data2"
          @node-click="coback"
        style="background:#eee;"></el-tree>
      </div>
      <!-- 表格区域 -->
      <a-table
        ref="TableInfo"
        :columns="columns"
        :dataSource="data2"
        :pagination="pagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        style="width:1100px;float:right;"
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
          ></a-icon>
          <a-badge v-hasNoPermission="'dict:update'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 新增字典 -->
    <xzqh-add
      @close="handleDictAddClose"
      @success="handleDictAddSuccess"
      :dictAddVisiable="dictAddVisiable"
    ></xzqh-add>
    <!-- 修改字典 -->
    <xzqh-edit
      ref="dictEdit"
      @close="handleDictEditClose"
      @success="handleDictEditSuccess"
      :dictEditVisiable="dictEditVisiable"
      :name="editmes"
    ></xzqh-edit>
  </a-card>
</template>

<script>
import XzqhAdd from "./XzqhAdd";
import XzqhEdit from "./XzqhEdit";

export default {
  name: "Zxqh",
  components: { XzqhAdd, XzqhEdit },
  data() {
    return {
      searchId:'',
      editmes:'',
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
      dictEditVisiable: false,
      loading: false,
      filterText: '',
        data: [],
        data2:[],
        defaultProps: {
          children: 'children',
          label: 'region'
        }
    };
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
   
    },
  computed: {
    columns() {
      return [
        {
          title: "街道名称",
          dataIndex: "region"
        },
        {
          title: "行政区划代码",
          dataIndex: "code"
        },
        {
          title: "创建时间",
          dataIndex: "createTime"
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
    // this.fetch();
    this.$get('adm/findTree').then(res=>{
        console.log(res);
        this.data=res.data;
    })
  },
  methods: {
         coback(data3, checked, node){
          // console.log(data3);
          this.searchId=data3.amdId;
          // this.$get('adm/findByPid',{pid:this.searchId}).then(r=>{
          //   // console.log(r);
          //   this.data2=r.data;
          // })
           this.search();
      },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
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
    handleDictAddSuccess() {
      this.dictAddVisiable = false;
      this.$message.success("新增行政区成功");
      this.search();
    },
    handleDictAddClose() {
      this.dictAddVisiable = false;
    },
    add() {
      this.dictAddVisiable = true;
    },
    handleDictEditSuccess() {
      this.dictEditVisiable = false;
      this.$message.success("修改行政区成功");
      this.search();
    },
    handleDictEditClose() {
      this.dictEditVisiable = false;
    },
    edit(record) {
      // this.$refs.dictEdit.setFormValues(record);
      this.dictEditVisiable = true;
      // console.log(record);
      this.editmes=record;
      // console.log(this.editmes)

    },
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
      let dictIds = [];
          for (let key of this.selectedRowKeys) {
            dictIds.push(this.data2[key].amdId);
          }
          console.log(dictIds[0]);
          this.$post("adm/del",{amdId:dictIds[0]}).then(() => {
            this.$message.success("删除成功");
            this.selectedRowKeys = [];
            this.search();
            
          });
         
    },
    exportExcel() {
      this.$export("dict/excel", {
        ...this.queryParams
      });
      
    },
    search() {
      // this.fetch({
      //   ...this.queryParams
      // });
      this.$get('adm/findByPid',{pid:this.searchId}).then(r=>{
            console.log(r);
            this.data2=r.data;
            const pagination = { ...this.pagination };
            pagination.total = r.data.length;
            this.loading = false;
            // this.dataSource = r.data.rows;
            this.pagination = pagination;
      })
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
      // this.fetch();
    },
    // handleTableChange(pagination, filters, sorter) {
    //   this.paginationInfo = pagination;
    //   console.log(pagination);
    //   this.fetch({
    //     ...this.queryParams
    //   });
    // },
    // fetch(params = {}) {
    //   this.loading = true;
    //   if (this.paginationInfo) {
    //     // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
    //     this.$refs.TableInfo.pagination.current = this.paginationInfo.current;
    //     this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize;
    //     params.pageSize = this.paginationInfo.pageSize;
    //     params.pageNum = this.paginationInfo.current;
    //   } else {
    //     // 如果分页信息为空，则设置为默认值
    //     params.pageSize = this.pagination.defaultPageSize;
    //     params.pageNum = this.pagination.defaultCurrent;
    //   }
    //   this.$get("dict", {
    //     ...params
    //   }).then(r => {
    //     let data = r.data;
    //     console.log(data);
    //     const pagination = { ...this.pagination };
    //     pagination.total = data.total;
    //     this.loading = false;
    //     this.dataSource = data.rows;
    //     this.pagination = pagination;
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../static/less/Common";
.detail {
  padding-left: 25%;
}
</style>
