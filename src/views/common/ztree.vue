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
       @check-change="getChecked"
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
      let mes=this.$refs.tree2.getCheckedNodes()
      // let mesbm =mes.map((item)=>{
      //   return item.label
      // })

      // this.keyss=mesbm;
      this.keyss=mes;
      //给父元素传值
      this.$emit('keyss',this.keyss);
    },
    // 获取部门数据
    searchbm(){
      this.$get('util/getDepts')
      .then(r=>{
        this.data2=r.data
        console.log(r)
      })
    },
   
    

  },

  data() {
    return {
      filterText: "",
      keyss:'',
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>