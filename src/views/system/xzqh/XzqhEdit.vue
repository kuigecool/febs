<template>
  <a-drawer
    title="新增行政区"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="dictEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='街道名称' v-bind="formItemLayout">
        <!-- <a-input v-model="dept.region" 
                 v-decorator="['region',
                   {rules: [
                    { required: true, message: '部门名称不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/> -->
                   <a-input v-model="dept.region"/>
      </a-form-item>
      <a-form-item label='行政区划分代码' v-bind="formItemLayout">
        <!-- <a-input v-model="dept.code"
                 v-decorator="['code',
                   {rules: [
                    { required: true, message: '部门名称不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/> -->
                  <a-input v-model="dept.code"/>
      </a-form-item>
      <a-form-item label='所辖行政区'
                   style="margin-bottom: 2rem"
                   v-bind="formItemLayout">
        <!-- <a-tree
          :key="deptTreeKeys"
          :checkable="true"
          :checkStrictly="true"
          @check="handleCheck"
          @expand="handleExpand"
          :expandedKeys="expandedKeys"
          :treeData="deptTreeData">
        </a-tree> -->
          <el-tree
      class="filter-tree"
      :data="data5"
      :props="defaultProps"
      show-checkbox
      node-key="amdId"
      :default-expand-all="true"
      :check-strictly="true"
       @check-change="getChecked"
      ref="tree2"
    ></el-tree>
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<style>
  .ant-col-3 {
    width:20%;
  }
</style>
<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'XzqhEdit',
  props: {
    dictEditVisiable: {
      default: false
    },
    name,
  },
  data () {
    return {
      loading: false,
      id:'',
      formItemLayout,
      form: this.$form.createForm(this),
      dept: {},
      checkedKeys: [],
      expandedKeys: [],
      deptTreeData: [],
      deptTreeKeys: +new Date(),
      data5:[],
      checkedId:null,
      defaultProps: {
          children: 'children',
          label: 'region'
      },
      chexkdata:''
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.deptTreeKeys = +new Date()
      this.expandedKeys = this.checkedKeys = []
      this.dept = {}
      this.form.resetFields()
    },
    // handleClick(data, checked, node){
    //              if(checked == true){
    //                  this.checkedId = data.amdId;
    //                  this.$refs.tree2.setCheckedNodes([data]);
    //              }
    //               let mes=this.$refs.tree2.getCheckedNodes()
    //             console.log(mes);
    //         },
    //         nodeClick(data,checked,node){
    //             this.checkedId = data.amdId
    //             this.$refs.tree2.setCheckedNodes([data]);
                
    //         },
     getChecked(){
      // console.log(this.$refs.tree2.getCheckedNodes())
      let mes=this.$refs.tree2.getCheckedNodes()
      console.log(mes);
      this.dept.pId=mes[0].amdId;
      console.log(this.dept.pId);
      

    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      if(!this.dept.region){
        this.$message.error('行政区名称不能为空')
        return
      }else if(!this.dept.code){
        this.$message.error('行政区划分代码不能为空')
        return
      }
      // let checkedArr = Object.is(this.checkedKeys.checked, undefined) ? this.checkedKeys : this.checkedKeys.checked
      let  checkedArr=this.$refs.tree2.getCheckedKeys()
      if (checkedArr.length > 1) {
        this.$message.error('最多只能选择一个上级部门，请修改')
        return
      }else if(checkedArr.length<1){
        this.$message.error('请选择所辖行政区')
        return
      }
      
      this.form.validateFields((err, values) => {
        
        // if (!err) {
        //   this.loading = true
        //   if (checkedArr.length) {
        //     this.dept.parentId = checkedArr[0]
        //   } else {
        //     this.dept.parentId = ''
        //   }
        //   this.$post('dept', {
        //     ...this.dept
        //   }).then(() => {
        //     this.reset()
        //     this.$emit('success')
        //   }).catch(() => {
        //     this.loading = false
        //   })
        // }
        if (!err) {
          this.loading = true
          // if (checkedArr.length) {
          //   this.dept.pid= checkedArr.amdId   
          // } else {
          //   this.dept.pid = ''
          // }
          //  this.dept.pid= checkedArr.amdId 
          this.$post('adm/update', {
            ...this.dept
          }).then(() => {
            this.reset()
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  },
  watch: {
    dictEditVisiable () {
      if (this.dictEditVisiable) {
        this.$get('adm/findTree').then((r) => {
          console.log(r);
          this.data5 = r.data
          // this.id=r.data[0].pid
          // console.log(this.name);
          this.dept=this.name;
          // this.id=this.dept.pid
          console.log(this.dept);
          let arr=[];
          arr.push(this.dept.pid)
          // this.chexkdata.push(r.data.pid);
          // this.chexkdata=r.data.pid
          this.$refs.tree2.setCheckedKeys(arr);
        })
      }
    }
  }
}
</script>

