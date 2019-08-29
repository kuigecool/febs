<template>
<div>
  <!-- <a-drawer
    title="新增企业"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="dictAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='企业名称' v-bind="formItemLayout">
        <a-input style="width: 100%"
                 v-model="dict.corpName"
                 v-decorator="['corpName',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]"/>
      </a-form-item>
      <a-form-item label='统一征信代码' v-bind="formItemLayout">
        <a-input v-model="dict.creaditCode"
                 v-decorator="['creaditCode',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
    
      <a-form-item label='法人' v-bind="formItemLayout">
        <a-input v-model="dict.legalPerson"
                 v-decorator="['legalPerson',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
      <a-form-item label='联系人' v-bind="formItemLayout">
        <a-input v-model="dict.contact"
                 v-decorator="['contact',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
       <a-form-item label='联系人电话' v-bind="formItemLayout">
        <a-input v-model="dict.contactPhone"
                 v-decorator="['contactPhone',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
       <a-form-item label='企业座机' v-bind="formItemLayout">
        <a-input v-model="dict.corpTel"
                 v-decorator="['corpTel',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
       <a-form-item label='所属街道' v-bind="formItemLayout">
        <a-input v-model="dict.fieldName"
                 v-decorator="['fieldName',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
       <a-form-item label='所属园区ID' v-bind="formItemLayout">
        <a-input v-model="dict.street"
                 v-decorator="['street',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
        
       <a-form-item label='服务专员ID' v-bind="formItemLayout">
        <a-input v-model="dict.waiterId"
                 v-decorator="['waiterId',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
       <a-form-item label='结对干部ID' v-bind="formItemLayout">
        <a-input v-model="dict.cadereId"
                 v-decorator="['cadereId',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
      <a-form-item label='数据来源' v-bind="formItemLayout">
            <a-radio-group
            v-model="dict.dataSource"
            v-decorator="['dataSource',{rules: [{ required: true, message: '请选择来源'}]}]">
            <a-radio value="0">区大数据</a-radio>
            <a-radio value="1">市工商局</a-radio>
            <a-radio value="2">网站录入</a-radio>
            <a-radio value="3">移动端录入</a-radio>
            <a-radio value="4">外部接口数据</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label='企业类型' v-bind="formItemLayout">
            <a-radio-group
            v-model="dict.corpType"
            v-decorator="['corpType',{rules: [{ required: true, message: '请选择企业类型'}]}]">
            <a-radio value="0">普通企业</a-radio>
            <a-radio value="1">重点企业</a-radio>
            <a-radio value="2">纳税大户</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label='审核状态' v-bind="formItemLayout">
        <a-radio-group
          v-model="dict.auditFalg"
          v-decorator="['auditFalg',{rules: [{ required: true, message: '请选择状态'}]}]">
          <a-radio value="0">未审核</a-radio>
        </a-radio-group>
      </a-form-item>

    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer> -->
  <el-dialog title="新增企业" :visible.sync="dictAddVisiable" width="60%" @close="onClose">
      <el-form :inline="true" id="dict" :model="dict" class="demo-form-inline">
        <!-- 标题1 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align:center;line-height:260%;">
              企业基本信息
            </div>
          </el-col>
        </el-row>
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>企业名称:
              <el-input placeholder="请输入内容"  v-model="dict.corpName"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>统一征信代码:
              <el-input placeholder="请输入内容"  v-model="dict.creaditCode"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>法人:
              <el-input placeholder="请输入内容"  v-model="dict.legalPerson"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>联系人:
              <el-input placeholder="请输入内容"  v-model="dict.contact"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>企业座机:
              <el-input placeholder="请输入内容"  v-model="dict.corpTel"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>联系人电话:
              <el-input
                placeholder="请输入内容"
                name="tel"
                v-model.number="dict.contactPhone"
                maxlength="11"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>所属街道:
              <!-- <el-select
                filterable
                placeholder="请选择"
                @change="jdeshuju"
                style="width:100%"
                v-model="bjlv.qymingcheng"
                clearable
              >
                <el-option
                  v-for="item in datajiedao"
                  :key="item.corpId"
                  :label="item.name"
                  :value="item.corpId"
                ></el-option>
              </el-select> -->
              <el-input
                type="text"
                :disabled="true"
                name="corpId"
                v-model="dict.fieldName"
                style="display:none"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>所属园区:
              <!-- <el-select
                filterable
                placeholder="请选择"
                @change="yqshuju"
                style="width:100%"
                v-model="bjlv.qymingcheng"
                clearable
              >
                <el-option
                  v-for="item in messagelv.options1"
                  :key="item.corpId"
                  :label="item.name"
                  :value="item.corpId"
                ></el-option>
              </el-select> -->
              <el-input
                type="text"
                :disabled="true"
                name="corpId"
                v-model="dict.street"
                style="display:none"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
           <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>服务专员:
              <!-- <el-select
                filterable
                placeholder="请选择"
                @change="fwzyshuju"
                style="width:100%"
                v-model="bjlv.qymingcheng"
                clearable
              >
                <el-option
                  v-for="item in messagelv.options1"
                  :key="item.corpId"
                  :label="item.name"
                  :value="item.corpId"
                ></el-option>
              </el-select> -->
              <el-input
                type="text"
                :disabled="true"
                name="corpId"
                v-model="dict.waiterId"
                style="display:none"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>结对干部:
              <!-- <el-select
                filterable
                placeholder="请选择"
                @change="jdgbshuju"
                style="width:100%"
                v-model="bjlv.qymingcheng"
                clearable
              >
                <el-option
                  v-for="item in messagelv.options1"
                  :key="item.corpId"
                  :label="item.name"
                  :value="item.corpId"
                ></el-option>
              </el-select> -->
              <el-input
                type="text"
                :disabled="true"
                name="corpId"
                v-model="dict.cadereId"
                style="display:none"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>企业类型:
              <el-radio-group v-model="dict.corpType" style="margin-left:10%;margin-top:10px;">
                <el-radio :label="0">普通企业</el-radio>
                <el-radio :label="1">重点企业</el-radio>
                <el-radio :label="2">纳税大户</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
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
const Czdict={
  auditFalg:0,
  corpName:"",
  creaditCode:"",
  corpType:"",
  address:"",
  legalPerson:"",
  contact:"",
  contactPhone:"",
  corpTel:"",
  street:"",
  zoneId:"",
  dataSource:2,
  waiterId:"",
  cadereId:""
}
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'EnterpriseAdd',
  props: {
    dictAddVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      dict: {
        auditFalg:0,
        dataSource:2
      },
      datajiedao:""
    }
  },
  mounted(){
    this.getTree1();
  },
  methods: {
    reset () {
      this.loading = false
      this.dict = {}
      this.form.resetFields()
    },
    //获取街道信息
    getTree1(){
        this.$get('adm/findByPid',{pid:'qwedsadasdsadsad'}).then(res=>{
        console.log(res);
        // let data5=res.data[0];
        // console.log(data5)
        this.datajiedao=res.data;
        console.log(this.datajiedao);
        // alert(123);
      })},
    onClose (){
      // this.reset()
      this.$emit('close');
      this.dict=Object.assign({},Czdict);
    },
    // handleSubmit () {
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       this.$post('corpInfoController/addCorpInfo', {
    //         ...this.dict
    //       }).then(() => {
    //         this.reset()
    //         this.$emit('success')
    //       }).catch(() => {
    //         this.loading = false
    //       })
    //     }
    //   })
    // }
    fromsubmit() {
      if(!this.dict.corpName){
        this.$message.error('请选择企业');
        return;
      }else if(!this.dict.creaditCode){
        this.$message.error('请输入征信代码');
        return;
      }
      else if(!this.dict.legalPerson){
        this.$message.error('请输入法人');
        return;
      }else if(!this.dict.contact){
        this.$message.error('请输入联系人');
        return;
      }
      else if(!this.dict.contactPhone){
        this.$message.error('请输入联系人电话');
        return;
      }
      else if(!this.dict.fieldName){
        this.$message.error('请选择街道');
        return;
      }else if(!this.dict.street){
        this.$message.error('请选择园区');
        return;
      }else if(!this.dict.waiterId){
        this.$message.error('请选择服务专员');
        return;
      }else if(!this.dict.cadereId){
        this.$message.error('请选择结对干部');
        return;
      }else if(!this.dict.dataSource){
        this.$message.error('请选择数据来源');
        return;
      }else if(!this.dict.corpType){
        this.$message.error('请选择企业类型');
        return;
      }
      
      this.$post('corpInfoController/addCorpInfo',{
        ...this.dict
      }).then(res=>{
        this.$message.success('办件录入成功')
        this.dictAddVisiable = false;
        console.log(res)
      })

    }
  }
}
</script>
  <style>
.el-row {
  margin-bottom: 20px;
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
</style>
