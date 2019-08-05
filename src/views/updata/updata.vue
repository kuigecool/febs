<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="file" @change="getFile($event)">
      <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>
    </form>
    <a-table :columns="columns"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="operation" slot-scope="text, record">
          <a-icon
            v-hasPermission="'dict:update'"
            type="setting"
            theme="twoTone"
            twoToneColor="#4a9ff5"
            @click="edit(record)"
            title="下载文件"
          ></a-icon>
          <a-badge v-hasNoPermission="'dict:update'" status="warning" text="无权限"></a-badge>
        </template>
    <template slot="name" slot-scope="name">
      {{name.first}} {{name.last}}
    </template>
  </a-table>
  </div>
</template>

<script>
  // import axios from 'axios';
  // import reqwest from 'reqwest';
  const columns = [{
  title: 'name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
}, {
  title: 'assouuid',
  dataIndex: 'assouuid',
  width: '20%',
}, {
  title: 'createTime',
  dataIndex: 'createTime',
  
},
{
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          fixed: "right",
          width: 100
        }];

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: '上传文件',
        file: '',
        data: [],
      pagination: {},
      loading: false,
      columns,
      }
    },
      mounted() {
    this.fetch();
  },
    methods: {
      getFile: function (event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submit: function (event) {
        //阻止元素发生默认的行为
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", this.file);
        formData.append('assouuid','abc')
        this.$upload('attr/upload', formData)
          .then(function (response) {
            // alert(response.data);
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            alert("上传失败");
            console.log(error);
            window.location.reload();
          });
      },
      handleTableChange (pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch (params = {}) {
      // console.log('params:', params);
      this.loading = true
      // reqwest({
      //   url: 'http://192.168.0.104:8085/attr/findAttrByAsouuid',
      //   method: 'get',
      //   data: {
      //     assouuid:'abc'
      //   },
      //   type: 'json',
      this.$get('attr/findAttrByAsouuid', {assouuid:'abc'})
      .then((data) => {
        console.log(data)
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.data.length;
        this.loading = false;
        this.data = data.data;
        this.pagination = pagination;
        // console.log(pagination)
      });
    }

    }
  }
</script>
<style lang="less" scoped>
@import "../../../static/less/Common";
</style>
