<template>
<div>
  <el-dialog title="新增企业" :visible.sync="dictAddVisiable" width="60%" @close="onClose">
      <!-- <el-form :inline="true" id="dict" :model="dict" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align:center;line-height:260%;">
              企业基本信息
            </div>
          </el-col>
        </el-row>
        
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
       
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>所属街道:
              <el-select
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
              </el-select>
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
              <el-select
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
              </el-select>
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
        
        <el-row :gutter="20">
           <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;<b style="color:red">*</b>服务专员:
              <el-select
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
              </el-select>
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
              <el-select
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
              </el-select>
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
      </el-form> -->
      <el-form :inline="true" id="Enterprise" :model="Enterprise" class="demo-form-inline" label-width="80px">
        <!-- 标题1 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align:center;line-height:260%;">企业基本信息</div>
          </el-col>
        </el-row>
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.corpName">
                <template slot="prepend" style="width:100px">
                  <b style="color:red">*</b>企业名称:
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.creaditCode" name="tel" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')">
                <template slot="prepend" style="width:100px">
                  <b style="color:red">*</b>统一征信代码:
                </template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.address" name="tel" maxlength="18" oninput="value=value.replace(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,'')">
                <template slot="prepend">
                  <b style="color:red">*</b>地址:
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.legalPerson">
                <template slot="prepend">
                  <b style="color:red">*</b>法人:
                </template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.contact" name="tel" maxlength="18" oninput="value=value.replace(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,'')">
                <template slot="prepend">
                  <b style="color:red">*</b>联系人:
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.contactPhone">
                <template slot="prepend">
                  <b style="color:red">*</b>联系人电话:
                </template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.corpTel" name="tel" maxlength="18" oninput="value=value.replace(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,'')">
                <template slot="prepend">
                  <b style="color:red">*</b>企业座机:
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <!-- <el-input placeholder="请输入内容" v-model="Enterprise.corpType">
                <template slot="prepend">
                  <b style="color:red">*</b>企业类型:
                </template>
              </el-input> -->
               <span class="bumen1">
                <b style="color:red">*</b>结对干部:
              </span>
               <el-select v-model="Enterprise.cadereId" clearable filterable placeholder="请选择" style="width: 75%;margin-left: -4px;">
                  <el-option
                    v-for="item in options4"
                    :key="item.id"
                    :label="item.userNamePhone"
                    :value="item.userName">
                  </el-option>
                </el-select>
            </div>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <span class="bumen1">
                <b style="color:red">*</b>所属街道
              </span>
               <el-select v-model="Enterprise.street"  filterable clearable placeholder="请选择" style="width: 75%;margin-left: -4px;">
                  <el-option
                    v-for="item in options1"
                    :key="item.amdId"
                    :label="item.region"
                    :value="item.village">
                  </el-option>
                </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <!-- <el-input placeholder="请输入内容" v-model="Enterprise.zoneId">
                <template slot="prepend">
                  <b style="color:red">*</b>所属园区:
                </template>
              </el-input> -->
              <span class="bumen1">
                <b style="color:red">*</b>所属园区:
              </span>
               <el-select v-model="Enterprise.zoneId" filterable clearable placeholder="请选择" style="width: 75%;margin-left: -4px;">
                  <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.zoneName"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
          </el-col>
        </el-row>
        <!-- 第6行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <!-- <el-input placeholder="请输入内容" v-model="Enterprise.waiterId" name="tel" maxlength="18" oninput="value=value.replace(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,'')">
                <template slot="prepend">
                  <b style="color:red">*</b>服务专员:
                </template>
              </el-input> -->
              <span class="bumen1">
                <b style="color:red">*</b>服务专员:
              </span>
               <el-select v-model="Enterprise.waiterId" filterable clearable placeholder="请选择" style="width: 75%;margin-left: -4px;">
                  <el-option
                    v-for="item in options3"
                    :key="item.id"
                    :label="item.userNamePhone"
                    :value="item.userName">
                  </el-option>
                </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <!-- <el-input placeholder="请输入内容" v-model="Enterprise.cadereId">
                <template slot="prepend">
                  <b style="color:red">*</b>结对干部:
                </template>
              </el-input> -->
              <!-- <span class="bumen1">
                <b style="color:red">*</b>结对干部:
              </span>
               <el-select v-model="Enterprise.cadereId" clearable filterable placeholder="请选择" style="width: 75%;margin-left: -4px;">
                  <el-option
                    v-for="item in options4"
                    :key="item.phone"
                    :label="item.userNamePhone"
                    :value="item.userName">
                  </el-option>
                </el-select> -->
            </div>
          </el-col>
        </el-row>
        <!-- 第7行 -->
        <!-- 第8行 -->
        <!-- <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.address" name="tel" maxlength="18" oninput="value=value.replace(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,'')">
                <template slot="prepend">
                  <b style="color:red">*</b>地址:
                </template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input placeholder="请输入内容" v-model="Enterprise.legalPerson">
                <template slot="prepend">
                  <b style="color:red">*</b>法人:
                </template>
              </el-input>
            </div>
          </el-col>
        </el-row> -->
        <!-- 第9行 -->
        <!-- <el-row :gutter="20">
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
                v-model="Enterprise.deptId"
              ></el-cascader>
            </div>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="padding-top:7px;">
              &nbsp;&nbsp;
              <b style="color:red">*</b>企业类型:
              <el-radio-group v-model="Enterprise.corpType" style="margin-left:10%;">
                <el-radio :label="0">普通企业</el-radio>
                <el-radio :label="1">重点企业</el-radio>
                <el-radio :label="2">纳税大户</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>

        <!-- 第10行 -->
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
      Enterprise: {
        auditFalg:0,
        dataSource:2
      },
      datajiedao:"",
      options1:[],
      options2:[],
      options3:[],
      options4:[],
    }
  },
  // mounted(){
  //   this.getTree1();
  //   this.getyuanqu();
  //   this.getzhuanyuan();
  //   this.getjeidui();
  // },
  watch:{
    dictAddVisiable(){
      if(this.dictAddVisiable){
         this.getTree1();
          this.getyuanqu();
          this.getzhuanyuan();
          this.getjeidui();
      }
    }
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
        // console.log(res);
        // let data5=res.data[0];
        // console.log(data5)
        this.options1=res.data.records;
        // console.log(this.options1);
        // alert(123);
      })},
      getyuanqu(){
        this.$get('zone/listZone').then(res=>{
        // console.log(res);
        // let data5=res.data[0];
        // console.log(data5)
        this.options2=res.data.data;
        // console.log(this.options2);
        // alert(123);
      })},
      getzhuanyuan(){
        this.$get('userInfoController/listUserByName',{type:3}).then(res=>{
        // console.log(res);
        // let data5=res.data[0];
        // console.log(data5)
        this.options3=res.data.data;
        // console.log(this.options3);
        // alert(123);
      })
      },
      getjeidui(){
        this.$get('userInfoController/listUserByName',{type:4}).then(res=>{
        // console.log(res);
        // let data5=res.data[0];
        // console.log(data5)
        this.options4=res.data.data;
        // console.log(this.options4);
        // alert(123);
      })
      },
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
.bumen1 {
  width: 134px;
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
  width: 134px;
}
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
