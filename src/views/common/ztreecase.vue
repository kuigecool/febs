<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <!-- <el-input placeholder="输入关键字进行过滤" v-model="keyss"></el-input> -->

    <el-tree
      class="filter-tree"
      :data="data2"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :filter-node-method="filterNode"
       @check-change="handleNodeClick"
      ref="tree2"
    ></el-tree>
    
  </div>
</template>


<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  mounted(){
    this.searchbm();
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getChecked(){
      
      // console.log(this.$refs.tree2.getCheckedNodes())
      // let mes=this.$refs.tree2.getCheckedNodes()
      // let mesbm =mes.map((item)=>{
      //   return item.label
      // })

      // this.keyss=mesbm;
      this.keysss=this.$refs.tree2.getCheckedNodes();
      //给父元素传值
      this.$emit('keysss',this.keysss);
    },

handleNodeClick(data2, checked, node) {
    if(checked === true) {
        this.checkedId = data2.id;
        this.$refs.tree2.setCheckedKeys([data2.id]);
    } else {
        if (this.checkedId == data2.id) {
            this.$refs.tree2.setCheckedKeys([data2.id]);
        }
    }
    this.keysss=this.$refs.tree2.getCheckedNodes();
      //给父元素传值
    this.$emit('keysss',this.keysss);
},

    // 获取事件类型数据
    searchbm(){
      this.$get('util/getType')
      .then(r=>{
        this.data2=r.data
        console.log(r)
      })
    },


  },

  data() {
    return {
      filterText: "",
      keysss:'',
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>