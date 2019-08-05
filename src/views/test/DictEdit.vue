<template>
  <a-drawer
    title="修改信息"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="dictEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='id' v-bind="formItemLayout">
        <a-input-number style="width: 100%"
                        v-decorator="['comId',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]"/>
      </a-form-item>
      <a-form-item label='名字' v-bind="formItemLayout">
        <a-input v-decorator="['name',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
      <a-form-item label='地址' v-bind="formItemLayout">
        <a-input v-decorator="['addr',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
      <!-- <a-form-item label='字段' v-bind="formItemLayout">
        <a-input v-decorator="['fieldName',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item> -->
    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'DictEdit',
  props: {
    dictEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      dict: {}
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    setFormValues ({...dict}) {
      let fields = ['comId', 'name', 'addr']
      Object.keys(dict).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = dict[key]
          this.form.setFieldsValue(obj)
        }
      })
      this.dict.comId = dict.comId
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let dict = this.form.getFieldsValue()
          dict.comId = this.dict.comId
          this.$post('com/update', {
            ...dict
          }).then(() => {
            this.reset()
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
