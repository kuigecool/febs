<template>
  <div>
    <!-- 表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="办件编号：">
        <el-input v-model="formInline.qybianhao" placeholder="办件编号"></el-input>
      </el-form-item>
      <el-form-item label="上报类型：">
        <el-select v-model="formInline.qyleixing" placeholder="上报类型：">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称：">
        <el-input v-model="formInline.qyname" placeholder="企业名称"></el-input>
      </el-form-item>

      <el-form-item label="受理时间：" style="width:30%">
        <el-date-picker
          v-model="formInline.qytime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="问题标题：">
        <el-input v-model="formInline.qybiaoti" placeholder="问题标题"></el-input>
      </el-form-item>
      <el-form-item label="企业类别：">
        <el-select v-model="formInline.qyleibie" placeholder="企业类别：">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="承诺时间：" style="width:30%">
        <el-date-picker
          v-model="formInline.qyprtime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="add">办件录入</el-button>
        <el-button type="primary" @click="onSubmit">刷新</el-button>
      </el-form-item>
    </el-form>
    <!-- 办件录入弹窗 -->

    <el-dialog title="办件录入" :visible.sync="outerVisible" width="60%">
      <el-form :inline="true" id="bjlv" :model="bjlv" class="demo-form-inline">
        <!-- 标题1 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align:center;line-height:260%;">
              企业基本信息
              <el-input type="text" :disabled="true" v-model="bjlv.Uuid" style="display:none"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;企业名称:
              <el-select
                filterable
                placeholder="请选择"
                @change="qiyeshuju"
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
                v-model="bjlv.qymingchengid"
                style="display:none"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;企业类型:
              <el-input placeholder="请输入内容" :disabled="true" v-model="qyleixing1s"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;统一征信代码:
              <el-input placeholder="请输入内容" :disabled="true" v-model="bjlv.qyzhengxing"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;地址:
              <el-input placeholder="请输入内容" :disabled="true" v-model="bjlv.qydizhi"></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;提问人姓名:
              <el-input placeholder="请输入内容" name="propose" v-model="bjlv.twxingming"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;联系号码:
              <el-input
                placeholder="请输入内容"
                name="tel"
                v-model.number="bjlv.qymobile"
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
              &nbsp;&nbsp;问题标题:
              <el-input placeholder="请输入内容" name="title" v-model="bjlv.qybiaoti"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- <div class="grid-content bg-purple">
            &nbsp;&nbsp;事情类型:
            <el-select filterable placeholder="请选择" style="width:100%" v-model="bjlv.sqleixing">
              <el-option
                v-for="item in messagelv.options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            </div>-->
            <div class="grid-content bg-purple" style="position:relative">
              &nbsp;&nbsp;事件类型:
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                style="width: 81%;"
                v-model="bjlv.sqleixing"
              ></el-input>
              <el-input type="text" :disabled="true" name="type" v-model="bjlv.sqleixingid"></el-input>
              <el-button
                type="primary"
                @click="innerVisiblee = true"
                style="position:absolute;right:0;top:0;"
              >事件选择</el-button>
              <el-dialog width="30%" title="事件选择" :visible.sync="innerVisiblee" append-to-body>
                <ztreecase v-on:keysss="keysss"></ztreecase>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="innerVisiblee = false">取 消</el-button>
                  <el-button type="primary" @click="innerVisiblee = false">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;内容描述:
              <el-input
                type="textarea"
                :rows="4"
                name="content"
                placeholder="请输入内容"
                v-model="bjlv.qymiaoshu"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 标题2 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align:center;line-height:260%;">派发信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple" style="position:relative">
              &nbsp;&nbsp;主责部门:
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                style="width: 81%;"
                v-model="bjlv.qybumen"
              ></el-input>
              <el-input type="text" :disabled="true" name="deptIds" v-model="bjlv.qybumenid"></el-input>
              <el-button
                type="primary"
                @click="innerVisible = true"
                style="position:absolute;right:0;top:0;"
              >部门选择</el-button>
              <el-dialog width="30%" title="部门选择" :visible.sync="innerVisible" append-to-body>
                <ztree v-on:keyss="keyss"></ztree>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="innerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="innerVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;承诺时间:
              <el-input
                placeholder="请输入内容"
                type="number"
                min="0"
                style="width: 81%;"
                v-model="bjlv.cntime"
              ></el-input>&nbsp;&nbsp;天
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              &nbsp;&nbsp;内容描述:
              <el-radio-group v-model="bjlv.nrms" style="margin-left:30%;margin-top:10px;">
                <el-radio :label="3">发送短信</el-radio>
                <el-radio :label="6">电话回访</el-radio>
                <!-- <el-radio :label="9"></el-radio> -->
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <!-- &nbsp;&nbsp;温馨提示:附件不大于20mb<el-button type="primary" style="position:absolute;right:10px;top:0;height:100%;">+请选择文件</el-button>
            <el-upload
              class="upload-demo"
              action="http://192.168.0.104:8085/attr/upload"
              multiple
              :limit="3"
            >
              <el-button size="small" type="primary">+请选择文件</el-button>
              <div slot="tip" class="el-upload__tip">温馨提示：附件不大于20mb</div>
              </el-upload>-->
              <el-upload
                class="upload-demo"
                :action="action"
                :before-remove="beforeRemove"
                :headers="headers"
                :data="data"
                :show-file-list="true"
                :limit="100"
                :on-exceed="handleExceed"
                :on-remove="fileRemove"
                :on-success="fileSuccess"
                :before-upload="fileProgress"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">提示提示</div>
              </el-upload>
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
import addcase from "./addcase";
import ztree from "../../../common/ztree.vue";
import ztreecase from "../../../common/ztreecase.vue";
import db from "utils/localstorage";
export default {
  // components: { addcase },
  components: {
    // 注册子组件节点
    ztree,
    ztreecase
  },
  watch: {
    qyleixing1() {
      if (this.qyleixing1 == 1) {
        this.qyleixing1s = "普通企业";
      } else if (this.qyleixing1 == 2) {
        this.qyleixing1s = "重点企业";
      } else if (this.qyleixing1 == 3) {
        this.qyleixing1s = "纳税大户";
      }
    }
  },
  data() {
    return {
      headers: {
        Authentication: db.get("USER_TOKEN")
      },
      //  action:this.$baseURL+"attr/upload",
      action: "http://192.168.0.126:8085/attr/upload",
      data: { assouuid: "" },
      formInline: {
        qybianhao: "",
        qyname: "",
        qybiaoti: "",
        qytime: "",
        qyleixing: "",
        qyleibie: "",
        qyprtime: ""
      },
      qyleixing1s: "",
      qyleixing1: "",
      messagelv: {
        options1: [],
        options2: [],
        value2: ""
      },
      bjlv: {
        qymingcheng: "",
        qymingchengid:"",
        qyleixing: "",
        qyleixings: "",
        qyzhengxing: "",
        qydizhi: "",
        twxingming: "",
        qymobile: "",
        qybiaoti: "",
        sqleixing: "",
        sqleixingid: "",
        qymiaoshu: "",
        qybumen: "",
        qybumenid: "",
        cntime: "",
        Uuid: ""
      },
      outerVisible: false,
      innerVisible: false,
      innerVisiblee: false,
      fileId: ""
    };
  },
  mounted() {
    this.getQymc();

    // this.qyleixing();
    // this.searchbm();
  },
  methods: {
    // 上传成功后返回
    fileSuccess(response, file, fileList){
      console.log(response);
      // this.fileId=response.attrId

    },
    // 给上传附件添加id
    fileProgress(event, file, fileList){
      // console.log(event)
      // console.log(file)
      // console.log(fileList)
      // console.log(this.bjlv.Uuid)
      this.data.assouuid=this.bjlv.Uuid
    },
    // 获取部门数据
    // searchbm(){
    //   this.$get('util/getDepts')
    //   .then(r=>{
    //     this.bmMessage=r.data
    //     console.log(r)
    //   })
    // },
    // 获取办件录入的id
    getUuid() {
      this.$get("util/getUuid").then(res => {
        console.log(res.data);
        this.bjlv.Uuid = res.data.UUID;
      });
    },
    fileRemove(file, fileList) {
      console.log(file, fileList);
      this.fileId = file.response.attrId;
      this.$post("attr/del", { attrId: fileId }).then(r => {
        console.log(r);
      });
      //删除未写
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSubmit() {
      console.log("submit!");
    },
    add() {
      this.outerVisible = true;
      this.getUuid();
    },
    // 接收树形组件部门数据的值
    keyss(keyss) {
      console.log(keyss);
      let arrone = keyss;
      this.bjlv.qybumen = arrone.map(item => {
        if (!item.hasChildren) {
          return item.label;
        }
      });
      this.bjlv.qybumen=this.bjlv.qybumen.split(',')
      console.log(this.bjlv.qybumen)
      this.bjlv.qybumenid = arrone.map(item => {
        // return item.id
        if (!item.hasChildren) {
          return item.id;
        }
      });
    },
    // 接收树形组件事件类型数据
    keysss(keysss) {
      console.log(keysss);
      let arronee = keysss;
      this.bjlv.sqleixing = arronee.map(item => {
        if (!item.hasChildren) {
          return item.label;
        }
      });
      this.bjlv.sqleixingid = arronee.map(item => {
        // return item.id
        if (!item.hasChildren) {
          return item.id;
        }
      });
    },
    // 获取企业名称的数据
    getQymc() {
      this.$get("corp/findCorpName", {}).then(r => {
        // console.log(r.data);
        this.messagelv.options1 = r.data;
      });
    },
    qiyeshuju() {
      // console.log(this.bjlv.qymingcheng);
      let qyxx = this.messagelv.options1.find(item => {
        if (item.corpId == this.bjlv.qymingcheng) {
          return item;
        }
      });
      // console.log(qyxx);
      this.qyleixing1 = qyxx.type;
      this.bjlv.qyzhengxing = qyxx.creaditcode;
      this.bjlv.qydizhi = qyxx.addr;
      console.log(qyxx)
    },
    
    fromsubmit() {
      this.$post('item/handAdd',{
        
          itemId:this.bjlv.Uuid,
          deptIds:this.bjlv.qybumenid,
          tel:this.bjlv.qymobile,
          propose:this.bjlv.twxingming,
          title:this.bjlv.qybiaoti,
          content:this.bjlv.qymiaoshu,
          type:this.bjlv.sqleixingid,
          corpId:this.bjlv.qymingchengid
        
      })
      .then(res=>{
        console.log(res)
      })

    }
  }
};
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