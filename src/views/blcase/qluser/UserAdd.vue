<template>
  <div>
    <el-dialog title="新增用户" :visible.sync="dictAddVisiable" width="60%" @close="onClose">
      <el-form :inline="true" id="user" :model="user" class="demo-form-inline" label-width="80px">
        <!-- 标题1 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align:center;line-height:260%;">用户基本信息</div>
          </el-col>
        </el-row>
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="user.userName">
                <template slot="prepend" style="width:100px">
                  <b style="color:red">*</b>姓名
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="user.userPhone" name="tel" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')">
                <template slot="prepend" style="width:100px">
                  <b style="color:red">*</b>手机号
                </template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="user.userIdcard" name="tel" maxlength="18" oninput="value=value.replace(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,'')">
                <template slot="prepend">
                  <b style="color:red">*</b>身份证号
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="user.position">
                <template slot="prepend">
                  <b style="color:red">*</b>职位
                </template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div>
              <span class="bumen">
                <b style="color:red">*</b>部门
              </span>
              <el-cascader
                :options="deptTreeData"
                :show-all-levels="false"
                clearable
                :props="props"
                style="width: 91%;margin-left: -4px;"
                @change="getdeptID"
                v-model="user.deptId"
              ></el-cascader>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="padding-top:7px;">
              &nbsp;&nbsp;
              <b style="color:red">*</b>用户类型:
              <el-radio-group v-model="user.type" style="margin-left:10%;">
                <el-radio :label="3">服务专员</el-radio>
                <el-radio :label="4">结对干部</el-radio>
                <el-radio :label="5">绑定的领导</el-radio>
                <el-radio :label="6">领导</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <el-button
                type="primary"
                style="margin-left:50%;transform: translateX(-50%);"
                @click="fromsubmit"
              >提交</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
const Cuser = {
  userName: "",
  userPhone: "",
  userIdcard: "",
  deptId: "",
  type: "",
  position: ""
};
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
};
export default {
  name: "UserAdd",
  props: {
    dictAddVisiable: {
      default: false
    }
  },
  data() {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      user: {},
      deptTreeData: [],
      props: {
        value: "value",
        label: "text",
        children: "children",
        
      }
    };
  },
  watch:{
    dictAddVisiable(){
      if(this.dictAddVisiable){
        this.getdept();
      }
    }
    
  },
  // mounted() {
  //   this.getdept();
  // },
  methods: {
    // reset () {
    //   this.loading = false
    //   this.dict = {}
    //   this.form.resetFields()
    // },
    //获取街道信息
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
          this.user.deptId = node[node.length-1];
          // console.log(this.user.deptId);
      }
      
    },
    onClose() {
      // this.reset()
      this.$emit("close");
      // this.dictAddVisiable=false;
      this.user = Object.assign({}, Cuser);
    },
    fromsubmit() {
      if (!this.user.userName) {
        this.$message.error("请输入姓名");
        return;
      } else if (!this.user.userPhone) {
        this.$message.error("请输入手机号码");
        return;
      } else if (!this.user.userIdcard) {
        this.$message.error("请输入身份证号");
        return;
      } else if (!this.user.position) {
        this.$message.error("请输入职位");
        return;
      } else if (!this.user.deptId) {
        this.$message.error("请选择所属部门");
        return;
      } else if (!this.user.type) {
        this.$message.error("请选择企业类型");
        return;
      }

      this.$post("userInfoController/addUserInfo", {
        ...this.user
      }).then(res => {
        // this.$message.success("用户录入成功");
        // this.dictAddVisiable = false;
        this.$emit('success')
        // console.log(res);
      });
    }
  }
};
</script>
  <style>
.el-input__inner {
  border-radius: 0;
}
.bumen {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-right: 0;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0 20px;
  white-space: nowrap;
  margin-bottom: 2px;
}
.el-input-group__prepend {
  width: 100px;
}
.el-row {
  margin-bottom: 40px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #c8e2ec;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-select .el-input {
  width: 300px;
}
</style>
