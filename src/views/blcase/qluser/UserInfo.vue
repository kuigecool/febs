<template>
  <a-modal
    v-model="show"
    :centered="true"
    :keyboard="false"
    :footer="null"
    :width="750"
    @cancel="handleCancleClick"
    title="用户信息">
    <a-layout class="user-info">
      <a-layout-sider class="user-info-side">
        <!-- <a-avatar shape="square" :size="115" icon="user" :src="`static/avatar/${userInfoData.avatar}`"/> -->
      </a-layout-sider>
      <a-layout-content class="user-content-one">
        <p><a-icon type="user"/>姓名：{{userInfoData.userName}}</p>
        <!-- <p :title="userInfoData.roleName"><a-icon type="star"/>角色：{{userInfoData.roleName? userInfoData.roleName: '暂无角色'}}</p> -->
        <p><a-icon type="skin"/>类型：{{type}}</p>
        <p><a-icon type="phone"/>手机号码：{{userInfoData.userPhone ? userInfoData.userPhone : '暂未绑定电话'}}</p>
        <p><a-icon type="clock-circle"/>创建时间：{{userInfoData.createTime}}</p>
        <!-- <p><a-icon type="mail"/>邮箱：{{userInfoData.email ? userInfoData.email : '暂未绑定邮箱'}}</p> -->
      </a-layout-content>
      <a-layout-content class="user-content-two">
        <p><a-icon type="home"/>部门：{{deptId}}</p>
        <!-- <p>
          <a-icon type="smile" v-if="userInfoData.status === '1'"/>
          <a-icon type="frown" v-else/>状态：
          <template v-if="userInfoData.status === '0'">
            <a-tag color="red">锁定</a-tag>
          </template>
          <template v-else-if="userInfoData.status === '1'">
            <a-tag color="cyan">有效</a-tag>
          </template>
          <template v-else>
            {{userInfoData.status}}
          </template>
        </p> -->
        
        <p><a-icon type="login" />职位：{{userInfoData.position}}</p>
        <p><a-icon type="login" />身份证号：{{userInfoData.userIdcard}}</p>
        <!-- <p :title="userInfoData.description"><a-icon type="message"/>描述：{{userInfoData.description}}</p> -->
      </a-layout-content>
    </a-layout>
  </a-modal>
</template>
<script>
export default {
  name: 'UserInfo',
  props: {
    userInfoVisiable: {
      require: true,
      default: false
    },
    userInfoData: {
      require: true
    }
  },
  computed: {
    show: {
      get: function () {
        return this.userInfoVisiable
      },
      set: function () {
      }
    },
    deptId () {
      switch (this.userInfoData.deptId) {
        case '3':
          return '开发二部'
        case '10':
          return '企业直通车开发部'
        case '2':
          return '保密'
        default:
          return this.userInfoData.deptId
      }
    },
    type(){
      switch (this.userInfoData.type) {
        case '3':
          return '服务专员'
        case '4':
          return '结对干部'
        case '5':
          return '绑定的领导'
        case '6':
          return '领导'
        default:
          return this.userInfoData.type
      }
    }
  },
  methods: {
    handleCancleClick () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
@import "UserInfo";
</style>
